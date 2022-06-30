import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setHomeItem, setHomeChart, setUpdated, homeSelector, addDeploy, setMonthlyRewardsData, setRewardsHistory } from "store/homeReducer";
import { userSelector } from "store/userReducer";
import * as apis from '../graphql/poktscan'
import queries from "graphql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import mutation from "graphql/mutation";

export const usePoktapi = () => {
  const {email, addresses} = useSelector(userSelector)
  const homeData = useSelector(homeSelector)
  const dispatch = useDispatch();
  const [fetchMonthlyRewards] = useLazyQuery(queries.getMontlyRewards);
  const [resetMontlyRewards] = useMutation(mutation.setMonthlyRewards)
  const {monthlyRewards} = useSelector(homeSelector)

  const getRewardsHistory = useCallback(async () => {
    for (let index = 0; index < addresses.length; index++) {
      apis.getRewardsReport(28 * 24 * 60 * 60 * 1000, -1, [addresses[index]]).then(res => dispatch(setRewardsHistory({address: addresses[index], reward: res.total_rewards, date: new Date().toLocaleDateString(), validator: addresses[index]})));
    }
  }, [addresses])

  const getMonthlyRewards = useCallback(async () => {
    const rewards = [];
    const data = await fetchMonthlyRewards({variables: {
      email
    }})

    let update = 28;
    const fetchedData = data.data.getMonthlyRewards.monthlyRewards;
    if(fetchedData && fetchedData.length) {
      const lastDate = fetchedData[fetchedData.length - 1].date;
      update = Math.floor((new Date().getTime() - new Date(lastDate).getTime()) / (24 * 60 * 60 * 1000));
      if(update > 28) update = 28;
      for (let index = fetchedData.length - 28 + update; index < fetchedData.length; index++) {
        const element = fetchedData[index];
        dispatch(setMonthlyRewardsData({
          index: index - fetchedData.length + 28 - update,
          reward: element.reward
        }))
        rewards[index - fetchedData.length + 28 - update] = (element.reward);
      }
    }
    for (let index = 28 - update; index < 28; index++) {
      await apis
          .getRewardsReport(
            (28 - index) * 24 * 60 * 60 * 1000,
            24 * 60 * 60 * 1000,
            addresses
          ).then(res => {
            console.log(res, index)
            rewards[index] = res.total_relays
            dispatch(setMonthlyRewardsData({
            index,
            reward: res.total_relays
          }))})
    }
    if(update) {
      await resetMontlyRewards({variables: {
        email,
        monthlyRewards: monthlyRewards.map((el, i) => {return {
          date: new Date(new Date().getTime() - (28 - i - 1) * 24 * 60 * 60 * 1000).toDateString(),
          reward: rewards[i]
        }})
      }})
    }
  }, [new Date().getDate()])

  const getDeploy = useCallback(async () => {
    let index;
    for (index = 0; index < addresses.length; index++) {
      const deploy = await apis.getNode(addresses[index]);
      if (deploy && !homeData.deployed[index]) {
        console.log("deploy", index)
        dispatch(addDeploy({index, deploy}))
      }
    }
  }, [addresses]);

  const getPrice = useCallback(async () => {
    if(!homeData.price)
      apis.getPrice().then((res) => dispatch(setHomeItem({ price: res })));
  }, [homeData.price]);

  const getHomeData = useCallback(async () => {
    dispatch(setUpdated(true));
    getPrice()
    if (!addresses || addresses.length === 0) return;
    if(!homeData.rewards || !homeData.monthRelay || !homeData.monthToken) {
      console.log('1, 5')
      apis.getRewardsReport(28 * 24 * 60 * 60 * 1000, -1, addresses).then((res) =>
      dispatch(
        setHomeItem({
          rewards: res.total_rewards,
          monthRelay: res.total_relays,
          monthToken: res.total_net_tokens,
        })
      )
    );}

    if(!homeData.dayPerformance) {
      console.log('3')
      apis.getNodeRunnerSummary(addresses).then((res) =>
        dispatch(
          setHomeItem({
            dayPerformance:
              res.total_last_24_hours === 0
                ? 0
                : res.total_last_24_hours /
                  (res.total_last_48_hours - res.total_last_24_hours),
          })
        )
      );
    }

    if(!homeData.dailyRelay || !homeData.dailyToken) {
      console.log('4')
      apis.getRewardsReport(24 * 60 * 60 * 1000, -1, addresses).then((res) =>
        dispatch(
          setHomeItem({
            dailyRelay: res.total_relays,
            dailyToken: res.total_net_tokens,
          })
        )
      );
    }

    if(!homeData.deployedStake || !homeData.deployedTotal){
      console.log('6')
      getDeploy();
    }

    for (let index = 0; index < 24; index++) {
      if(!homeData.hourRelays[index]) {
        console.log('7', index)
        await apis
          .getRewardsReport(
            (24 - index) * 60 * 60 * 1000,
            60 * 60 * 1000,
            addresses
          )
          .then((res) =>
            dispatch(
              setHomeChart({
                index,
                value: res.total_relays,
              })
            )
          );
      }
    }
  }, [addresses]);

  return {getHomeData, getDeploy, getPrice, getMonthlyRewards, getRewardsHistory}; 
}