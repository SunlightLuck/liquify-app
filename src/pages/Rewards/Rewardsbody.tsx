import React, { useEffect } from "react";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/userReducer";
import { usePoktapi } from "hooks/usePoktapi";
import { homeSelector } from "store/homeReducer";

const Rewardsbody: React.FC = () => {
  const classes = useStyles();
  const { addresses } = useSelector(userSelector);
  const { getDeploy, getPrice, getMonthlyRewards, getRewardsHistory } =
    usePoktapi();
  const { deployedBalance, price, monthlyRewards, rewardHistory } =
    useSelector(homeSelector);

  const data = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: Array(28)
          .fill(0)
          .map((_, i) =>
            new Date(
              new Date().getTime() - (28 - i - 1) * 24 * 60 * 60 * 1000
            ).getDate()
          ),
      },
    },
    series: [
      {
        name: "series-1",
        data: monthlyRewards,
      },
    ],
  };

  useEffect(() => {
    getDeploy();
    getPrice();
    getMonthlyRewards();
    getRewardsHistory();
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
            <Box className={classes.subtitle}>REWARDS</Box>
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
            <Typography
              style={{
                marginRight: "50px",
                fontSize: "28px",
                color: "#9CA3AF",
                cursor: "pointer",
              }}
            >
              &lt;
            </Typography>
            <Typography
              style={{ fontSize: "28px", color: "#9CA3AF", cursor: "pointer" }}
            >
              &gt;
            </Typography>
          </Box>
        </Box>
        <Box className={classes.centerItem}>
          <Box style={{ display: "flex", gap: "26px", flex: 1 }}>
            <Box className={classes.roundCard}>
              <Box style={{ borderBottom: "1px solid #999999" }}>
                <img
                  src="images/pokt.png"
                  alt="pokt"
                  style={{ padding: "10px", height: "60px" }}
                />
              </Box>
              <Box
                className={classes.oneRow}
                style={{ padding: "10px", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography className={classes.valuePart}>
                    {deployedBalance.toFixed(2)} PKT
                  </Typography>
                  <Typography>
                    (${(deployedBalance * price).toFixed(2)})
                  </Typography>
                </Box>
                <Box
                  className={classes.csvDownload}
                  style={{ cursor: "pointer" }}
                >
                  <img src="images/download.png" alt="download" />
                  <Typography style={{ marginLeft: "5px" }}>CSV</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box style={{ marginTop: "28px" }}>
          <Typography className={classes.subtitle}>Rewards OVERVIEW</Typography>
          <Box className={classes.roundCard} style={{ width: "70%" }}>
            <Box style={{ padding: "10px" }}>
              <Typography>MONTHLY REWARD DESTRIBUTION</Typography>
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
        <Box>
          <Typography className={classes.subtitle}>
            MONTHLY REWARD HISTORY
          </Typography>
          <Box
            className={classes.oneRow}
            style={{ alignItems: "flex-end", flexWrap: "wrap", gap: "22px" }}
          >
            <Box style={{ flex: 1 }}>
              <Typography className={classes.cardTitle}>Search:</Typography>
              <Box className={classes.oneItem}>
                <img
                  src="images/magnify.png"
                  alt="search"
                  style={{ width: "24px" }}
                />
                <input className={classes.inputStyle} />
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                flex: 3,
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <Box>
                <Typography className={classes.cardTitle}>
                  Filter by date
                </Typography>
                <Box className={classes.oneItem}>
                  <input type="date" className={classes.inputStyle} />
                </Box>
              </Box>
              <Box style={{ marginLeft: "11px" }}>
                <Box className={classes.oneItem}>
                  <input type={"date"} className={classes.inputStyle} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.tableContent}>
            <Box className={classes.tableHeader}>
              <Typography style={{ flex: 1 }}>Date</Typography>
              <Typography style={{ flex: 1 }}>Network</Typography>
              <Typography style={{ flex: 2 }}>Address</Typography>
              <Typography style={{ flex: 1 }}>Amount</Typography>
              <Typography style={{ flex: 1 }}>USD Equivalent</Typography>
              <Typography style={{ flex: 2 }}>Validator</Typography>
            </Box>
            <Box style={{ overflow: "auto", width: "100%" }}>
              {rewardHistory &&
                rewardHistory.map((item, i) => (
                  <Box className={classes.tableBody}>
                    <Typography style={{ flex: 1 }}>{item.date}</Typography>
                    <Typography style={{ flex: 1 }}>Pocket Network</Typography>
                    <Typography style={{ flex: 2 }}>
                      {item.address}
                      <img
                        src="images/copy.png"
                        alt="copy"
                        style={{
                          width: "20px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </Typography>
                    <Typography style={{ flex: 1 }}>
                      {item.reward.toFixed(2)} PKT
                    </Typography>
                    <Typography style={{ flex: 1 }}>
                      ${(item.reward * price).toFixed(2)}
                    </Typography>
                    <Typography style={{ flex: 2 }}>
                      {item.validator}
                      <img
                        src="images/copy.png"
                        alt="copy"
                        style={{
                          width: "20px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </Typography>
                  </Box>
                ))}
            </Box>
            <Box className={classes.tableFooter}>
              <Typography
                className={classes.pageBorder}
                style={{ border: "none" }}
              >
                &lt;
              </Typography>
              <Typography className={classes.pageBorder}>1</Typography>
              <Typography className={classes.pageBorder}>2</Typography>
              <Typography className={classes.pageBorder}>3</Typography>
              <Typography className={classes.pageBorder}>4</Typography>
              <Typography
                className={classes.pageBorder}
                style={{ border: "none" }}
              >
                &gt;
              </Typography>
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
  position: "absolute";
`;

const useStyles = makeStyles((theme) => ({
  pageBorder: {
    border: "1px solid #aaaaaa77",
    padding: "1px 5px",
    cursor: "pointer",
  },
  tableContent: {
    borderRadius: "6px",
    color: "black",
    marginTop: "23px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "auto",
  },
  tableHeader: {
    display: "flex",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    background: "#aaaaaa",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "19px 31px",
    overflow: "auto",
  },
  tableBody: {
    display: "flex",
    padding: "19px 31px",
    background: "white",
    borderBottom: "2px solid #aaaaaa77",
    width: "100%",
  },
  tableFooter: {
    display: "flex",
    borderRadius: "6px",
    padding: "19px 31px",
    background: "white",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    overflow: "auto",
  },
  inputStyle: {
    border: "none",
    outline: "none",
    width: "100%",
    height: "24px",
    borderRadius: "6px",
  },
  oneItem: {
    display: "flex",
    alignItems: "center",
    borderRadius: "6px",
    background: "white",
    border: "1px solid #999999",
    padding: "7px",
  },
  csvDownload: {
    background: "#182233",
    borderRadius: "5px",
    color: "white",
    fontSize: "12px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    padding: "9px",
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
  cardTitle: {
    fontSize: "12px",
    fontWeight: 600,
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: 700,
    margin: "16px 0px",
  },
}));

export default Rewardsbody;
