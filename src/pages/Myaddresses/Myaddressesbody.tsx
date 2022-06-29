import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, addNewAddress } from "store/userReducer";
import { useMutation } from "@apollo/client";
import mutation from "graphql/mutation";
import { setUpdated } from "store/homeReducer";

const Myaddressesbody: React.FC = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const { email, addresses } = useSelector(userSelector);
  const [address, setAddress] = useState("");
  const [addAddress] = useMutation(mutation.addAddress);
  const dispatch = useDispatch();

  const addAddressHandler = useCallback(async () => {
    if (address.length != 40) {
      return alert("Address length has to be 40");
    }
    const data = await addAddress({
      variables: {
        addressInput: {
          email,
          address,
        },
      },
    });
    await dispatch(addNewAddress(address));
    await dispatch(setUpdated(false));
    const authData = {
      ...JSON.parse(localStorage.getItem("auth")),
      addresses: [...addresses, address],
    };
    localStorage.setItem("auth", JSON.stringify(authData));
    setShowModal(!showModal);
  }, [address, addresses]);

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
            <Box className={classes.subtitle}>MY ADDRESSES</Box>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Box
              className={classes.oneRow}
              style={{
                background: "#1C39BB",
                borderRadius: "10px",
                alignItems: "center",
                color: "white",
                padding: "7px 12px",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(!showModal)}
            >
              <img
                src="images/plus-white.png"
                alt="plus"
                style={{ width: "20px", marginRight: "10px" }}
              />
              <Typography>Add Address</Typography>
            </Box>
          </Box>
        </Box>
        {showModal && (
          <Box display={"flex"} justifyContent={"center"} mt={"120px"}>
            <Box className={classes.addAddrModal}>
              <Box className={classes.addAddrTitle}>Add Address</Box>
              <Box className={classes.addNewTitle}>Add new wallet address</Box>
              <input
                className={classes.walletInput}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              <Box display={"flex"} justifyContent={"center"} mt={"40px"}>
                <Box className={classes.addBut} onClick={addAddressHandler}>
                  Add Address
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {!showModal && (
          <Box>
            <Box className={classes.tableContent}>
              <Box className={classes.tableHeader}>
                <Typography style={{ flex: 2 }}>Network</Typography>
                <Typography style={{ flex: 2 }}>Address</Typography>
                <Typography style={{ flex: 2 }}>Balance</Typography>
              </Box>
              <Box style={{ overflow: "auto" }}>
                {addresses &&
                  addresses.map((ad) => (
                    <Box className={classes.tableBody} key={ad}>
                      <Typography style={{ flex: 2 }}>
                        Pocket Network
                      </Typography>
                      <Typography style={{ flex: 2 }}>{ad}</Typography>
                      <Typography style={{ flex: 2 }}>
                        123,456,123.00 PKT{" "}
                        <Typography>($123,456,123.00)</Typography>
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
        )}
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
  noneroundCard: {
    opacity: "0.8",
    borderRadius: "10px",
    padding: "1px",
    color: "#9CA3AF",
  },
  addroundcard: {
    background: "linear-gradient(90deg, #FFFFFF 0%, #EDEFFA 114.85%)",
    opacity: "0.8",
    border: "1px solid #1C39BB",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    padding: "1px",
    minWidth: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
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
    padding: "10px 31px",
    background: "white",
    fontSize: "8px",
    borderBottom: "2px solid #aaaaaa77",
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

  addAddrModal: {
    background: "#FFFFFF",
    boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.15)",
    borderRadius: "10px",
    padding: "36px",
    width: "576px",
    height: "297px",
  },
  addAddrTitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "22px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "-0.015em",
    color: "#182233",
  },

  addNewTitle: {
    marginTop: "42px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "15px",
    display: "flex",
    alignItems: "center",
    letterSpacing: "-0.015em",
  },

  walletInput: {
    marginTop: "9px",
    background: "#FFFFFF",
    borderRadius: "6px",
    width: "100%",
    height: "46px",
    filter: "drop-shadow(0px 1px 10px rgba(156, 163, 175, 0.15))",
    border: "none",
    outline: "none",
  },

  addBut: {
    width: "152px",
    height: "52px",
    background: "#1C39BB",
    borderRadius: "7px",

    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    letterSpacing: "-0.01em",
    color: "#FFFFFF",

    cursor: "pointer",
  },
}));

export default Myaddressesbody;
