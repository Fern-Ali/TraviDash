import React, { useState, useEffect } from 'react'
import axios from "axios";
import Chart from './Chart';
import PolarChart from './PolarChart';
import VPChart from './VPChart';
import Deposits from './Deposits';
import Orders from './Orders';
import InactiveScatterChart from './InactiveScatterChart';
import BasicCard from './BasicCard';
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


export default function Farms() {

    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(false)
    function getData(route) {
        setLoading(true)
        axios({
            method: "GET",
            url: `https://travdex-index.onrender.com/${route}`,
            /*url: `http://localhost:5000/${route}`,*/

        })
            .then((response) => {
                setLoading(false)
                const res = response.data
                setProfileData(({
                    sowData: res
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
            /*setOpen(true)*/
            axios({
                method: "GET",
                url: `https://travdex-index.onrender.com/new`,
                /*url: `http://localhost:5000/${route}`,*/

            })
                .then((response) => {
                    setLoading(false)
                    /*setOpen(false)*/
                    const res = response.data
                    setProfileData(({
                        sowData: res
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

    const currUserFarms = window.localStorage.getItem('MY_FARM_LIST');
    const farmList = JSON.parse(currUserFarms) ? JSON.parse(currUserFarms) : null;
   /* const [userFarms, setUserFarms] = useState(persistentFarms);*/

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
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* REFRESH SOW BUTTON */}
                    {/*<Grid item xs={12} md={4} lg={3}>*/}
                    {/*    <Paper*/}
                    {/*        sx={{*/}
                    {/*            p: 2,*/}
                    {/*            display: 'flex',*/}
                    {/*            flexDirection: 'column',*/}
                    {/*            height: 240,*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        */}{/*<Deposits />*/}

                    {/*        <LoadingButton*/}
                    {/*            size="small"*/}
                    {/*            onClick={() => getData('new')}*/}
                    {/*            endIcon={<FilterVintageIcon className='App-logo' />}*/}
                    {/*            loading={loading}*/}
                    {/*            loadingPosition="end"*/}
                    {/*            variant="contained"*/}
                    {/*        >*/}
                    {/*            <span>{profileData ? 'Refresh SOW Data' : 'Get Travian Data'} </span>*/}
                    {/*        </LoadingButton>*/}
                    {/*        <Box sx={{ paddingTop: 2, margin: -1 }}>*/}
                    {/*            */}{/*{loading ? <LinearProgress color="success" /> : <div></div>}*/}
                    {/*        </Box>*/}
                            
                    {/*        {!profileData ? */}
                    {/*            <Paper sx={{*/}
                    {/*                backgroundColor: 'rgba(0,0,0,.1)', borderRadius: 2, padding: 1, p: 2,*/}
                    {/*                marginTop: 1,*/}
                    {/*                display: 'flex',*/}
                    {/*                flexDirection: 'column', }}>*/}
                    {/*                <Skeleton animation="wave" />*/}
                    {/*                {loading ? <LinearProgress color="primary" /> : <div></div>}*/}

                    {/*                <Skeleton animation="wave" />*/}
                    {/*                {loading ? <LinearProgress color="primary" /> : <div></div>}*/}
                    {/*                <Skeleton animation="wave" />*/}
                    {/*                {loading ? <LinearProgress color="primary" /> : <div></div>}*/}
                    {/*                <Skeleton animation="wave" />*/}
                    {/*                {loading ? <LinearProgress color="primary" /> : <div></div>}*/}
                    {/*                <Skeleton animation="wave" />*/}
                    {/*                {loading ? <LinearProgress color="primary" /> : <div></div>}*/}
                    {/*            </Paper> : <Paper sx={{*/}
                    {/*                                    p: 0.5,*/}
                    {/*                                    marginTop: 1,*/}
                    {/*                                    display: 'flex',*/}
                    {/*                                    flexDirection: 'column',*/}
                    {/*                                    height: 170,*/}
                    {/*                                    backgroundColor: 'rgba(0,0,0,.1)',*/}
                    {/*                                }}*/}
                    {/*                xs={12} md={4} lg={3}> <BasicCard />*/}
                    {/*               </Paper>*/}
                                
                    {/*            }*/}


                    {/*    </Paper>*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={8} lg={9}>*/}
                    {/*    <Paper*/}
                    {/*        sx={{*/}
                    {/*            p: 2,*/}
                    {/*            display: 'flex',*/}
                    {/*            flexDirection: 'column',*/}
                    {/*            height: 240,*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <Chart />*/}

                    {/*    </Paper>*/}
                    {/*</Grid>*/}

                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                            {/*<button onClick={getData('pop')}>Get SOW Population Data</button>*/}
                            {profileData && <div>


                                
                                    {/*{loading ? <LinearProgress color="success" />  : <div></div>}*/}
                                {loading ? <div><SkeletonTypography /><SkeletonTypography /></div> : <div></div>}
                                {/*{const myFarms =  }*/}
                                {!loading ? <VillageTable /*info={profileData.sowData}*/ info={ farmList }/>  : <div></div>}
                                    
                                    {/*{loading ? <LinearProgress color="primary" /> : <div></div>}*/}
                                

                            </div> || !profileData &&

                                <Box sx={{  backgroundColor: 'transparent', borderRadius: 2, padding: 1, margin: 2 }}>
                                    {/*<Skeleton animation="wave" />*/}
                                    {/*{loading ? <LinearProgress color="primary" /> : <div></div>}*/}

                                    {/*<Skeleton animation="wave" />*/}
                                    {/*{loading ? <LinearProgress color="primary" /> : <div></div>}*/}
                                    {/*<Skeleton animation="wave" />*/}
                                    {/*{loading ? <LinearProgress color="primary" /> : <div></div>}*/}
                                    <SkeletonTypography/>
                                    {/*<SkeletonTypography/>*/}
                                </Box>
                            }
                        </Paper>
                    </Grid>
                    {/* CHARTS HEADER */}

                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>);
};

