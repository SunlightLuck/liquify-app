import styled from 'styled-components'
import { Box } from '@material-ui/core'

import Topbar from "./Topbar";
import Mainbody from "./Mainbody";

const Landing: React.FC = () => {
    return (
        <StyledContainer>
            <Topbar />
            <Mainbody />
        </StyledContainer >
    )
}

const StyledContainer = styled(Box)`

`

export default Landing