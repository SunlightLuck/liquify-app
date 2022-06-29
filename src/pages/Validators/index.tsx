import React from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import Validatorsbody from "./Validatorsbody";
// import OneRow from "../../components/OneRow";


const Validators: React.FC = () => {

    return (
        <StyledContainer>
            <Sidebar />
            <OneRow>
                <Header />
                <Validatorsbody></Validatorsbody>
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
    position: relative;
`;

export default Validators