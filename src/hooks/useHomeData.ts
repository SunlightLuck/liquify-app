import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setHomeItem, setHomeChart, setUpdated } from "store/homeReducer";
import { userSelector } from "store/userReducer";
import * as apis from '../graphql/poktscan/'

export const useHomeData = () => {
  const {addresses} = useSelector(userSelector)
  const dispatch = useDispatch();

  const getDeploy = async () => {
    const deployed = { balance: 0, tokens: 0 };
    let index;
    for (index = 0; index < addresses.length; index++) {
      const deploy = await apis.getNode(addresses[index]);
      if (deploy) {
        deployed.balance += deploy.balance / 1000000;
        deployed.tokens += parseInt(deploy.tokens) / 1000000;
      }
      if (index === addresses.length - 1) {
        return deployed;
      }
    }
    if (index === addresses.length) return deployed;
  };

  const getHomeData = useCallback(async () => {
    apis.getPrice().then((res) => dispatch(setHomeItem({ price: res })));
    if (!addresses || addresses.length === 0) return;
    apis.getRewardsReport(28 * 24 * 60 * 60 * 1000, -1, addresses).then((res) =>
      dispatch(
        setHomeItem({
          rewards: res.total_rewards,
          monthRelay: res.total_relays,
          monthToken: res.total_net_tokens,
        })
      )
    );

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

    apis.getRewardsReport(24 * 60 * 60 * 1000, -1, addresses).then((res) =>
      dispatch(
        setHomeItem({
          dailyRelay: res.total_relays,
          dailyToken: res.total_net_tokens,
        })
      )
    );

    getDeploy().then((res) =>
      dispatch(
        setHomeItem({ deployedStake: res.tokens, deployedTotal: res.balance })
      )
    );

    for (let index = 0; index < 24; index++) {
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
    dispatch(setUpdated(true));
  }, [addresses]);

  return getHomeData; 
}