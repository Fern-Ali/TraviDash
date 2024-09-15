import React, { useState, useEffect } from 'react'
import axios from "axios";
import Heatmap from './Heatmap';  // Adjust the path as needed
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
import MultiBar from './MultiBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import TimelineLeft from './TimelineLeft'
import HorizontalLinearStepper from './HorizontalNonLinearStepper'
import StepIconExample from './StepIconExample';
import LoadingButton from '@mui/lab/LoadingButton';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import Skeleton from '@mui/material/Skeleton';
import { purple, red, blue, green, teal, indigo, pink, orange } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import AutoComplete from './AutoComplete';
import Typography from '@mui/material/Typography';
import { Autocomplete } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// function Animations() {
//   return (
//     <Box sx={{ width: 300 }}>
//       <Skeleton />
//       <Skeleton animation="wave" />
//       <Skeleton animation={false} />
//     </Box>
//   );
// }

export default function NewHome() {
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
                // url: `http://localhost:5000/inactives`,

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

    const [heatmapData, setHeatmapData] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Hold selected players here
    const [timelineData, setTimelineData] = useState(null);

    // // Fetch the heatmap data in useEffect
    // useEffect(() => {
    //     const fetchHeatmapData = async () => {
    //         setLoading(true);
    //         axios({
    //             method: "GET",
    //             url: `http://localhost:5000/inactives`, // Replace with your actual heatmap endpoint
    //         })
    //         .then((response) => {
    //             setLoading(false);
    //             const res = response.data;
    //             console.log(res)
    //             setHeatmapData(res);  // Store heatmap data
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             console.log(error);
    //         });
    //     };

    //     fetchHeatmapData();  // Call the function to fetch heatmap data
    // }, []);
    
    async function postdata() {
            setLoading(true);
            setOpen(true)
            axios.post('https://travdex-index.onrender.com/heatmap', {"player_ids": selectedPlayers})  
              .then(response => {
                const { data } = response;            
                
                setHeatmapData(data)
                setSelectedPlayers(data.player_ids)
                setLoading(false);  // Set loading to false after the data is processed
                setOpen(false)
              })
              .catch(error => {
                console.error('Error loading heatmap data:', error);
                setLoading(false);  // Handle error case and stop loading
                setOpen(false)
              });
        }
      useEffect(() => {
        postdata()
      }, []);
      useEffect(() => {
        
        // console.log(heatmapData)
        // console.log(selectedPlayers)
      }, [heatmapData]);

      useEffect(() => {
        
      }, [selectedPlayers]);




    //   useEffect(() => {
    //     setLoading(true);
    //     axios.get('http://localhost:5000/timeline')  
    //       .then(response => {
    //         const { data } = response;            
            
    //         setTimelineData(data)
    //         console.log(data)
    //         setLoading(false);  // Set loading to false after the data is processed
    //       })
    //       .catch(error => {
    //         console.error('Error loading timeline data:', error);
    //         setLoading(false);  // Handle error case and stop loading
    //       });
    //   }, []);
    
    const playerNames = profileData
        ? Array.from(
            new Map(
            profileData.sowData.map((row) => [row.uid, { name: row.player.replace(/'/g, ""), uid: row.uid }])
            ).values()
        )
        : [];
        // Handler to update selected players
    const handlePlayerSelection = (selectedNames) => {
        // Assuming the backend returns `player` field as name and we map it back to player IDs
        const selectedIds = profileData.sowData
            .filter(player => selectedNames.includes(player.player))
            .map(player => player.uid);  // Map to unique ID or whatever you need
        setSelectedPlayers(selectedIds);
    };
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
                overflow: 'scroll',
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
                
                    <Grid item xs={12} md={2} lg={4} sx={{maxHeight: 640}}>
                    <Typography variant="h6" textAlign={"center"} gutterBottom sx={{pt:0}}>
                                Select Players to View Stats
                            </Typography> 
                        <Paper
                            sx={{
                                p: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                // whiteSpace:"text-wrap",
                                overflowX: "auto",
                                overflowY: "auto",
                                maxHeight: "inherit",
                                height: 216,
                                justifyContent: "center",
                                

                            }}
                        >
                            
                            
                            <AutoComplete playerNames={playerNames} selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers}/>
                            
                            
                            <Box sx={{display: 'flex', p:1, }}>
                                <Box sx={{ flexGrow: 1 }}>

                                </Box>
                                <Box >
                                <Button variant="contained"   
                                        onClick={() => {
                                                    postdata()
                                                }}
                                        endIcon={<SendIcon />}>
                                    Update
                                </Button>
                                </Box>
                                {/* <Box sx={{ flexGrow: 1 }}>

                                </Box> */}
                            </Box>
                            
                            
                        </Paper>
                        
                    </Grid>
                    
                    <Grid item xs={12} md={8} lg={8}>
                    <Typography variant="h6" textAlign={"center"} gutterBottom sx={{pt:0}}>
                        Growth Per Day
                    </Typography> 
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                // height: 240,
                                maxHeight: 350,
                                overflowX: "auto",
                                overflowY: "auto",
                               

                            }}
                        >
                            
                            

                            {/* {timelineData && heatmapData && <HorizontalLinearStepper timelineData={timelineData} dataset={heatmapData} labels={heatmapData.labels} villageIds={heatmapData.player_ids} />} */}
                            {loading ? <Box sx={{ p:3, width: "100%", height: 200 }}>
                            
                            <Skeleton animation="wave" variant="h1" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" variant="h1" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" variant="h1" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" variant="h1" />
                            </Box> : 
                            heatmapData &&  <MultiBar sx={{maxHeight: 200}} playerNames={playerNames} dataset={heatmapData} labels={heatmapData.labels} villageIds={heatmapData.player_ids.map(player=> player.uid)} />}
                            {/* {profileData && <PolarChart info={profileData.sowData} />}*/}

                            

                        </Paper>

                        
                   
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={12} md={12} lg={9}>
                        {/* <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                height: 640,
                                // overflowX: "hidden",
                                // overflowY: "auto",
                               

                            }}
                        > */}
                            
                            
                            {/* {heatmapData &&  <MultiBar sx={{maxHeight: 200}} dataset={heatmapData} labels={heatmapData.labels} villageIds={heatmapData.player_ids} />} */}

                            

                        {/* </Paper> */}
                    </Grid>

                    <Grid item xs={12} md={8} lg={12}>
                    
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                height: 640,
                                // overflowX: "scroll",
                                // overflowY: "hidden",
                               

                            }}
                        >
                            
                            
                            {!heatmapData ? <Box sx={{ p:3, width: "100%", height: 200 }}>
                            
                            {/* <Skeleton animation="wave" variant="h1" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" variant="rectangular" sx={{height: 100}} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" variant="h1" />
                            <Skeleton animation="wave" variant="rectangular" sx={{height: 70}} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" variant="rectangular" sx={{height: 100}} />
                            <Skeleton animation="wave" variant="h1" /> */}
                            <SkeletonTypography />
                            <SkeletonTypography />
                            </Box> : heatmapData.player_ids.map(player => <Heatmap key={player.uid} target_id={player.uid} data={heatmapData} playerName={player.title}/> )} 
                            

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
                                {profileData && <InactiveScatterChart info={profileData.sowData.filter(person => person.inactive === true)}
                                belowOne={profileData.sowData.filter(person => person.population >= 100 && person.population < 200 && person.inactive === true)}
                                belowTwo={profileData.sowData.filter(person => person.population >= 200 && person.population < 300 && person.inactive === true)}
                                belowThree={profileData.sowData.filter(person => person.population >= 300 && person.population < 400 && person.inactive === true)}
                                belowFour={profileData.sowData.filter(person => person.population >= 400 && person.population < 500 && person.inactive === true)}
                                belowFive={profileData.sowData.filter(person => person.population >= 500 && person.inactive === true)} />}
                        

                        </Paper>
                    </Grid> */}
                    
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>);
};

