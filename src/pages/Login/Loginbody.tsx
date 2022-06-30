import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Box, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@mui/material";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { setPageName } from "store/handleSidebar";
import { useLazyQuery } from "@apollo/client";

import queries from "../../graphql/query";
import { setUserData } from "store/userReducer";

const Loginbody: React.FC = () => {
  const [enableSwitch, setEnableSwitch] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [sigin, {}] = useLazyQuery(queries.signin, {
    variables: { email, password },
  });
  const [googleSignin, {}] = useLazyQuery(queries.googleSignin);
  const [error, setError] = useState("");

  const login = useCallback(async () => {
    if (email !== "" && password !== "") {
      const { data, error } = await sigin();
      if (data && !error) {
        localStorage.setItem("auth", JSON.stringify(data.signin));
        window.location.href = "/home";
        dispatch(setPageName("Home"));
        dispatch(setUserData(data.signin));
      } else {
        setError(error.message);
      }
    } else {
      setError("Invalid fields exist");
    }
  }, [email, password]);

  const onSuccess = async (res: any) => {
    const data = await googleSignin({
      variables: { email: res.profileObj.email },
    });
    if (data.data && !data.error) {
      localStorage.setItem("auth", JSON.stringify(data.data.googleSignin));
      window.location.href = "/home";
      dispatch(setPageName("Home"));
      dispatch(setUserData(data.data.googleSignin));
    } else {
      setError(data.error.message);
    }
  };

  const notificationClose = useCallback(() => {
    setError("");
  }, []);

  const onFailure = (res: any) => {
    setError("Log in failed");
  };

  return (
    <StyledContainer>
      <ChildContainer
        onClick={() => {
          history.push("/");
        }}
      >
        <img src="images/logo.png" alt="logo" />
      </ChildContainer>
      <MapContainer>
        <img src="images/map-black.png" alt="logo" style={{ width: "100%" }} />
      </MapContainer>
      <LargeGroup>
        <LoginDialog>
          <GoogleContainer>
            <GoogleLogin
              clientId="1078180254414-nfkktkghoviu0jksa5efqlrumq6449jf.apps.googleusercontent.com"
              buttonText="Login via Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
            />
          </GoogleContainer>
          <hr style={{ margin: "0 15px 0px 15px" }}></hr>
          <InputGroup>
            <EmailGroup>
              <Box
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  color: "#4B5563",
                  marginBottom: "9px",
                }}
              >
                Email Address
              </Box>
              <EmailInput>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                />
              </EmailInput>
            </EmailGroup>
            <EmailGroup>
              <PasswordTitle>
                <Box>Password</Box>
                <ForgotBox style={{ color: "black" }}>
                  Forgot Password
                </ForgotBox>
              </PasswordTitle>
              <EmailInput>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                />
              </EmailInput>
            </EmailGroup>
            <SwitchGroup>
              <IOSwitch
                enableSwitch={enableSwitch}
                onClick={() => setEnableSwitch(!enableSwitch)}
              >
                <SwitchButton enableSwitch={enableSwitch}></SwitchButton>
              </IOSwitch>
              <Box
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "15px",
                  marginLeft: "14px",
                }}
              >
                Keep me signed in
              </Box>
            </SwitchGroup>
            <ManualLogin onClick={login}>Login</ManualLogin>
          </InputGroup>
        </LoginDialog>
        <CreateGroupe>
          <Box
            style={{
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "15px",
              color: "#6B7280",
            }}
          >
            Don’t have an account?
          </Box>
          <Box
            style={{
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "15px",
              color: "black",
              marginLeft: "58px",
              cursor: "pointer",
            }}
            onClick={() => {
              history.push("/signup");
              window.location.reload();
            }}
          >
            Create an account here
          </Box>
        </CreateGroupe>
      </LargeGroup>
      <Snackbar
        open={error !== ""}
        autoHideDuration={4000}
        onClose={notificationClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" } as any}
      >
        <Alert
          onClose={notificationClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

const ForgotBox = styled(Box)`
  cursor: pointer;
  &:hover {
    color: #2421cf;
    text-decoration: underline;
  }
`;

const LargeGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  top: 150px;
  left: calc(50% - 300px);
  position: absolute;
  @media (max-width: 680px) {
    top: 100px;
    left: calc(50% - 200px);
  }
  @media (max-width: 500px) {
    top: 100px;
    width: 300px;
    left: calc(50% - 150px);
  }
`;
const CreateGroupe = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`;
const ManualLogin = styled(Box)`
  background: #1c39bb;
  border-radius: 6px;
  color: white;
  padding: 16px 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  margin-top: 55px;
  cursor: pointer;
`;
const SwitchGroup = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 19px;
`;
const SwitchButton = styled(Box)<{ enableSwitch: any }>`
  position: absolute;
  left: ${({ enableSwitch }) => (enableSwitch ? "27px" : "2px")};
  transition: all 0.3s;
  border-radius: 50%;
  background: #d1d5db;
  width: 24px;
  height: 24px;
  background: white;
`;
const IOSwitch = styled(Box)<{ enableSwitch: any }>`
  position: relative;
  border-radius: 16px;
  background: ${({ enableSwitch }) => (enableSwitch ? "#1C39BB" : "#D1D5DB")};
  width: 53px;
  height: 28px;
  padding: 2px;
  cursor: pointer;
`;
const PasswordTitle = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: #4b5563;
  margin-bottom: 9px;
  margin-top: 31px;
`;
const EmailInput = styled(Box)`
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
`;
const EmailGroup = styled(Box)``;
const InputGroup = styled(Box)`
  padding: 32px;
`;
const GoogleContainer = styled(Box)`
  padding: 37px 33px;
  width: 100%;
  > button span {
    width: 500px;
    @media (max-width: 680px) {
      width: 300px;
    }
    @media (max-width: 500px) {
      width: 185px;
    }
  }
`;
const LoginDialog = styled(Box)`
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;
const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ChildContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 21px 81px 21px 71px;
  cursor: pointer;
`;
const MapContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 0px 0px;
  width: 100%;
  background: linear-gradient(102.59deg, #ffffff -15.73%, #e8ebf8 126.48%);
`;

export default Loginbody;
