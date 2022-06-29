import React from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Getintouchbody: React.FC = () => {
	const history = useHistory();

	return (
		<StyledContainer>
			<ChildContainer onClick={() => {history.push('/');}}>
				<img src="images/logo.png" alt="logo" />
			</ChildContainer>
			<MapContainer>
				<img src="images/map-black.png" alt="logo" style={{width: '100%'}} />
			</MapContainer>
			<LargeGroup>
				<SignupDialog>
					<CreateTitle>Get In Touch</CreateTitle>
					<CreateTitle style={{marginTop: 0, fontWeight: 400}}>How can we help you?</CreateTitle>
					<InputGroup>
						<Box>
							<InputTitle>Email Address</InputTitle>
							<TextInput>
								<input style={{ borderRadius: '6px', border: 'none', width: '100%', outline: 'none', height: '46px', paddingLeft: '20px'}} />
							</TextInput>
							<InputTitle style={{marginTop: '13px', fontSize: '10px'}}>We’ll never share your email to anyone else.</InputTitle>
						</Box>
						<Box>
							<InputTitle>Your message</InputTitle>
							<TextInput style={{marginTop: '10px'}}>
								<textarea style={{ borderRadius: '6px', border: 'none', width: '100%', outline: 'none', height: '208px', padding: '20px'}} />
							</TextInput>
						</Box>
						<ManualLogin>Submit</ManualLogin>
					</InputGroup>
				</SignupDialog>
			</LargeGroup>
		</StyledContainer>
	);
};

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
		left: calc(50% - 220px);
	}
	@media (max-width: 450px) {
		top: 100px;
		left: calc(50% - 170px);
	}
	@media (max-width: 375px) {
		top: 100px;
		left: calc(50% - 150px);
	}
`;
const ManualLogin = styled(Box)`
	background: #1C39BB;
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
	color: #4B5563;
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
	padding: 7px 0;
	margin: 37px 64px 0px 64px;
	@media (max-width: 450px) {
		margin: 37px 32px 0;
	}
`;
const TextInput = styled(Box)`
	background: #FFFFFF;
	border-radius: 6px;
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
`;
const InputGroup = styled(Box)`
	padding: 0 64px 50px;
	@media (max-width: 450px) {
		padding: 0 32px 25px;
	}
`;
const SignupDialog = styled(Box)`
	background: #FFFFFF;
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	width: 666px;
	@media (max-width: 768px) {
		width: 500px;
	}
	@media (max-width: 550px) {
		width: 450px;
	}
	@media (max-width: 450px) {
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
	padding: 21px 81px 21px 71px;
	cursor: pointer;
`;
const MapContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 120px 0px;
	width: 100%;
	background: linear-gradient(102.59deg, #FFFFFF -15.73%, #E8EBF8 126.48%);
`;
  
export default Getintouchbody;
