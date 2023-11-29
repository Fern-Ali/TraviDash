import { Outlet } from "react-router-dom";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ColorButton from "./ColorButton";
import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';

import logo from '../static/media/Trav.png';
//function Copyright(props) {
//    return (
//        <Typography variant="body2" color="text.secondary" align="center" {...props}>
//            {'Copyright © '}
//            <Link color="inherit" href="https://mui.com/">
//                TraviDex
//            </Link>{' '}
//            {new Date().getFullYear()}
//            {'.'}
//        </Typography>
//    );
//}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Layout({ children }) {
    const location = useLocation();
    const { hash, pathname, search } = location;
    const titleMap = [
        { path: '/', title: 'Home' },
        { path: '/home', title: 'Home' },
        { path: '/farms', title: 'My Farms' },
        { path: '/finder', title: 'Farm Finder' },
        { path: '/advanced', title: 'Advanced Search - Coming Soon!' },
        { path: '/worlds', title: 'World Archive - Coming Soon!' }
    ]
    const curTitle = titleMap.find(item => item.path === pathname)


    const data = window.localStorage.getItem('MY_APP_STATE');

    

    function addSelectedtoFarmList() {
        const selectedVillages = window.localStorage.getItem('SELECTED_VILLAGES');
        const checkedVillages = JSON.parse(selectedVillages) 
        const prevFarms = JSON.parse(currUserFarms)
        if (userFarms !== null) {
            //selectedVillages === '[]' ? alert('Select a village to add it to your list!') : setSelectedFarms(userFarms => [...userFarms, checkedVillages])
            selectedVillages === '[]' ? alert('Select a village to add it to your list!') : setSelectedFarms([...Array.from(userFarms), ...checkedVillages])
        } else {
            setSelectedFarms(checkedVillages)
        }
        
    }
    const currUserFarms = window.localStorage.getItem('MY_FARM_LIST');
    
    const persistentFarms = JSON.parse(currUserFarms) ? JSON.parse(currUserFarms) : null;
    console.log((persistentFarms));
    const [selectedFarms, setSelectedFarms] = useState(persistentFarms);
    const [userFarms, setUserFarms] = useState(persistentFarms);

    useEffect(() => {
        console.log('updating my farms', selectedFarms)
        
        //SETTING MY_FARM_LIST AS THE NEW SELECTED FARMS VALUE GOTTEN IN ADDSELECTEDTOFARMLIST FORMULA.
        window.localStorage.setItem('MY_FARM_LIST', JSON.stringify(selectedFarms));
        //GETTING THE NEWLY UPDATED VALUE, SO IF WE CLICK ADD TO FARMLIST AGAIN, WE DONT LOSE THE ONES WE ADDED BEFORE REFRESH. LATER, REMOVE DUPLICATE FARMS FROM LIST.
        //const updatingFarms = window.localStorage.getItem('MY_FARM_LIST');
        //let arr = JSON.parse(updatingFarms)
        
        setUserFarms(selectedFarms)
        
        /*setUserFarms(farmListDuplicatesRemoved)*/
    }, [selectedFarms])

    const test = JSON.parse(data) === false ? JSON.parse(data) : true;
    const [open, setOpen] = useState(test);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        //const data = window.localStorage.getItem('MY_APP_STATE');
        //JSON.parse(data) === false ? setOpen(JSON.parse(data)) : console.log('open???', open)
        //console.log(data)
        //console.log(JSON.parse(data))

        /*if (currUserFarms !== []) setUserFarms(JSON.parse(currUserFarms))*/
        /*const unSortedFarmList = window.localStorage.getItem('MY_FARM_LIST');*/
        const myObj = {}
        if (userFarms !== null) userFarms.forEach((element) => myObj[element.id] = element);
        const farmListDuplicatesRemoved = Object.values(myObj)
        window.localStorage.setItem('MY_FARM_LIST', JSON.stringify(farmListDuplicatesRemoved));
    }, [userFarms]);
    
    useEffect(() => {
        console.log('open', open)
        window.localStorage.setItem('MY_APP_STATE', JSON.stringify(open));
        /*console.log(JSON.parse(persistentFarms))*/
        console.log(persistentFarms)
        console.log(selectedFarms)
        
        
        console.log(userFarms)
        //console.log(myObj)
        //console.log(Object.keys(myObj))
        //console.log(Object.values(myObj))
        
        
        console.log('open', open)
    }, [open])


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {curTitle && curTitle.title ? `${curTitle.title}` : 'Not Found' } 
                        </Typography>
                        {/*<img src={logo} className="logo" alt="logo" />*/}
                        <ColorButton variant="contained" onClick={() => addSelectedtoFarmList()}>Add to My Farms</ColorButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={4 } color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-center',
                            
                            px: [1],
                        }}
                    >
                        <img src={logo} className="logo" alt="logo" />
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>

                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                
                <Outlet />
               
            </Box>
        </ThemeProvider>
    );
}

//const Layout = () => {
//    return (
//        <>
//            <nav>
//                <ul>
//                    <li>
//                        <Link to="/">Home</Link>
//                    </li>
//                    <li>
//                        <Link to="/blogs">Blogs</Link>
//                    </li>
//                    <li>
//                        <Link to="/contact">Contact</Link>
//                    </li>
//                </ul>
//            </nav>

//            <Outlet />
//        </>
//    )
//};
