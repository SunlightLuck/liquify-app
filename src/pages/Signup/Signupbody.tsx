import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Box, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@mui/material";
import { useHistory } from "react-router-dom";
import mutation from "../../graphql/mutation";
import { useMutation } from "@apollo/client";

const Signupbody: React.FC = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [signup] = useMutation(mutation.signup);
  const [error, setError] = useState("");

  const notificationClose = useCallback(() => {
    setError("");
  }, []);

  const create = useCallback(async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      setError("Please fill the field");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Password mismatch");
      return;
    }
    if (agreed) {
      try {
        const data = await signup({
          variables: {
            userInput: {
              firstName,
              lastName,
              email,
              phone,
              password,
            },
          },
        });
        history.push("/login");
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Agree to privacy policy");
    }
  }, [firstName, lastName, email, phone, password, passwordConfirm, agreed]);

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
        <SignupDialog>
          <CreateTitle>Create An Account</CreateTitle>
          <InputGroup>
            <Box>
              <InputTitle style={{ marginTop: "16px" }}>First Name</InputTitle>
              <TextInput>
                <input
                  value={firstName}
                  placeholder="Your first name"
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </TextInput>
            </Box>
            <Box>
              <InputTitle>Last Name</InputTitle>
              <TextInput>
                <input
                  value={lastName}
                  placeholder="Your last name"
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </TextInput>
            </Box>
            <Box>
              <InputTitle>Email Address</InputTitle>
              <TextInput>
                <input
                  value={email}
                  placeholder="Enter your email address"
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </TextInput>
              <InputTitle style={{ marginTop: "13px", fontSize: "10px" }}>
                We’ll never share your email to anyone else.
              </InputTitle>
            </Box>
            <Box>
              <InputTitle>Phone Number</InputTitle>
              <TextInput>
                <select
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                >
                  <option>United States (+1)</option>
                </select>
              </TextInput>
              <TextInput style={{ marginTop: "10px" }}>
                <input
                  pattern="[0-9]*"
                  value={phone}
                  placeholder="Enter your phone number"
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                  onChange={(e) =>
                    e.target.validity.valid && setPhone(e.target.value)
                  }
                />
              </TextInput>
            </Box>
            <Box>
              <InputTitle>Password</InputTitle>
              <TextInput style={{ marginTop: "10px" }}>
                <input
                  value={password}
                  placeholder="Please enter your password"
                  type="password"
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </TextInput>
              <InputTitle style={{ marginTop: "13px", fontSize: "10px" }}>
                An easy to remember strong password suggestion (all lower case,
                single space between words).
              </InputTitle>
            </Box>
            <Box>
              <InputTitle>Confirm Password</InputTitle>
              <TextInput style={{ marginTop: "10px" }}>
                <input
                  value={passwordConfirm}
                  placeholder="Please enter your password"
                  type="password"
                  style={{
                    borderRadius: "6px",
                    border: "none",
                    width: "100%",
                    outline: "none",
                    height: "46px",
                    paddingLeft: "20px",
                  }}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </TextInput>
            </Box>
            <ConfirmGroup>
              <input
                type="checkbox"
                style={{ margin: "20px 10px 0px" }}
                onClick={() => setAgreed(!agreed)}
              />
              <InputTitle style={{ fontSize: "10px", fontWeight: 700 }}>
                By creating an account, you agree to our{" "}
                <span style={{ color: "#1C39BB", fontSize: "10px" }}>
                  Terms of Service
                </span>{" "}
                and we will use your data per our{" "}
                <span style={{ color: "#1C39BB", fontSize: "10px" }}>
                  Privacy Policy.
                </span>
              </InputTitle>
            </ConfirmGroup>
            <ManualLogin onClick={create}>Create Liquify Account</ManualLogin>
          </InputGroup>
        </SignupDialog>
        <CreateGroupe>
          <Box style={{ fontSize: "15px", fontWeight: 500, color: "#6B7280" }}>
            Already have an account?
          </Box>
          <Box
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "black",
              marginLeft: "58px",
              cursor: "pointer",
            }}
            onClick={() => {
              history.push("/login");
              window.location.reload();
            }}
          >
            Login here!
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

const ConfirmGroup = styled(Box)`
  display: flex;
  align-items: center;
`;
const LargeGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  top: 150px;
  left: calc(50% - 300px);
  position: absolute;
  @media (max-width: 1000px) {
    left: calc(50% - 330px);
  }
  @media (max-width: 768px) {
    top: 100px;
    left: calc(50% - 250px);
  }
  @media (max-width: 550px) {
    top: 100px;
    left: calc(50% - 200px);
  }
  @media (max-width: 425px) {
    top: 100px;
    left: calc(50% - 170px);
  }
  @media (max-width: 375px) {
    top: 100px;
    left: calc(50% - 150px);
  }
`;
const CreateGroupe = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
  padding: 0 20px 20px;
`;
const ManualLogin = styled(Box)`
  background: #c4c4c4;
  border-radius: 6px;
  color: white;
  padding: 16px 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  margin-top: 55px;
  cursor: pointer;
`;
const InputTitle = styled(Box)`
  font-size: 12px;
  font-weight: 500;
  color: #4b5563;
  margin-top: 31px;
  margin-bottom: 9px;
`;
const CreateTitle = styled(Box)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  color: #000000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 7px 0;
  margin: 37px 64px 0px 64px;
  @media (max-width: 550px) {
    margin: 37px 32px 0px 32px;
  }
`;
const TextInput = styled(Box)`
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
`;
const InputGroup = styled(Box)`
  padding: 0 82px 50px;
  @media (max-width: 550px) {
    padding: 0 30px 30px;
  }
  @media (max-width: 450px) {
    padding: 0 30px 30px;
  }
`;
const SignupDialog = styled(Box)`
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 666px;
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 550px) {
    width: 400px;
  }
  @media (max-width: 425px) {
    width: 350px;
  }
  @media (max-width: 375px) {
    width: 300px;
  }
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
  padding: 21px 20px 21px 20px;
  cursor: pointer;
`;
const MapContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 0px;
  width: 100%;
  background: linear-gradient(102.59deg, #ffffff -15.73%, #e8ebf8 126.48%);
`;

export default Signupbody;
