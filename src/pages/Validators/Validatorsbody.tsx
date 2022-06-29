import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Chart from 'react-apexcharts';

const Validatorsbody: React.FC = () => {
    const [avgPercent, setAvgPercent] = useState(76);
	const classes = useStyles({ avgPercent });
    const data = {
        options: {
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00']
          },
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 30, 40, 35, 50, 49, 60, 70, 91, 125, 30, 40, 35, 50, 49, 60]
        }]
    };

    return (
        <Box position="relative" style={{background: "url('images/map-black.png')"}}>
            <StyledContainer>
                <Box className={classes.oneRow} style={{justifyContent: 'space-between', paddingRight: 0, paddingLeft: 0}}>
                    <Box>
                        <Box className={classes.subtitle}>VALIDATORS PERFORMANCE</Box>
                        <Box className={classes.cardTitle} style={{fontWeight: 700, margin: '16px 0px'}}>Validators Profiles</Box>
                    </Box>
                    <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Box className={classes.oneRow} style={{background: '#1C39BB', borderRadius: '10px', alignItems: 'center', color: 'white', padding: '7px 12px', cursor: 'pointer'}}>
                            <img src='images/plus-white.png' alt='plus' style={{width: '20px', marginRight: '10px'}} />
                            <Typography>Add Address</Typography>
                        </Box>
                        <Box className={classes.oneRow} style={{fontSize: '14px', fontWeight: 600, padding: 0, cursor: 'pointer', marginRight: '10px'}}>
                            <Typography style={{marginRight: '40px', fontSize: '28px', color: '#9CA3AF', cursor: 'pointer'}}>&lt;</Typography>
                            <Typography style={{fontSize: '28px', color: '#9CA3AF', cursor: 'pointer'}}>&gt;</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.centerItem}>
                    <Box style={{display: 'flex', gap: '26px', flex: 1, flexWrap: 'wrap'}}>
                        <Box className={classes.roundCard} style={{flex: 1}}>
                            <Box style={{borderBottom: '1px solid #999999'}}>
                                <img src='images/pokt.png' alt='pokt' style={{padding: '10px', height: '60px'}} />
                            </Box>
                            <Box className={classes.oneRow} style={{padding: '10px', justifyContent: 'space-between', fontSize: '12px'}}>
                                <Box>
                                    <Typography>Avg.Time</Typography>
                                    <Typography style={{color: 'black', fontWeight: 700}}>76%</Typography>
                                </Box>
                                <Box className="percent2" style={{width: '200px', height: '200px', zoom: '40%'}}>
                                    <svg style={{width: '200px', height: '200px'}}>
                                        <circle className={classes.circle1} cx="70" cy="70" r="70"></circle>
                                        <circle className={classes.circle2} cx="70" cy="70" r="70"></circle>
                                    </svg>
                                    <Box className={classes.percentText}>
                                        <Typography style={{fontSize: '45px', fontWeight: 700}}>{avgPercent}%</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.addroundcard} style={{flex: 1, padding: '50px 0'}}>
                            <img src='images/plus.png' alt='plus' />
                            <Typography style={{color: 'black'}}>New Asset</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.noneroundCard} style={{flex: 1}}></Box>
                </Box>
                <Box>
                    <Typography className={classes.subtitle} style={{marginTop: '40px'}}>LIQUIFY VALIDATORS PERFORMANCE</Typography>
                    <Box className={classes.tableContent}>
                        <Box className={classes.tableHeader}>
                            <Typography style={{flex: 2}}>Network</Typography>
                            <Typography style={{flex: 2}}>On-chain Commission</Typography>
                            <Typography style={{flex: 2}}>Uptime</Typography>
                            <Typography style={{flex: 2}}>Lifetime Slashed</Typography>
                            <Typography style={{flex: 1}}>Reward Rate</Typography>
                        </Box>
                        <Box style={{overflow: 'auto'}}>
                            <Box className={classes.tableBody}>
                                <Typography style={{flex: 2}}>Pocket Network</Typography>
                                <Typography style={{flex: 2}}>10%</Typography>
                                <Typography style={{flex: 2}}>98%</Typography>
                                <Typography style={{flex: 2}}>0</Typography>
                                <Typography style={{flex: 1}}>N/A</Typography>
                            </Box>
                            <Box className={classes.tableBody}>
                                <Typography style={{flex: 2}}>Pocket Network</Typography>
                                <Typography style={{flex: 2}}>10%</Typography>
                                <Typography style={{flex: 2}}>98%</Typography>
                                <Typography style={{flex: 2}}>0</Typography>
                                <Typography style={{flex: 1}}>N/A</Typography>
                            </Box>
                            <Box className={classes.tableBody}>
                                <Typography style={{flex: 2}}>Pocket Network</Typography>
                                <Typography style={{flex: 2}}>10%</Typography>
                                <Typography style={{flex: 2}}>98%</Typography>
                                <Typography style={{flex: 2}}>0</Typography>
                                <Typography style={{flex: 1}}>N/A</Typography>
                            </Box>
                        </Box>
                        <Box className={classes.tableFooter}>
                            <Typography className={classes.pageBorder} style={{border: 'none'}}>&lt;</Typography>
                            <Typography className={classes.pageBorder}>1</Typography>
                            <Typography className={classes.pageBorder}>2</Typography>
                            <Typography className={classes.pageBorder}>3</Typography>
                            <Typography className={classes.pageBorder}>4</Typography>
                            <Typography className={classes.pageBorder} style={{border: 'none'}}>&gt;</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Typography className={classes.subtitle} style={{marginTop: '40px'}}>VALIDATORS EVENTS</Typography>
                    <Box className={classes.tableContent}>
                        <Box className={classes.tableHeader}>
                            <Typography style={{flex: 1}}>Network</Typography>
                            <Typography style={{flex: 2}}>Type of Event</Typography>
                            <Typography style={{flex: 3}}>Description</Typography>
                            <Typography style={{flex: 1}}>Block Height</Typography>
                            <Typography style={{flex: 1}}>Time Stamp</Typography>
                        </Box>
                        <Box style={{overflow: 'auto'}}>
                            <Box className={classes.tableBody}>
                                <Typography style={{flex: 1}}>Pocket Network</Typography>
                                <Typography style={{flex: 2}}>Voting Power Changed</Typography>
                                <Typography style={{flex: 3}}>Liquify voting power increased to 200,000.0 ROSE</Typography>
                                <Typography style={{flex: 1}}>3321456760</Typography>
                                <Typography style={{flex: 1}}>Jan 01, 2022</Typography>
                            </Box>
                            <Box className={classes.tableBody}>
                                <Typography style={{flex: 1}}>Pocket Network</Typography>
                                <Typography style={{flex: 2}}>Voting Power Changed</Typography>
                                <Typography style={{flex: 3}}>Liquify voting power increased to 200,000.0 ROSE</Typography>
                                <Typography style={{flex: 1}}>3321456760</Typography>
                                <Typography style={{flex: 1}}>Jan 01, 2022</Typography>
                            </Box>
                            <Box className={classes.tableBody}>
                                <Typography style={{flex: 1}}>Pocket Network</Typography>
                                <Typography style={{flex: 2}}>Voting Power Changed</Typography>
                                <Typography style={{flex: 3}}>Liquify voting power increased to 200,000.0 ROSE</Typography>
                                <Typography style={{flex: 1}}>3321456760</Typography>
                                <Typography style={{flex: 1}}>Jan 01, 2022</Typography>
                            </Box>
                        </Box>
                        <Box className={classes.tableFooter}>
                            <Typography className={classes.pageBorder} style={{border: 'none'}}>&lt;</Typography>
                            <Typography className={classes.pageBorder}>1</Typography>
                            <Typography className={classes.pageBorder}>2</Typography>
                            <Typography className={classes.pageBorder}>3</Typography>
                            <Typography className={classes.pageBorder}>4</Typography>
                            <Typography className={classes.pageBorder} style={{border: 'none'}}>&gt;</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box style={{marginTop: '28px'}}>
                    <Typography className={classes.subtitle}>COMPETITORS CHART</Typography>
                    <Box className={classes.roundCard} style={{width: '70%'}}>
                        <Box style={{padding: '10px'}}>
                            <Typography>RELAYS PERFORMED BY NETWORK 24HRS</Typography>
                            <Typography style={{color: 'black'}}>Relay permormed by All Nodes in the Network</Typography>
                            <Chart options={data.options} series={data.series} type="line" width={`100%`} height={305} />
                        </Box>
                    </Box>
                </Box>
            </StyledContainer>
        </Box>
    );
}

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    position: 'absolute';
`;

const useStyles = makeStyles({
    circle1: {
        position: 'absolute',
        fill: 'none',
        strokeWidth: '10',
        transform: 'translate(10px, 10px)',
        strokeDasharray: '440',
        strokeLinecap: 'round',
        stroke: 'rgba(115, 136, 169, 0.353283)'
    },
    percentText: {
        position: 'relative',
        bottom: '150px',
        right: '-40px',
        color: 'black',
    },
    circle2: {
        position: 'absolute',
        fill: 'none',
        strokeWidth: '10',
        transform: 'translate(10px, 10px)',
        strokeDasharray: '440',
        strokeLinecap: 'round',
        strokeDashoffset: (props: any) => 'calc(440 - (440 * '+ props.avgPercent + ') / 100)',
        stroke: '#1C39BB',
        animation: 'percent 1.8s linear',
        animationDelay: '1.2s',
    },
	noneroundCard: {
        opacity: '0.8',
        borderRadius: '10px',
        padding: '1px',
        color: '#9CA3AF',
    },
    addroundcard: {
        background: 'linear-gradient(90deg, #FFFFFF 0%, #EDEFFA 114.85%)',
        opacity: '0.8',
        border: '1px solid #1C39BB',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        padding: '1px',
        minWidth: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageBorder: {
        border: '1px solid #aaaaaa77',
        padding: '1px 5px',
        cursor: 'pointer',
    },
    tableContent: {
        borderRadius: '6px',
        color: 'black',
        marginTop: '23px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
        display: 'flex',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        background: '#aaaaaa',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '19px 31px',
        overflow: 'auto',
    },
    tableBody: {
        display: 'flex',
        padding: '10px 31px',
        background: 'white',
        fontSize: '8px',
        borderBottom: '2px solid #aaaaaa77',
    },
    tableFooter: {
        display: 'flex',
        borderRadius: '6px',
        padding: '19px 31px',
        background: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        overflow: 'auto',
    },
    inputStyle: {
        border: 'none',
        outline: 'none',
        height: '24px',
        borderRadius: '6px',
    },
    oneItem: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '6px',
        background: 'white',
        border: '1px solid #999999',
        padding: '7px',
    },
    csvDownload: {
        background: '#182233',
        borderRadius: '5px',
        color: 'white',
        fontSize: '12px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        padding: '9px',
    },
	roundCard: {
        background: 'linear-gradient(90deg, #FFFFFF 0%, #EDEFFA 114.85%)',
        opacity: '0.8',
        border: '1px solid #1C39BB',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        padding: '1px',
        minWidth: '250px',
        color: '#9CA3AF',
    },
    oneRow: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 15px 0px 15px',
    },
    valuePart: {
        color: '#1C39BB',
        fontWeight: 700,
    },
    centerItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '28px'
    },
    cardTitle: {
        fontSize: '12px',
        fontWeight: 600
    },
    subtitle: {
        fontSize: '18px',
        fontWeight: 700,
        margin: '16px 0px'
    },
})

export default Validatorsbody
