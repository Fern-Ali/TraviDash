import React, { useState, useEffect } from 'react'
import axios from "axios";
import Heatmap from './Heatmap';  // Adjust the path as needed
import Chart from './Chart';
import PolarChart from './PolarChart';
import { Typography } from '@mui/material';
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
import TimelineLeft from './TimelineLeft'
import LoadingButton from '@mui/lab/LoadingButton';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import Skeleton from '@mui/material/Skeleton';

import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Archive() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(false)
    function getData(route) {
        setLoading(true)
        setOpen(true)
        axios({
            method: "GET",
            url: `https://travdex-index.onrender.com/${route}`,
            /*url: `http://localhost:5000/${route}`,*/

        })
            .then((response) => {
                setLoading(false)
                setOpen(false)
                const res = response.data
                setProfileData(({
                    sowData: res
                }))
            }).catch((error) => {
                if (error.response) {
                    setLoading(false)
                    setOpen(false)
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
                url: `https://travdex-index.onrender.com/inactives`,
                // url: `http://localhost:5000/inactives`

            })
                .then((response) => {
                    setLoading(false)
                    setOpen(false)
                    const res = response.data
                    console.log(res)
                    setProfileData(({
                        sowData: res
                    }))
                }).catch((error) => {
                    if (error.response) {
                        setLoading(false)
                        setOpen(false)
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
                    
                    {/* <Grid item xs={12} md={2} lg={4} sx={{maxHeight: 640}}>
                        <Paper
                            sx={{
                                p: 0,
                                display: 'flex',
                                flexDirection: 'row',
                                // whiteSpace:"text-wrap",
                                overflowX: "hidden",
                                overflowY: "auto",
                                maxHeight: "inherit",

                            }}
                        >
                            {timelineData && <TimelineLeft timelineData={timelineData}/>}
                        </Paper>
                    </Grid> */}
                    
                    <Grid item xs={12} md={10} lg={12}>
                    <Typography variant="h6" textAlign={"center"} gutterBottom sx={{pt:0}}>
                               Each point represents an inactive player on the 200 x 200 map. You may click the point to visit that set of coordinates in-game.
                            </Typography> 
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                /*height: 240,*/

                            }}
                        >
                            
                            {profileData && <InactiveScatterChart info={profileData.sowData.filter(person => person.inactive === true)}
                                belowOne={profileData.sowData.filter(person => person.population >= 100 && person.population < 200 && person.inactive === true)}
                                belowTwo={profileData.sowData.filter(person => person.population >= 200 && person.population < 300 && person.inactive === true)}
                                belowThree={profileData.sowData.filter(person => person.population >= 300 && person.population < 400 && person.inactive === true)}
                                belowFour={profileData.sowData.filter(person => person.population >= 400 && person.population < 500 && person.inactive === true)}
                                belowFive={profileData.sowData.filter(person => person.population >= 500 && person.inactive === true)} />}


                            {/* {profileData && <PolarChart info={profileData.sowData} />}*/}

                            

                        </Paper>
                    </Grid>

                    {/* <Grid item xs={12} md={8} lg={12}>
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                height: 640,

                            }}
                        >
                                {heatmapData && heatmapData.player_ids.map(target_id => <Heatmap target_id={target_id} data={heatmapData} />)}                           

                        </Paper>
                    </Grid> */}
                    
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>);
};

