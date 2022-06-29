import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { setVisible, reverseVisible } from '../store/handleSidebar';

const useStyles = makeStyles(theme => ({
	urlpart: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: '31px',
	},
	networkselector: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: '31px',
		position: 'relative',
		cursor: 'pointer',
	},
  networkdropmenu: {
    zIndex: 10,
	position: 'absolute',
	right: '50px',
	top: '100px',
	background: 'white',
	borderRadius: '10px',
	border: '1px solid black',
	width: '300px',
  },
  networkitem: {
	  padding: '15px 25px',
	  fontSize: '18px',
  }
}));

const Header: React.FC = () => {
	const [visibleMenu, setVisibleMenu] =useState(false);
	const classes = useStyles();

	const [selectedNetwork, setSelectedNetwork] = useState('ethereum');

	const onclicknetwork = (network: any) => {
		setSelectedNetwork(network);
		setVisibleMenu(false);
	}

	const dispatch = useDispatch();
	const pagename = useSelector((state: any) => state.handleSidebar.pageName);
	const visibleSidebar = useSelector((state: any) => state.handleSidebar.value);


	return (
		<StyledContainer>
			<Sidemenu state={visibleSidebar} onClick={() => {dispatch(reverseVisible())}}>|||</Sidemenu>
			<PageTitle>
				<Box>Dashboard &gt;&nbsp; </Box>
				<Box>{pagename}</Box>
			</PageTitle>
			<Box className={classes.urlpart}>
				<UserProfile>
					<Box style={{borderRadius: '27px', border: '1px solid black'}}>
						<img src="images/user.png" alt="user" style={{width: '53px'}} />
					</Box>
					<Box style={{marginLeft: '11px'}}>Alex...</Box>
				</UserProfile>
				<Box>
					<Box className={classes.networkselector} onClick={() => setVisibleMenu(!visibleMenu)}>
						<Box style={{marginRight: '20px'}}>Network</Box>
						<img src="images/downarrow.png" alt="downarrow" />
					</Box>
					{visibleMenu && <Box className={classes.networkdropmenu}>
						<Box className={classes.networkitem} style={{textAlign: 'center', borderBottom: '1px solid #999999', fontWeight: '600'}}>Networks</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('ethereum')} style={{cursor: 'pointer'}}>
							{selectedNetwork === 'ethereum' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Ethereum Mainnet
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('pocket')} style={{cursor: 'pointer'}}>
							{selectedNetwork === 'pocket' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Pocket Network
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('fuse')} style={{cursor: 'pointer'}}>
						{selectedNetwork === 'fuse' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Fuse Network
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('polkadot')} style={{cursor: 'pointer'}}>
						{selectedNetwork === 'polkadot' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Polkadot Network
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('harmony')} style={{cursor: 'pointer'}}>
							{selectedNetwork === 'harmony' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Harmony Network
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('avalanche')} style={{cursor: 'pointer'}}>
							{selectedNetwork === 'avalanche' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Avalanche
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('akash')} style={{cursor: 'pointer'}}>
							{selectedNetwork === 'akash' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Akash
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('concordium')} style={{cursor: 'pointer'}}>
							{selectedNetwork === 'concordium' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Concordium
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('polkadex')} style={{cursor: 'pointer'}}>
							{selectedNetwork === 'polkadex' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							Polkadex
						</Box>
						<Box className={classes.networkitem} onClick={() => onclicknetwork('emoney')} style={{cursor: 'pointer'}}>
							{selectedNetwork === 'emoney' ? <><img src='images/check.png' alt='check' style={{marginRight: '10px'}}/>
							<img src='images/blue-dot.png' alt='blue dot' style={{marginRight: '10px'}}/></> : 
							<img src='images/dot.png' alt='dot' style={{marginRight: '10px'}}/>}
							E-Money
						</Box>
					</Box>}
				</Box>
			</Box>
		</StyledContainer>
	);
};

const Sidemenu = styled(Box)<any>`
	font-weight: 600;
	font-size: 30px;
	cursor: pointer;

	transform: rotate(${({state}) => state ? 0 : 90}deg);

	@media (min-width: 768px) {
		display: none;
	}
	
`;
const UserProfile = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 31px;
	font-weight: 600;
	@media (max-width: 600px) {
		display: none;
	}
`;
const PageTitle = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 31px;
	font-weight: 600;
	@media (max-width: 600px) {
		display: none;
	}
	
	>div:first-child {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		/* identical to box height */

		display: flex;
		align-items: center;
		letter-spacing: -0.015em;

		color: #182233;
	}

	>div:last-child {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		/* identical to box height */

		display: flex;
		align-items: center;
		letter-spacing: -0.015em;

		/* Brandcolor/Primary */

		color: #1C39BB;
	}
`;
const StyledContainer = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding: 21px 21px 21px 18px;
	width: 100%;
	border-bottom: 1px solid #999999;
	@media (max-width: 600px) {
		// justify-content: flex-end;
	}
`;

export default Header;
