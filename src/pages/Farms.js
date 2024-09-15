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
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import Skeleton from '@mui/material/Skeleton';

import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Farms() {
    const dataToBeParsed = {}
    const handlePaste = event => {
        
        console.log(event.clipboardData.getData('text'));
        
        dataToBeParsed['myFarmlist'] = event.clipboardData.getData('text/html');
    };

    const handleSubmitFarmList = event => {
        event.preventDefault();
        const fetchMyData = async () => {
            setLoading(true);
            setOpen(true)
            axios.post("https://travdex-index.onrender.com/parser", {
                text: dataToBeParsed
            })
                .then((response) => {
                    setLoading(false)
                    setOpen(false)
                    const res = response.data
                    setParsedData(({
                        farms: res
                    }))
                    parsedData.farms.message ? alert(`${parsedData.farms.message}`) : console.log("ignorethis")
                    console.log(res)
                }).catch((error) => {
                    setOpen(false)
                    if (error.response) {
                        setLoading(false)
                        setOpen(false)
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                })
        }
        fetchMyData();
    };

    useEffect(() => {
        const handlePasteAnywhere = event => {
            console.log(event.clipboardData.getData('text/html'));
        };

        window.addEventListener('paste', handlePasteAnywhere);

        return () => {
            window.removeEventListener('paste', handlePasteAnywhere);
        };
    }, []);
    const [profileData, setProfileData] = useState(null)
    const [parsedData, setParsedData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const currUserFarms = window.localStorage.getItem('MY_FARM_LIST');
    const getFarmList = JSON.parse(currUserFarms) ? JSON.parse(currUserFarms) : null;
    const [farmList, setFarmList] = useState(getFarmList)
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
                url: `https://travdex-index.onrender.com/inactives`,
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
    }, [farmList]);




   /* const [userFarms, setUserFarms] = useState(persistentFarms);*/
    //useEffect(() => {
    //    alert('click to find out if were resetting hehehehe')
        
    //}, [farmList]);
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

                    <Grid item xs={12} md={4} lg={12}>
                        <form onSubmit={handleSubmitFarmList} id="parsingForm">
                        <FormControl>
                            <InputLabel htmlFor="my-input">Paste Farm List Here: Open desired lists, ctrl+a, ctrl+c, ctrl+v. Wait a moment, and hit enter. </InputLabel>
                            <Input onPaste={handlePaste} type="text" id="parseMe" autoComplete="no" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">
                                    
                                    (Be a little patient. You have a huge raidlist!)
                                    When able, click "Add Parsed Farms" and confirm to add your farms to your TraviDex Farmlist.</FormHelperText>
                            </FormControl>
                        </form>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                   
                            
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                            {/*<button onClick={getData('pop')}>Get SOW Population Data</button>*/}
                            {profileData && <div>


                                
                                    {/*{loading ? <LinearProgress color="success" />  : <div></div>}*/}
                                {loading ? <div><SkeletonTypography /><SkeletonTypography /></div> : <div></div>}
                                {/*{const myFarms =  }*/}
                                {!loading ? <VillageTable allVillages={profileData.sowData} date={profileData.sowData[0].date} info={farmList} reset={ setFarmList } farms={parsedData ? parsedData.farms : null} pageSize={10} />  : <div></div>}
                                    
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

