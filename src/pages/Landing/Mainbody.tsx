import styled from "styled-components";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { useState } from "react";

const Mainbody: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <StyledContainer>
      <MapContainer>
        <Box>
          <Liquify>Liquify</Liquify>
          <Description>Liquify is an all in one staking and management platform customized for enterprise and institutional partners</Description>
        </Box>
        <ImgContent>
          <img src="images/map.png" alt="logo" />
        </ImgContent>
      </MapContainer>
      <Box style={{ background: 'url("images/map-black.png")', margin: "150px 0px 0px" }}>
        <SupportChain>Supported Chains</SupportChain>
        <OneRow style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <img src="images/ethereum.png" alt="ethereum" />
          <img src="images/fuse.png" alt="ethereum" />
          <img src="images/poktnet.png" alt="ethereum" />
          <img src="images/avalanche.png" alt="ethereum" />
          <img src="images/akash.png" alt="ethereum" />
          <img src="images/polkadot.png" alt="ethereum" />
          <img src="images/sentinal.png" alt="ethereum" />
          <img src="images/emoney.png" alt="ethereum" />
          <img src="images/condordium.png" alt="ethereum" />
          <img src="images/polkadex.png" alt="ethereum" />
          <img src="images/oasis.png" alt="ethereum" />
          <img src="images/harmony.png" alt="ethereum" />
        </OneRow>
      </Box>
      <Contactbar>
        <p>If you are looking for competitive node or blockchain infrastructure please reach out.</p>
        <Aboutus>Contact us</Aboutus>
        <PriPolicy onClick={() => setOpen(true)}>Private Policy</PriPolicy>
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Private Policy"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</DialogContentText>
          </DialogContent>
		  <DialogActions>
          <Button onClick={()=>setOpen(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>setOpen(false)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
        </Dialog>
      </Contactbar>
    </StyledContainer>
  );
};

const PriPolicy = styled(Box)`
  margin-top: 5px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #e63048;
  }
`;

const OneRow = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    cursor: pointer;
    &:active {
      outline-style: inset;
    }
    &:hover {
      outline: 3px;
    }
    @media (max-width: 900px) {
      max-width: 300px;
    }
    @media (max-width: 500px) {
      max-width: 100px;
    }
  }
`;
const SupportChain = styled(Box)`
  font-size: 80px;
  font-weight: 700;
  color: #182233;
  text-align: center;
  margin-bottom: 85px;
  @media (max-width: 900px) {
    font-size: 40px;
  }
  @media (max-width: 700px) {
    font-size: 20px;
  }
`;
const ImgContent = styled(Box)`
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  > img {
    width: 100%;
    height: auto;
    @media (min-width: 1200px) {
      min-width: 600px;
    }
  }
`;
const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const MapContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 120px 70px;
  background: linear-gradient(102.59deg, #ffffff -15.73%, #e8ebf8 126.48%);
  @media (max-width: 900px) {
    padding: 60px 35px;
  }
  @media (max-width: 700px) {
    padding: 30px 18px;
  }
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;
const Liquify = styled(Box)`
  font-size: 150px;
  font-weight: 700;
  color: #030613;
  margin-bottom: 100px;
  @media (max-width: 900px) {
    font-size: 75px;
  }
  @media (max-width: 700px) {
    font-size: 30px;
    margin-bottom: 50px;
  }
  @media (max-width: 500px) {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;
const Description = styled(Box)`
  font-size: 36px;
  font-weight: 400;
  @media (max-width: 900px) {
    font-size: 18px;
  }
`;
const Contactbar = styled(Box)`
  width: 100%;
  font-size: 36px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1c39bb;
  color: white;
  padding: 82px 50px 68px 50px;
  text-align: center;
  @media (max-width: 900px) {
    font-size: 18px;
  }
`;

const Aboutus = styled(Box)`
  background: #ffffff;
  border: 1px solid #1c39bb;
  border-radius: 6px;
  font-family: Montserrat;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  color: #1c39bb;
  padding: 17px 56px;
  margin-top: 38px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    outline: 3px;
  }

  &:active {
    outline-style: inset;
  }
`;
// const Footer = styled(Box)`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: center;
// 	font-size: 15px;
// 	font-weight: 400;
// 	text-align: center;
// 	padding 35px 0 25px 0;
// `;

export default Mainbody;
