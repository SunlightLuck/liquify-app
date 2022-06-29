import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Topbar: React.FC = () => {
	const history = useHistory();
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [user, setUser] = useState({})

	useMemo(() => {
		setUser(localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') as any) : null)
	}, [localStorage])

	return (
		<StyledContainer>
			<ChildContainer>
				<LogoBox onClick={() => { history.push('/home') }}>
					<img src="images/Logo.png" alt="logo" />
				</LogoBox>
				<Box>
					<ButtonGroup>
						{!user &&
							<>
								<BtnLogin onClick={() => { history.push('/login'); window.location.reload(); }}>
									Login
								</BtnLogin>
								<BtnSignup onClick={() => { history.push('/signup'); window.location.reload(); }}>
									Sign Up
								</BtnSignup>
							</>
						}
						<BtnGetinTouch onClick={() => { history.push('/getintouch'); window.location.reload(); }}>
							Get In Touch
						</BtnGetinTouch>
					</ButtonGroup>
					<Box>
						<MobileMenu showstate={showMobileMenu} style={{ fontWeight: 600 }} onClick={() => { setShowMobileMenu(!showMobileMenu) }}>|||</MobileMenu>
						{showMobileMenu && <MobileDropMenu>
							<Typography style={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => { history.push('/login'); window.location.reload(); }}>Login</Typography>
							<Typography style={{ fontWeight: 600, marginTop: '10px', cursor: 'pointer' }} onClick={() => { history.push('/signup'); window.location.reload(); }}>Sign up</Typography>
							<Typography style={{ fontWeight: 600, marginTop: '10px', cursor: 'pointer' }} onClick={() => { history.push('/getintouch'); window.location.reload(); }}>Get In Touch</Typography>
						</MobileDropMenu>}
					</Box>
				</Box>
			</ChildContainer>
		</StyledContainer>
	);
};

const LogoBox = styled(Box)`
	cursor: pointer;
`;

const MobileDropMenu = styled(Box)`
	border-radius: 6px;
	border: 1px solid black;
	padding: 20px;
	font-size: 20px;
	right: 30px;
	position: absolute;
	min-width: 100px;
	background: white;
	display: none;
	margin-top: 30px;
	@media (max-width: 790px) {
		transition: width 1s;
		display: block;
	}

	p:hover {
		text-decoration: underline;
	}
`;
const MobileMenu = styled(Box) <any>`
	font-size: 20px;
	display: none;
	position: relative;
	transform: rotate(${({ showstate }) => showstate ? 0 : 90}deg);
	cursor: pointer;
	@media (max-width: 790px) {
		display: block;
	}
`;
const StyledContainer = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const ChildContainer = styled(Box)`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	padding: 21px 81px 21px 71px;
	@media (max-width: 790px) {
		padding: 21px 40px;
	}
	@media (max-width: 600px) {
		padding: 21px 20px;
	}
`;
const ButtonGroup = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 790px) {
		display: none;
	}
`;
const BtnLogin = styled(Box)`
	border: none;
	text-align: center;
	color: #1C39BB;
	min-width: 130px;
	cursor: pointer;
	max-height: 40px;
`;
const BtnSignup = styled(Box)`
	border: 1px solid #1C39BB;
	color: #1C39BB;
	text-align: center;
	border-radius: 5px;
	padding: 7px 35px 11px 35px;
	margin-left: 12px;
	min-width: 130px;
	cursor: pointer;
	max-height: 40px;
`;
const BtnGetinTouch = styled(Box)`
	border: 1px solid #1C39BB;
	border-radius: 5px;
	background-color: #1C39BB;
	color: white;
	padding: 7px 35px 11px 35px;
	margin-left: 12px;
	min-width: 130px;
	cursor: pointer;
	max-height: 40px;
`;

export default Topbar;
