import React from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

import Profilebody from "./Profilebody";
import Header from 'layouts/Header';
import Sidebar from 'layouts/Sidebar';


const Profile: React.FC = () => {
    return (
        <StyledContainer>
            <Sidebar />
            <OneRow>
                <Header/>
                <Profilebody />
            </OneRow>
        </StyledContainer >
    )
}


const OneRow = styled(Box)`
  width: 100%;
  padding: 0 50px 50px;
  margin-left: 292px;
  @media (max-width: 768px) {
    margin-left: 0px;
    padding: 0 20px 30px;
  }
`;


const StyledContainer = styled(Box)`
    display: flex;
    // position: relative;
`;


export default Profile