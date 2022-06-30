import React, { useEffect } from "react";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "react-apexcharts";
import HalfPieGChart from "components/HalfPieGChart/HalfPieGChart";

import { useSelector } from "react-redux";
import { userSelector } from "store/userReducer";
import { homeSelector } from "store/homeReducer";
import { usePoktapi } from "hooks/usePoktapi";

const Homebody: React.FC = () => {
  const classes = useStyles();
  const { addresses } = useSelector(userSelector);
  const homeData = useSelector(homeSelector);
  const { getHomeData } = usePoktapi();

  const curHour = new Date().getHours();
  const data = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: Array(24)
          .fill(0)
          .map((_, i) => `${(curHour + i + 1) % 24}:00`),
      },
    },
    series: [
      {
        name: "series-1",
        data: homeData.hourRelays,
      },
    ],
  };

  useEffect(() => {
    if (!homeData.isUpdated) {
      console.log("update");
      getHomeData();
    }
  }, [addresses]);

  return (
    <Box
      position="relative"
      style={{ background: "url('images/map-black.png')" }}
    >
      <StyledContainer>
        <Box
          className={classes.oneRow}
          style={{
            justifyContent: "space-between",
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <Box>
            <Box className={classes.subtitle}>SUPPORTED NETWORKS</Box>
            <Box
              className={classes.cardTitle}
              style={{ fontWeight: 700, margin: "16px 0px" }}
            >
              Pocket Network
            </Box>
          </Box>
          <Box
            className={classes.oneRow}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              padding: 0,
              cursor: "pointer",
            }}
          >
            <Typography style={{ marginRight: "15px" }}>
              More Networks
            </Typography>
            <img src="images/leftarrow.png" alt="more networks" />
          </Box>
        </Box>
        <Box className={classes.centerItem} style={{ flexWrap: "wrap" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "26px",
              flex: 1,
              flexWrap: "wrap",
            }}
          >
            <Box className={classes.roundCard} style={{ flex: 1 }}>
              <Box style={{ borderBottom: "1px solid #999999" }}>
                <img
                  src="images/pokt.png"
                  alt="pokt"
                  style={{ padding: "10px", height: "60px" }}
                />
              </Box>
              <Box style={{ padding: "10px" }}>
                <Box className={classes.oneRow}>
                  <Typography>My Rewards:</Typography>
                  <Typography className={classes.valuePart}>
                    {homeData.rewards} PKT
                  </Typography>
                </Box>
                <Box className={classes.oneRow}>
                  <Typography>Price:</Typography>
                  <Typography className={classes.valuePart}>
                    ${homeData.price}
                  </Typography>
                </Box>
                <Box className={classes.oneRow}>
                  <Typography>1-Day Performance:</Typography>
                  <Typography
                    className={classes.valuePart}
                    style={{ color: "#76CA66" }}
                  >
                    {homeData.dayPerformance}%
                  </Typography>
                </Box>
                <AddAddrBox
                  onClick={() => (window.location.href = "/myaddresses")}
                >
                  <img src="images/plus.png" alt="plus" />
                  <Typography style={{ fontWeight: 600, marginLeft: "8px" }}>
                    Add Address
                  </Typography>
                </AddAddrBox>
              </Box>
            </Box>
            <AddAssetBox>
              <img src="images/plus.png" alt="plus" />
              <Typography style={{ color: "black" }}>New Asset</Typography>
            </AddAssetBox>
          </Box>
          <Box className={classes.noneroundCard} style={{ flex: 1 }}></Box>
        </Box>
        <Box
          className={classes.centerItem}
          style={{ marginTop: "28px", flexWrap: "wrap" }}
        >
          <Box className={classes.colItems} style={{ flex: 1 }}>
            <Box className={classes.roundCard} style={{ width: "100%" }}>
              <Box style={{ padding: "10px" }}>
                <Box className={classes.oneRow}>
                  <Typography className={classes.cardTitle}>
                    RELAYS TODAY
                  </Typography>
                </Box>
                <Box className={classes.oneRow} style={{ marginTop: 0 }}>
                  <Typography
                    style={{
                      color: "black",
                      fontSize: "40px",
                      fontWeight: "600",
                    }}
                  >
                    {homeData.dailyRelay}
                  </Typography>
                </Box>
                <Box className={classes.oneRow}>
                  <img src="images/arrowup.png" alt="arrowup" />
                  <Typography
                    className={classes.valuePart}
                    style={{ color: "#76CA66" }}
                  >
                    {homeData.dailyToken.toFixed(2)} PKT Generated
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={classes.roundCard} style={{ width: "100%" }}>
              <Box style={{ padding: "10px" }}>
                <Box className={classes.oneRow}>
                  <Typography className={classes.cardTitle}>
                    RELAYS THIS MONTH
                  </Typography>
                </Box>
                <Box className={classes.oneRow} style={{ marginTop: 0 }}>
                  <Typography
                    style={{
                      color: "black",
                      fontSize: "40px",
                      fontWeight: "600",
                    }}
                  >
                    {homeData.monthRelay}
                  </Typography>
                </Box>
                <Box className={classes.oneRow}>
                  <img src="images/arrowup.png" alt="arrowup" />
                  <Typography
                    className={classes.valuePart}
                    style={{ color: "#76CA66" }}
                  >
                    {homeData.monthToken.toFixed(2)} PKT Generated
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.roundCard} style={{ flex: 1 }}>
            <Box style={{ padding: "10px" }}>
              <Typography>DAILY RELAYS</Typography>
              <Chart
                options={data.options}
                series={data.series}
                type="line"
                width={`100%`}
                height={305}
              />
            </Box>
          </Box>
        </Box>
        <Box
          className={classes.centerItem}
          style={{
            alignItems: "flex-start",
            marginTop: "28px",
            flexWrap: "wrap",
          }}
        >
          <Box
            className={classes.roundCard}
            style={{ padding: "18px", flex: 1 }}
          >
            <Typography style={{ fontSize: "15px", marginBottom: "20px" }}>
              DEPLOYED
            </Typography>
            <Typography style={{ fontSize: "12px" }}>Distribution</Typography>
            <Typography
              style={{ color: "black", fontSize: "20px", fontWeight: "600" }}
            >
              {homeData.deployedStake.toFixed(2)} /{" "}
              {homeData.deployedTotal.toFixed(2)} PKT
            </Typography>
            <Box
              className={classes.progressbar}
              style={{ margin: "10px 0px", borderBottom: "1px solid #999999" }}
            >
              <Box
                className={classes.progressbar}
                style={{
                  background: "#1C39BB",
                  width: `${
                    (homeData.deployedStake / homeData.deployedTotal) * 100
                  }%`,
                }}
              ></Box>
            </Box>
            <Box style={{ display: "flex" }}>
              <Box style={{ flex: 1, fontSize: "12px" }}>
                <Box className={classes.oneRow} style={{ padding: 0 }}>
                  <Box
                    style={{
                      background: "#1C39BB",
                      width: "15px",
                      height: "15px",
                      marginRight: "12px",
                    }}
                  ></Box>
                  <Box>STAKED</Box>
                </Box>
                <Box style={{ fontWeight: 600, fontSize: "20px" }}>
                  {homeData.deployedStake.toFixed(2)}
                </Box>
              </Box>
              <Box style={{ marginLeft: "15px", flex: 1, fontSize: "12px" }}>
                <Box className={classes.oneRow} style={{ padding: 0 }}>
                  <Box
                    style={{
                      background: "#FBC756",
                      width: "15px",
                      height: "15px",
                      marginRight: "12px",
                    }}
                  ></Box>
                  <Box>TOTAL</Box>
                </Box>
                <Box style={{ fontWeight: 600, fontSize: "20px" }}>
                  {homeData.deployedTotal.toFixed(2)}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className={classes.roundCard}
            style={{ padding: "18px", flex: 1 }}
          >
            <Box style={{ padding: "10px" }}>
              <Typography>PERFORMANCE CHART</Typography>
              <Box
                className={classes.oneRow}
                style={{ justifyContent: "center", flexWrap: "wrap" }}
              >
                {/* <HalfPieChart
                                    style={{flex: 1}}
                                    name="rentStatus"
                                    right={pie_data.right}
                                    left={pie_data.left}
                                    title=""
                                />
                                <HalfPieChart
                                    style={{flex: 1}}
                                    name="rentStatus"
                                    right={pie_data.right}
                                    left={pie_data.left}
                                    title=""
                                /> */}
                <HalfPieGChart
                  percent={100}
                  context={"Relays in Last 24hrs"}
                  amount={`${homeData.dailyRelay}`}
                ></HalfPieGChart>
                <HalfPieGChart
                  percent={70}
                  context={"Avg PKT earned in Last 24hrs"}
                  amount={`${homeData.dailyToken.toFixed(2)}`}
                ></HalfPieGChart>
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
};

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const AddAssetBox = styled(Box)`
  background: linear-gradient(90deg, #ffffff 0%, #edeffa 114.85%);
  opacity: 0.8;
  border: 1px solid #1c39bb;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 1px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 50px 0;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(0.8);
    }
    p {
      opacity: 0.7;
    }
  }
`;

const AddAddrBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: black;
  cursor: pointer;
  padding: 15px 15px 0px 15px;

  &:hover {
    img {
      transform: scale(0.8);
    }
    p {
      opacity: 0.7;
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  noneroundCard: {
    opacity: "0.8",
    borderRadius: "10px",
    padding: "1px",
    color: "#9CA3AF",
  },
  roundCard: {
    background: "linear-gradient(90deg, #FFFFFF 0%, #EDEFFA 114.85%)",
    opacity: "0.8",
    border: "1px solid #1C39BB",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    padding: "1px",
    minWidth: "250px",
    color: "#9CA3AF",
  },
  oneRow: {
    display: "flex",
    alignItems: "center",
    padding: "15px 15px 0px 15px",
  },
  valuePart: {
    color: "#1C39BB",
    fontWeight: 700,
  },
  centerItem: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
  },
  colItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
  },
  cardTitle: {
    fontSize: "12px",
    fontWeight: 600,
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: 700,
    margin: "16px 0px",
  },
  progressbar: {
    border: "1px solid #999999",
    borderRadius: "4px",
    background: "#D9DDE7",
    height: "10px",
  },
}));

export default Homebody;
