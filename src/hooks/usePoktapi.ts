import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setHomeItem, setHomeChart, setUpdated, homeSelector, addDeploy } from "store/homeReducer";
import { userSelector } from "store/userReducer";
import * as apis from '../graphql/poktscan'

export const usePoktapi = () => {
  const {addresses} = useSelector(userSelector)
  const homeData = useSelector(homeSelector)
  const dispatch = useDispatch();

  const getMonthlyRewards = useCallback(() => {

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

  return {getHomeData, getDeploy, getPrice}; 
}