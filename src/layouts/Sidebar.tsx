import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setVisible, reverseVisible, setPageName } from "store/handleSidebar";

const Sidebar: React.FC = () => {
	let screenwidth = 0;
	const [selected, setSelected] =useState(false);
	let history = useHistory();
	const visibleSidebar = useSelector((state: any) => state.handleSidebar.value);
	const dispatch = useDispatch();

	window.addEventListener("resize", () => {
		screenwidth = window.screen.width;
		if (window.screen.width > 768) {
			dispatch(setVisible(true));
		} else {
			dispatch(setVisible(false));
		}
	});

	const logout = useCallback(async() => {
		localStorage.removeItem('auth');
		history.push('/login');
	}, [])

	return (
		<>
		<StyledContainer show={visibleSidebar}>
			<MenuContainer>
				<OneItem selected={false} style={{paddingBottom: '25px'}} onClick={() => {history.push('/'); dispatch(setPageName('Home'))}}>
					<img src="images/Logo-white.png" alt="logo" style={{height: '34px'}} />
				</OneItem>
				<OneItem selected={selected} style={{border: 'none', paddingTop: '36px'}}>
					<img src="images/home_icon.png" alt="home" />
					<Box style={{marginLeft: '20px'}} onClick={() => {history.push('/home');dispatch(setVisible(false));dispatch(setPageName('Home'))}}>Home</Box>
				</OneItem>
				<OneItem selected={selected} style={{border: 'none'}}>
					<img src="images/gift.png" alt="Rewards" />
					<Box style={{marginLeft: '20px'}} onClick={() => {history.push('/rewards');dispatch(setVisible(false));dispatch(setPageName('Rewards'))}}>Rewards</Box>
				</OneItem>
				<OneItem selected={selected} style={{border: 'none'}}>
					<img src="images/Validators.png" alt="Validators Performance" />
					<Box style={{marginLeft: '20px'}} onClick={() => {history.push('/validators');dispatch(setVisible(false));dispatch(setPageName('Validators Performance'))}}>Validators Performance</Box>
				</OneItem>
				<OneItem selected={selected} style={{border: 'none'}}>
					<img src="images/wallet.png" alt="My Addresses" />
					<Box style={{marginLeft: '20px'}} onClick={() => {history.push('/myaddresses');dispatch(setVisible(false));dispatch(setPageName('My Addresses'))}}>My Addresses</Box>
				</OneItem>
				<OneItem selected={selected} style={{paddingBottom: '36px'}}>
					<img src="images/people.png" alt="My Profile" />
					<Box style={{marginLeft: '20px'}} onClick={() => {history.push('/myprofile');dispatch(setVisible(false));dispatch(setPageName('My Profile'))}}>My Profile</Box>
				</OneItem>
				<OneItem selected={selected}>
					<img src="images/support.png" alt="support" />
					<Box style={{marginLeft: '20px'}}>Support</Box>
				</OneItem>
				<OneItem selected={selected} style={{border: 'none'}} onClick={logout}>
					<img src="images/logout.png" alt="logout" />
					<Box style={{marginLeft: '20px'}}>Log Out</Box>
				</OneItem>
			</MenuContainer>
			<ContactContainer>
				<img src="images/github.png" alt="github" />
				<img src="images/twitter.png" alt="twitter" style={{marginLeft: '15px'}} />
				<img src="images/email.png" alt="email" style={{marginLeft: '15px'}} />
			</ContactContainer>
		</StyledContainer>
		</>
	);
};

const ContactContainer = styled(Box)`
	display: flex;
	align-items: center;
	padding: 38px 0 38px 28px;
`
const OneItem = styled(Box)<{selected: any}>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background: ${({selected}) => selected ? '#1C39BB' : 'transparent'};
	color: white;
	padding: 18px 0px 18px 28px;
	cursor: pointer;
	border-bottom: 1px solid rgba(107, 114, 128, 0.5);
`;
const MenuContainer = styled(Box)`
	padding: 15px 0 38px 0px;
`;
const StyledContainer = styled(Box)<any>`
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: space-between;
	padding: 0 0 0 18px;
	background: #182233;
	width: 292px;
	height: 100%;
	font-size: 13px;
	@media (max-width: 768px) {
		// display: none;
		height: 100%;
		/* position: absolute; */
		z-index: 10;
		display: ${({show}) => show ? '' : 'none'};

	}
`;

export default Sidebar;
