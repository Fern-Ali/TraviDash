import React, { useState, useEffect } from 'react'
import axios from "axios";
import Chart from './Chart';
import PolarChart from './PolarChart';
import VPChart from './VPChart';
import BubbleChart from './BubbleChart';
import BubbleChartVillage from './BubbleChartVillage';
import WelcomeCard from './WelcomeCard';
import Deposits from './Deposits';
import Orders from './Orders';
import SkeletonTypography from './SkeletonTypography';
import Copyright from './Copyright';
import VillageTable from './villageTable';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

import LoadingButton from '@mui/lab/LoadingButton';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import Skeleton from '@mui/material/Skeleton';

import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { purple, red, blue, green, teal, indigo, pink, orange } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';




export default function Home2({ curTitle }) {
    
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const [profileData, setProfileData] = useState(null)
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(false)
    function getData(route) {
        setLoading(true)
        setOpen(true)
        axios({
            method: "GET",
            url: `https://travdex-index.onrender.com/${route}`,
            //url: `http://localhost:5000/${route}`,

        })
            .then((response) => {
                setLoading(false)
                setOpen(false)
                const res = response.data
                setDashboardData(({
                    sowDashData: res[0],
                    bombData: res[1],
                    fluxData: res[2],
                    asData: res[3],
                    topHundredData: res[4]
                }))
            }).catch((error) => {
                if (error.response) {
                    setLoading(false)
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setOpen(true)
            axios({
                method: "GET",
                url: `https://travdex-index.onrender.com/dashboard`,
                //url: `http://localhost:5000/dashboard`,

            })
                .then((response) => {
                    setLoading(false)
                    setOpen(false)
                    const res = response.data
                    setDashboardData(({
                        sowDashData: res[0],
                        bombData: res[1],
                        fluxData: res[2],
                        asData: res[3],
                        topHundredData: res[4]

                    }))
                }).catch((error) => {
                    if (error.response) {
                        setLoading(false)
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                })
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setOpen(true)
            axios({
                method: "GET",
                url: `https://travdex-index.onrender.com/new`,
                /*url: `http://localhost:5000/dashboard`,*/

            })
                .then((response) => {
                    setLoading(false)
                    setOpen(false)
                    const res = response.data
                    setProfileData(({
                        sowData: res,

                    }))
                }).catch((error) => {
                    if (error.response) {
                        setLoading(false)
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                })
        }

        fetchData();
    }, []);
    return (

        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    

                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                                backgroundColor: blue[100]                            
                            }}
                        >
                            
                            
                            
                            <LoadingButton
                                size="small"
                                onClick={() => getData('dashboard')}
                                endIcon={<FilterVintageIcon className='App-logo' />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                <span>{profileData ? `Refresh SOW Data`  : 'Get Travian Data'} </span>
                            </LoadingButton>
                            <Box sx={{ paddingTop: 2, margin: -1, }}>
                                {/*{loading ? <LinearProgress color="success" /> : <div></div>}*/}
                            </Box>

                            {!profileData ?
                                <Paper sx={{
                                    backgroundColor: 'rgba(0,0,0,.1)', borderRadius: 2, padding: 1, p: 2,
                                    marginTop: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <Skeleton animation="wave" />
                                    {loading ? <LinearProgress color="primary" /> : <div></div>}

                                    <Skeleton animation="wave" />
                                    {loading ? <LinearProgress color="primary" /> : <div></div>}
                                    <Skeleton animation="wave" />
                                    {loading ? <LinearProgress color="primary" /> : <div></div>}
                                    <Skeleton animation="wave" />
                                    {loading ? <LinearProgress color="primary" /> : <div></div>}
                                    <Skeleton animation="wave" />
                                    {loading ? <LinearProgress color="primary" /> : <div></div>}
                                </Paper> : <Paper sx={{
                                    p: 1,
                                    marginTop: 1,
                                    marginBottom: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 170,
                                    backgroundColor: 'rgba(0,0,0,.1)',
                                }}
                                    xs={12} md={4} lg={3}> <WelcomeCard />
                                </Paper>

                            }


                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                height: 240,
                                justifyContent: 'space-evenly'
                                
                            }}
                        >
                            
                            
                            
                            
                            
                            
                            
                            {dashboardData && <VPChart  flux={dashboardData.fluxData} as={dashboardData.asData} bomb={dashboardData.bombData} />}
                            
                            
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                /*height: '100%',*/
                                backgroundColor: blue[100]
                            }}
                        >
                            <Box sx={{ paddingTop: 0, margin: 0, }}>
                                {loading ? <LinearProgress color="success" /> : <div></div>}
                            </Box>

                            {!profileData ? <Paper sx={{
                                p: 1,
                                marginTop: 1,
                                marginBottom: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                backgroundColor: blue[50],
                            }}
                                xs={12} md={4} lg={12}> {!profileData &&
                                    <SkeletonTypography />}
                            </Paper> : <Paper sx={{
                                p: 1,
                                marginTop: 1,
                                marginBottom: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                backgroundColor: blue[50],
                            }}
                                xs={12} md={4} lg={12}> {dashboardData &&
                                    <Card sx={{ height: '100%', minWidth: 100, justifyContent: 'center' }}>

                                        <CardContent >
                                                <BubbleChart test={dashboardData.sowDashData} />
                                            
                                            <CardActions>

                                            </CardActions>
                                        </CardContent>



                                        </Card>}



                            </Paper>

                            }
                            
                            

                            
                            {/*{profileData && <VPChart flux={profileData.fluxData} as={profileData.asData} bomb={profileData.bombData } />}*/}

                        </Paper>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                /*height: '100%',*/
                                backgroundColor: blue[100]
                            }}
                        >
                            <Box sx={{ paddingTop: 0, margin: 0, }}>
                                {loading ? <LinearProgress color="success" /> : <div></div>}
                            </Box>

                            {!profileData ? <Paper sx={{
                                p: 1,
                                marginTop: 1,
                                marginBottom: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                backgroundColor: blue[50],
                            }}
                                xs={12} md={4} lg={12}> {!profileData &&
                                    <SkeletonTypography />}
                            </Paper> : <Paper sx={{
                                p: 1,
                                marginTop: 1,
                                marginBottom: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                backgroundColor: blue[50],
                            }}
                                xs={12} md={4} lg={12}> {dashboardData &&
                                    <Card sx={{ height: '100%', minWidth: 100, justifyContent: 'center' }}>

                                        <CardContent >
                                            <BubbleChartVillage test={dashboardData.topHundredData} />

                                            <CardActions>

                                            </CardActions>
                                        </CardContent>



                                    </Card>}



                            </Paper>

                            }




                            {/*{profileData && <VPChart flux={profileData.fluxData} as={profileData.asData} bomb={profileData.bombData } />}*/}

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                backgroundColor: blue[50]
                            }}
                        >


                            {/*<LoadingButton*/}
                            {/*    size="small"*/}
                            {/*    onClick={() => getData('dashboard')}*/}
                            {/*    endIcon={<FilterVintageIcon className='App-logo' />}*/}
                            {/*    loading={loading}*/}
                            {/*    loadingPosition="end"*/}
                            {/*    variant="contained"*/}
                            {/*>*/}
                            {/*    <span>{profileData ? 'Refresh SOW Data' : 'Get Travian Data'} </span>*/}
                            {/*</LoadingButton>*/}
                            <Box sx={{ paddingTop: 0, margin: 0, }}>
                                {loading ? <LinearProgress color="success" /> : <div></div>}
                            </Box>

                            {!profileData ? <Paper sx={{
                                p: 1,
                                marginTop: 1,
                                marginBottom: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                /*height: 170,*/
                                backgroundColor: 'rgba(0,0,0,.1)',
                            }}
                                xs={12} md={4} lg={3}> {!profileData &&
                                    <Card sx={{ minWidth: 100, justifyContent: 'center' }}>



                                        <CardContent >

                                            {/* <VPChart flux={profileData.fluxData} as={profileData.asData} bomb={profileData.bombData} />*/}
                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}

                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}
                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}
                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}
                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}
                                            {/*{dashboardData && <Chart flux={dashboardData.fluxData} as={dashboardData.asData} bomb={dashboardData.bombData} />}*/}
                                            <CardActions>

                                            </CardActions>
                                        </CardContent>



                                    </Card>}
                            </Paper> : <Paper sx={{
                                p: 1,
                                marginTop: 1,
                                marginBottom: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                /*height: 170,*/
                                backgroundColor: 'rgba(0,0,0,.1)',
                            }}
                                xs={12} md={4} lg={3}> {profileData &&
                                    <Card sx={{ minWidth: 100, justifyContent: 'center' }}>



                                        <CardContent >

                                            {/* <VPChart flux={profileData.fluxData} as={profileData.asData} bomb={profileData.bombData} />*/}

                                            {dashboardData && <Chart flux={dashboardData.fluxData} as={dashboardData.asData} bomb={dashboardData.bombData} />}
                                            <CardActions>

                                            </CardActions>
                                        </CardContent>



                                    </Card>}
                            </Paper> }
                            

                            {!profileData ? <Paper sx={{
                                p: 1,
                                marginTop: 1,
                                marginBottom: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                /*height: 170,*/
                                backgroundColor: 'rgba(0,0,0,.1)',
                            }}
                                xs={12} md={4} lg={3}> {!profileData &&
                                    <Card sx={{ minWidth: 100, justifyContent: 'center' }}>

                                        <CardContent >

                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}

                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}
                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}
                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}
                                            <Skeleton animation="wave" />
                                            {loading ? <LinearProgress color="primary" /> : <div></div>}
                                            <CardActions>

                                            </CardActions>
                                        </CardContent>



                                    </Card>}
                            </Paper> : <Paper sx={{
                                p: 1,
                                marginTop: 1,
                                marginBottom: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                /*height: 170,*/
                                backgroundColor: 'rgba(0,0,0,.1)',
                            }}
                                xs={12} md={4} lg={3}> {profileData &&
                                    <Card sx={{ minWidth: 100, justifyContent: 'center' }}>

                                        <CardContent >

                                            {/* <VPChart flux={profileData.fluxData} as={profileData.asData} bomb={profileData.bombData} />*/}
                                            {profileData && <PolarChart info={profileData.sowData} />}
                                            <CardActions>

                                            </CardActions>
                                        </CardContent>



                                    </Card>}
                            </Paper> }


                        </Paper>
                    </Grid>

                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>);
};

