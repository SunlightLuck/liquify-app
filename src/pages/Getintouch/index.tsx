import React from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

import Getintouchbody from "./Getintouchbody";

const Getintouch: React.FC = () => {
    return (
        <StyledContainer>
            <Getintouchbody />
        </StyledContainer >
    )
}

const StyledContainer = styled(Box)`

`

export default Getintouch