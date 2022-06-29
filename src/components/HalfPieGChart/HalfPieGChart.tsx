import React, { useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";

interface Props {
  percent: number;
  context: string;
  amount: string;
}

const HalfPieGChart: React.FC<Props> = ({ percent, context, amount }) => {
  return (
    <PieBox percentage={(percent - 100) * 1.8}>
        <Box zIndex={2}>
            <Amountvalue display={'flex'} justifyContent={'center'}>{amount}</Amountvalue>
            <DescriptText mt={'9px'} justifyContent={'center'}>{context}</DescriptText>
        </Box>
      <OverlaySpan></OverlaySpan>
    </PieBox>
  );
};

const Amountvalue = styled(Box)`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-transform: uppercase;

    /* Secondary 1 */

    color: #182233;
`;

const DescriptText = styled(Box)`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.015em;

    color: #9CA3AF;
`;

const PieBox = styled(Box)<any>`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  margin: 0 auto;
  position: relative;
  width: 260px;
  height: 130px;
  border-radius: 1000px 1000px 0 0;
  overflow: hidden;

  &::after {
     /*  set rotation degree  */
    transform: rotate(${({ percentage }) => percentage}deg);
    background: linear-gradient(95.88deg, #1c39bb 6.57%, rgba(82, 62, 206, 0.35) 97.84%);
    transform-origin: center bottom;

    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    height: calc(100% - 4px);
    width: calc(100% - 8px);
    border-radius: inherit;
    box-sizing: border-box;
  }

  &::before {
    border: 50px solid #1963e98f;

    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    box-sizing: border-box;
  }
`;

const OverlaySpan = styled.span`
  top: 50px; /*  match border width  */
  left: 50px; /*  match border width  */
  width: calc(100% - 100px); /*  match border width times 2  */
  height: calc(200% - 100px); /*  match border width times 2  */
  border-radius: 100%;
  border: 4px solid #1963e98f;
  background: white;
  z-index: 1; /*  move it on top of the pseudo elements  */

  content: "";
  position: absolute;
  /* left: 0;
    top: 0;
    height: 100%;
    width: 100%; */
  border-radius: inherit;
  box-sizing: border-box;
`;

export default HalfPieGChart;
