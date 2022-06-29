import styled from 'styled-components'
import { Box } from '@material-ui/core'

import Signupbody from "./Signupbody";

const Signup: React.FC = () => {
    return (
        <StyledContainer>
            <Signupbody />
        </StyledContainer >
    )
}

const StyledContainer = styled(Box)`

`

export default Signup