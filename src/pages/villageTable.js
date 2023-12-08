// JavaScript source code
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
/*import Button from '@mui/material-next/Button';*/
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ColorButton from "./ColorButton";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { purple, red, blue, green, teal, indigo, pink, orange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import LinearProgress from '@mui/material/LinearProgress';
import ParseNotification from "./ParseNotification";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import RepartitionIcon from '@mui/icons-material/Repartition';
import RepartitionIcon2 from '@mui/icons-material/RepartitionTwoTone';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const columns = [
    {
        field: 'inactive', headerName: 'Status', headerClassName: 'App-table-header', align: 'center', headerAlign: 'center', minWidth: 150,
        renderCell: (params) => {
            /*return <a class="App-retro-button" href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}`}>{params.row.inactive === true ? 'Inactive' : 'Active' }</a>;*/
            return <ColorButton color={params.row.inactive === true ? 'white' : 'black'} size="small" bg={params.row.inactive === true ? pink[500] : green[100]} fg={pink[700]} className="slim" variant="filledTonal" href={`https://www.gettertools.com/sow.x1.europe.travian.com/Player/${params.row.uid}-${params.row.player}`} target="_blank"> {params.row.inactive === true ? 'Inactive' : 'Active'} </ColorButton>;
        },
        flex: 0.5,
    },
    {
        field: 'xy',
        headerName: 'Coords',
        headerClassName: 'App-table-header',
        headerAlign: 'left',
        minWidth: 90,
        renderCell: (params) => {
            return <a class="App-retro-button" target="_blank" href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}`}>({params.row.x}, {params.row.y})</a>;
            /*return <ColorButton size="small" bg={pink[500]} fg={pink[700]} className="App-button" variant="filledTonal" href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}`}> ({params.row.x}, {params.row.y}) </ColorButton>;*/
        },
        flex: 0.5,
    },
    {
        field: 'population',
        headerName: 'Population',
        headerClassName: 'App-table-header',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
        minWidth: 90,
        editable: false,
        flex: 0.5,
    },
    {
        field: 'vp',
        headerName: 'Victory',
        headerClassName: 'App-table-header',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
        minWidth: 90,
        editable: false,
        flex: 0.5,
    },
    {
        field: 'region',
        headerName: 'Region',
        headerClassName: 'App-table-header',
        headerAlign: 'center',
        align: 'left',
        minWidth: 150,
        editable: false,
        flex: 0.5,
        renderCell: (params) => {
            /*return <a class="App-github-button" href={`https://sow.x1.europe.travian.com/region/${params.row.region}`}>{params.row.region}</a>;*/
            return <ColorButton size="small" bg={teal[700]} fg={teal[300]} className="App-button" variant="filledTonal" target="_blank" href={`https://sow.x1.europe.travian.com/region/${params.row.region}`}> {params.row.region} </ColorButton>;
        },
    },
    {
        field: 'village',
        headerName: 'Village',
        headerClassName: 'App-table-header',
        headerAlign: 'center',
        align: 'left',
        minWidth: 200,
        editable: false,
        flex: 0.5,
        renderCell: (params) => {
            //return <a class="" href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}`}>{params.row.village}</a>
            return <ColorButton size="small" fg={blue[400]} bg={blue[300]} className="App-button" variant="filledTonal" target="_blank" href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}`}> {params.row.village} </ColorButton>;
        },
    },

    {
        field: 'player',
        headerName: 'Player',
        headerClassName: 'App-table-header',
        headerAlign: 'center',
        align: 'left',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        minWidth: 160,
        flex: 0.5,
        renderCell: (params) => {
            /*return <a class="" href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}`}>{params.row.player}</a>*/
            return <ColorButton size="small" fg={indigo[400]} bg={indigo[700]} className="App-button" variant="filledTonal" target="_blank" href={`https://sow.x1.europe.travian.com/profile/${params.row.uid}`}> {params.row.player} </ColorButton>;
        },
        valueGetter: (params) =>
            `${params.row.player || ''}`,
    },

    {
        field: 'alliance',
        headerName: 'Alliance',
        headerClassName: 'App-table-header',
        headerAlign: 'center',
        align: 'left',
        minWidth: 130,
        editable: false,
        sortable: true,
        flex: 0.5,
        renderCell: (params) => {
            /*return <a class="" href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}`}>{params.row.player}</a>*/
            return <ColorButton color="" size="small" fg={purple[200]} bg={purple[500]} className="App-button" variant="filledTonal" target="_blank" href={`https://sow.x1.europe.travian.com/alliance/${params.row.aid}`}> {params.row.alliance} </ColorButton>;
        },
    },
    { field: 'capital', headerName: 'Capital', headerClassName: 'App-table-header', align: 'right', minWidth: 70, flex: 0.5 },
    { field: 'harbor', headerName: 'Harbor', headerClassName: 'App-table-header', align: 'right', minWidth: 70, flex: 0.5 },
    { field: 'city', headerName: 'City', headerClassName: 'App-table-header', headerAlign: 'left', align: 'right', minWidth: 70, flex: 0.5 },
    { field: 'distance', headerName: 'Distance', headerClassName: 'App-table-header', headerAlign: 'left', align: 'right', minWidth: 70, flex: 0.5, type: 'number' },
    
];




function CustomToolbar({ info, textInputX, textInputY, setTextInputX, setTextInputY, setTableData, farmies, setFarmies, addSelectedtoFarmList, userFarms, userFarmListLength, removeSelectedfromFarmList, selectedRows, addParsedFarmlist, farms, resetter, staticFarmList }) {
    const handleSetFarmies = () => {
        console.log(farmies)
        setFarmies(!farmies)
        console.log(farmies)
    }
    
    const [distanceToggle, setDistanceToggle] = useState(false);

    const handleTextInputXChange = event => {
        setTextInputX(event.target.value);
        
    };
    const handleTextInputYChange = event => {
        setTextInputY(event.target.value);
        
    };

    const handleTextInputSubmit = event => {
        //textInput;
        ///*its going to be a string separated by a comma. get two numbers in between commas and do the math. maybe, if parens splice parens.*/
        //const rx = 0
        //const ry = 0
        //resetter
        event.preventDefault();
        if (textInputY > -201 && textInputY < 201 && textInputX > -201 && textInputX < 201) {

        
        setDistanceToggle(!distanceToggle)
        distanceToggle === false ? 
        setTableData(info.map((item) => (
            {
                id: item.id,
                x: item.x,
                y: item.y,
                xy: `${item.x}, ${item.y}`,
                region: item.region,
                village: item.village,
                population: item.population,
                player: `${item.player}`,
                alliance: item.alliance ? item.alliance : '⛔',
                uid: item.uid,
                vid: item.vid,
                capital: item.capital ? '✅' : '⛔',
                harbor: item.harbor ? '✅' : '⛔',
                city: item.city ? '✅' : '⛔',
                aid: item.aid,
                inactive: item.inactive,
                vp: item.vp, harborStatus: JSON.stringify(item.harbor),
                distance: Math.sqrt(((textInputX-item.x)**2 + (textInputY-item.y)**2)).toFixed(2)
            }
        ))) : setTableData(info.map((item) => (
            {
                id: item.id,
                x: item.x,
                y: item.y,
                xy: `${item.x}, ${item.y}`,
                region: item.region,
                village: item.village,
                population: item.population,
                player: `${item.player}`,
                alliance: item.alliance ? item.alliance : '⛔',
                uid: item.uid,
                vid: item.vid,
                capital: item.capital ? '✅' : '⛔',
                harbor: item.harbor ? '✅' : '⛔',
                city: item.city ? '✅' : '⛔',
                aid: item.aid,
                inactive: item.inactive,
                vp: item.vp, harborStatus: JSON.stringify(item.harbor),
                distance: null
            }
        )))
        }
    };
    return (
        <GridToolbarContainer sx={{ p: 1, bgcolor: blue[100] } }>
            <Button size="small" variant={farmies === false ? "contained" : "contained"} color={ farmies === false ? "primary" : "secondary" } selected="true" startIcon={<AgricultureIcon />} selected="true" onClick={() => handleSetFarmies()} > {farmies === false ? `Show (${userFarms !== null ? userFarmListLength : 0}) Farms` /*${farmies}*/ : `Hide (${userFarms !== null ? userFarmListLength : 0}) Farms` /*${farmies}*/}

            </Button >
            <GridToolbarColumnsButton variant="contained" color="primary"/>
            <GridToolbarFilterButton variant="contained" color="primary" />
            <GridToolbarDensitySelector variant="contained" color="primary" />
            <GridToolbarExport variant="contained" color="primary" />
            
            {/*<ToggleButton*/}
            {/*    value="check"*/}
            {/*    selected={ false }*/}
            {/*    varient="contained"*/}
            {/*    size="small"*/}
            {/*    color="primary"*/}
            {/*>*/}
            {/*    <AgricultureIcon />*/}
            {/*</ToggleButton>*/}
            <Button variant="contained" color={selectedRows.length > 0 ? 'secondary' : 'primary'} size="small" disabled={selectedRows.length > 0 ? false : true} startIcon={<LibraryAddCheckIcon /> } onClick={() => addSelectedtoFarmList()}>Add Farms</Button>
            <Button variant="contained" color={selectedRows.length > 0 ? 'primary' : 'primary'} size="small" disabled={selectedRows.length > 0 ? false : true} startIcon={<HighlightOffIcon size="medium" />} onClick={() => removeSelectedfromFarmList()}>Remove Farms</Button>
            {/*<Button variant="contained" color={selectedRows.length > 0 ? 'secondary' : 'primary'} size="small" disabled={farmies} startIcon={<LibraryAddCheckIcon />} onClick={() => addParsedFarmlist()}>Add Parsed Farms</Button>*/}
            <ParseNotification parser={addParsedFarmlist} refresher={setFarmies} farmNumber={farms !== null ? farms.length : 0} farms={farms} />
            <form noValidate autoComplete='off'>
            <TextField
                label="x"
                id="outlined-size-small"
                
                size="small"
                sx={{ maxWidth: 75,}}
                hiddenLabel
                value={textInputX}
                onChange={handleTextInputXChange}
                onSubmit={handleTextInputSubmit}
                variant="outlined"
                focused
                />
            <TextField
                label="y"
                id="outlined-size-small"
                
                size="small"
                sx={{ marginLeft: 1, maxWidth: 75 }}
                variant="standard"
                hiddenLabel
                value={textInputY}
                onChange={handleTextInputYChange}
                onSubmit={handleTextInputSubmit}
                color="primary"
                variant="outlined"
                focused
                />
            </form>
            <FormControlLabel color="primary" control={<Checkbox size="medium" icon={<BookmarkBorderIcon color="primary" />} checkedIcon={<BookmarkAddedIcon color="info" />} onChange={handleTextInputSubmit} checked={distanceToggle} />}
                label={<Button variant={'contained'} color={distanceToggle === true ? 'warning' : 'warning'} onClick={handleTextInputSubmit} size="small" disabled={ textInputY > -201 && textInputY < 201 && textInputX > -201 && textInputX < 201 ? false : true}  > Distance</Button>} />
            {/*startIcon={<LibraryAddCheckIcon />}*/}

            {/*<Button onClick={() => resetter(staticFarmList.map((item) => (*/}
            {/*    {*/}
            {/*        id: item.id,*/}
            {/*        x: item.x,*/}
            {/*        y: item.y,*/}
            {/*        xy: `${item.x}, ${item.y}`,*/}
            {/*        region: item.region,*/}
            {/*        village: item.village,*/}
            {/*        population: item.population,*/}
            {/*        player: `${item.player}`,*/}
            {/*        alliance: item.alliance ? item.alliance : '⛔',*/}
            {/*        uid: item.uid,*/}
            {/*        vid: item.vid,*/}
            {/*        capital: item.capital ? '✅' : '⛔',*/}
            {/*        harbor: item.harbor ? '✅' : '⛔',*/}
            {/*        city: item.city ? '✅' : '⛔',*/}
            {/*        aid: item.aid,*/}
            {/*        inactive: item.inactive,*/}
            {/*        vp: item.vp, harborStatus: JSON.stringify(item.harbor)*/}
            {/*    }*/}
            {/*)))}>resetmyshitx</Button>*/}
        </GridToolbarContainer>
    );
}
/*onClick={ setToggleFarms(!toggleFarms) }*/

const VillageTable = (props) => {
    
    const [textInputX, setTextInputX] = useState(0);
    const [textInputY, setTextInputY] = useState(0);
    const distance = []
    function addParsedFarmlist() {
        console.log(myDate.getUTCDate())
        const day = myDate.getUTCDate().toString()
        console.log(myDate.getUTCMonth() + 1)
        console.log(myDate.getUTCDate().toString().length)
        const month = (myDate.getUTCMonth() + 1).toString()
        if (myDate.getUTCDate().toString().length === 1) {
            const dateID = month.concat('0', day)
            console.log(dateID)
        } else {
            const dateID = month.concat('', day)
            console.log(dateID)
        }
        const myObj = {}
        const farmingList = {}
        props.allVillages.forEach((item) => (
            myObj[item.id.toString().slice(4)] = item
        ))
        if(props.farms !== null) props.farms.forEach((item) => (
            item in myObj ? farmingList[item] = myObj[item] : console.log(`that village isn't in your farmlist.`) 
        ))
        console.log(farmingList)
        console.log(myObj)
        const parsedFarm = Object.values(farmingList)
        if (userFarms !== null) {
            //selectedVillages === '[]' ? alert('Select a village to add it to your list!') : setSelectedFarms(userFarms => [...userFarms, checkedVillages])
            
            setSelectedFarms([...Array.from(userFarms), ...parsedFarm])
        } else {
            setSelectedFarms(parsedFarm)
        }
        const clearingDuplicatesForParser = {}
        if (userFarms !== null) [...Array.from(userFarms), ...parsedFarm].forEach((element) => clearingDuplicatesForParser[element.vid] = element);
        const farmListDuplicatesRemoved = Object.values(clearingDuplicatesForParser)
        
        //const farmlistObj = {}
        //const selectedObj = {}
        //if (parsedFarm.length > 0) parsedFarm.forEach((item) => (selectedObj[item.vid] = item))
        //if (staticFarmList !== null) staticFarmList.forEach((item) => (farmlistObj[item.vid] = item))

        //if (parsedFarm.length > 0) parsedFarm.forEach((item) => (
        //    item.vid in farmlistObj ? delete farmlistObj[item.vid] : console.log('that farm is not in your list.')

        //))
        //const farmListwithValuesRemoved = Object.values(farmlistObj)
        //setStaticFarmList(farmListwithValuesRemoved)
        //console.log('it should update the static farm list now.')
        props.reset(farmListDuplicatesRemoved.map((item) => (
            {
                id: item.id,
                x: item.x,
                y: item.y,
                xy: `${item.x}, ${item.y}`,
                region: item.region,
                village: item.village,
                population: item.population,
                player: `${item.player}`,
                alliance: item.alliance ? item.alliance : '⛔',
                uid: item.uid,
                vid: item.vid,
                capital: item.capital ? '✅' : '⛔',
                harbor: item.harbor ? '✅' : '⛔',
                city: item.city ? '✅' : '⛔',
                aid: item.aid,
                inactive: item.inactive,
                vp: item.vp, harborStatus: JSON.stringify(item.harbor)
            }
        )))
    }
    const myDate = new Date(props.date)
    /*console.log(myDate)*/
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
        props.reset(staticFarmList.map((item) => (
            {
                id: item.id,
                x: item.x,
                y: item.y,
                xy: `${item.x}, ${item.y}`,
                region: item.region,
                village: item.village,
                population: item.population,
                player: `${item.player}`,
                alliance: item.alliance ? item.alliance : '⛔',
                uid: item.uid,
                vid: item.vid,
                capital: item.capital ? '✅' : '⛔',
                harbor: item.harbor ? '✅' : '⛔',
                city: item.city ? '✅' : '⛔',
                aid: item.aid,
                inactive: item.inactive,
                vp: item.vp, harborStatus: JSON.stringify(item.harbor)
            }
        )))
    }

    function removeSelectedfromFarmList() {
        const selectedVillages = window.localStorage.getItem('SELECTED_VILLAGES');
        console.log('got item from local storage')
        const checkedVillages = JSON.parse(selectedVillages)
        console.log('parsed item')
        /*const prevFarms = JSON.parse(currUserFarms)*/
        const farmlistObj = {}
        const selectedObj = {}
        if (checkedVillages.length > 0) checkedVillages.forEach((item) => ( selectedObj[item.vid] = item))
        if (staticFarmList !== null) staticFarmList.forEach((item) => (farmlistObj[item.vid] = item))

        if (checkedVillages.length > 0) checkedVillages.forEach((item) => (
            item.vid in farmlistObj ? delete farmlistObj[item.vid] : console.log('that farm is not in your list.')

        ))
        const farmListwithValuesRemoved = Object.values(farmlistObj)
        setStaticFarmList(farmListwithValuesRemoved)
        console.log('it should update the static farm list now.')
        //setFarmies(!farmies)
        //setFarmies(!farmies) 
        props.reset(farmListwithValuesRemoved.map((item) => (
            {
                id: item.id,
                x: item.x,
                y: item.y,
                xy: `${item.x}, ${item.y}`,
                region: item.region,
                village: item.village,
                population: item.population,
                player: `${item.player}`,
                alliance: item.alliance ? item.alliance : '⛔',
                uid: item.uid,
                vid: item.vid,
                capital: item.capital ? '✅' : '⛔',
                harbor: item.harbor ? '✅' : '⛔',
                city: item.city ? '✅' : '⛔',
                aid: item.aid,
                inactive: item.inactive,
                vp: item.vp, harborStatus: JSON.stringify(item.harbor)
            }
        )))

    }

    const currUserFarms = window.localStorage.getItem('MY_FARM_LIST');
    
    const persistentFarms = JSON.parse(currUserFarms) !== null ? JSON.parse(currUserFarms) : null;
    console.log((persistentFarms));
    /*farmies !== null ? console.log((farmies)) : console.log('farmies not intiialized');*/
    const [selectedFarms, setSelectedFarms] = useState(persistentFarms);
    const [userFarms, setUserFarms] = useState(persistentFarms);
    const [userFarmListLength, setUserFarmListLength] = useState(persistentFarms !== null ? persistentFarms.length : 0);
    const [staticFarmList, setStaticFarmList] = useState(persistentFarms !== null ? persistentFarms : [])
    /*const [renderNewList, setRenderNewList] = useState(false)*/
    /*props.reset(staticFarmList)*/

    useEffect(() => {
        console.log('adding to my farms', selectedFarms)

        //SETTING MY_FARM_LIST AS THE NEW SELECTED FARMS VALUE GOTTEN IN ADDSELECTEDTOFARMLIST FORMULA.
        window.localStorage.setItem('MY_FARM_LIST', JSON.stringify(selectedFarms));
        //GETTING THE NEWLY UPDATED VALUE, SO IF WE CLICK ADD TO FARMLIST AGAIN, WE DONT LOSE THE ONES WE ADDED BEFORE REFRESH. LATER, REMOVE DUPLICATE FARMS FROM LIST.
        //const updatingFarms = window.localStorage.getItem('MY_FARM_LIST');
        //let arr = JSON.parse(updatingFarms)

        setUserFarms(selectedFarms)
        console.log('USE EFFECT FOR SELECTEDFARMS IS RUNNING')
        /*setUserFarms(farmListDuplicatesRemoved)*/
    }, [selectedFarms])

    useEffect(() => {
        console.log('USE EFFECT FOR STATICFARMLIST IS RUNNING', staticFarmList)

        //SETTING MY_FARM_LIST AS THE NEW SELECTED FARMS VALUE GOTTEN IN ADDSELECTEDTOFARMLIST FORMULA.
        window.localStorage.setItem('MY_FARM_LIST', JSON.stringify(staticFarmList));
        //GETTING THE NEWLY UPDATED VALUE, SO IF WE CLICK ADD TO FARMLIST AGAIN, WE DONT LOSE THE ONES WE ADDED BEFORE REFRESH. LATER, REMOVE DUPLICATE FARMS FROM LIST.
        //const updatingFarms = window.localStorage.getItem('MY_FARM_LIST');
        //let arr = JSON.parse(updatingFarms)
        setUserFarmListLength(staticFarmList.length)
        /*setRenderNewList(!renderNewList)*/
        /*setUserFarms(staticFarmList)*/
        /*setSelectedRows([]);*/
        
        /*alert('Refresh')*/
        /*setUserFarms(farmListDuplicatesRemoved)*/
    }, [staticFarmList])
    useEffect(() => {
        console.log('USE EFFECT FOR LEEEEEEEEENGTH STATICFARMLIST IS RUNNING', staticFarmList)
        /*props.reset(staticFarmList)*/
        
    }, [userFarmListLength])
    useEffect(() => {
        console.log('USE EFFECT FOR userFARMS IS RUNNING')
        //const data = window.localStorage.getItem('MY_APP_STATE');
        //JSON.parse(data) === false ? setOpen(JSON.parse(data)) : console.log('open???', open)
        //console.log(data)
        //console.log(JSON.parse(data))

        /*if (currUserFarms !== []) setUserFarms(JSON.parse(currUserFarms))*/
        /*const unSortedFarmList = window.localStorage.getItem('MY_FARM_LIST');*/
        const myObj = {}
        if (userFarms !== null) userFarms.forEach((element) => myObj[element.vid] = element);
        const farmListDuplicatesRemoved = Object.values(myObj)
        console.log(farmListDuplicatesRemoved)
        window.localStorage.setItem('MY_FARM_LIST', JSON.stringify(farmListDuplicatesRemoved));
        setStaticFarmList(farmListDuplicatesRemoved)
        setUserFarmListLength(farmListDuplicatesRemoved.length)

        
        
    }, [userFarms]);

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleFarms, setToggleFarms] = useState([false]);

    const areWeShowingFarms = window.localStorage.getItem('SHOWING_FARMIES');
    const test = JSON.parse(areWeShowingFarms) === false ? JSON.parse(areWeShowingFarms) : true;

    const [farmies, setFarmies] = useState(test);
    const [tableData, setTableData] = useState(props.info.map((item) => (
        {
            id: item.id,
            x: item.x,
            y: item.y,
            xy: `${item.x}, ${item.y}`,
            region: item.region,
            village: item.village,
            population: item.population,
            player: `${item.player}`,
            alliance: item.alliance ? item.alliance : '⛔',
            uid: item.uid,
            vid: item.vid,
            capital: item.capital ? '✅' : '⛔',
            harbor: item.harbor ? '✅' : '⛔',
            city: item.city ? '✅' : '⛔',
            aid: item.aid,
            inactive: item.inactive,
            vp: item.vp,
            harborStatus: item.harbor,
            date: item.date,
            distance: distance ? distance : null
        }
    )));

    useEffect(() => {
        console.log('USE EFFECT FOR FARMIES IS RUNNING')
        console.log('SHOWING FARMS IN LIST ? ', farmies)
        window.localStorage.setItem('SHOWING_FARMIES', JSON.stringify(farmies));

        const allSOWVillages = {}
        const allSOWVillagesWithoutFarms = {}

        props.info.forEach((item) => (allSOWVillages[item.vid] = item))

        if (staticFarmList !== null) staticFarmList.forEach((item) => (allSOWVillagesWithoutFarms[item.vid] = item))
        if (staticFarmList !== null) staticFarmList.forEach((item) => (
            item.vid in allSOWVillages ? delete allSOWVillages[item.vid] : console.log('Well, that is an old farm.')
        ))



        const tableDataFarmsRemoved = Object.values(allSOWVillages)

        const data = farmies === true ?
            props.info.map((item) => (
                {
                    id: item.id,
                    x: item.x,
                    y: item.y,
                    xy: `${item.x}, ${item.y}`,
                    region: item.region,
                    village: item.village,
                    population: item.population,
                    player: `${item.player}`,
                    alliance: item.alliance ? item.alliance : '⛔',
                    uid: item.uid,
                    vid: item.vid,
                    capital: item.capital ? '✅' : '⛔',
                    harbor: item.harbor ? '✅' : '⛔',
                    city: item.city ? '✅' : '⛔',
                    aid: item.aid,
                    inactive: item.inactive,
                    vp: item.vp, harborStatus: item.harbor,
                    distance: distance ? distance : null
                }
            )) : tableDataFarmsRemoved.map((item) => (
                {
                    id: item.id,
                    x: item.x,
                    y: item.y,
                    xy: `${item.x}, ${item.y}`,
                    region: item.region,
                    village: item.village,
                    population: item.population,
                    player: `${item.player}`,
                    alliance: item.alliance ? item.alliance : '⛔',
                    uid: item.uid,
                    vid: item.vid,
                    capital: item.capital ? '✅' : '⛔',
                    harbor: item.harbor ? '✅' : '⛔',
                    city: item.city ? '✅' : '⛔',
                    aid: item.aid,
                    inactive: item.inactive,
                    vp: item.vp, harborStatus: JSON.stringify(item.harbor),
                    distance: distance ? distance : null
                }
            ))

        setTableData(data)
        
    }, [farmies])
    
    useEffect(() => {
        console.log('USE EFFECT FOR SELECTEDROWS IS RUNNING')
        console.log('selecting village', selectedRows)
        window.localStorage.setItem('SELECTED_VILLAGES', JSON.stringify(selectedRows));
        
    }, [selectedRows])

    //useEffect(() => {

    //    const allSOWVillages = {}
    //    const allSOWVillagesWithoutFarms = {}

    //    props.info.forEach((item) => (allSOWVillages[item.vid] = item))

    //    if (staticFarmList !== null) staticFarmList.forEach((item) => (allSOWVillagesWithoutFarms[item.vid] = item))
    //    if (staticFarmList !== null) staticFarmList.forEach((item) => (
    //        item.vid in allSOWVillages ? delete allSOWVillages[item.vid] : console.log('Well, that is an old farm.')
    //    ))



    //    const tableDataFarmsRemoved = Object.values(allSOWVillages)

    //    const data = farmies === true ?
    //        props.info.map((item) => (
    //            {
    //                id: item.id,
    //                x: item.x,
    //                y: item.y,
    //                xy: `${item.x}, ${item.y}`,
    //                region: item.region,
    //                village: item.village,
    //                population: item.population,
    //                player: `${item.player}`,
    //                alliance: item.alliance ? item.alliance : '⛔',
    //                uid: item.uid,
    //                vid: item.vid,
    //                capital: item.capital ? '✅' : '⛔',
    //                harbor: item.harbor ? '✅' : '⛔',
    //                city: item.city ? '✅' : '⛔',
    //                aid: item.aid,
    //                inactive: item.inactive,
    //                vp: item.vp, harborStatus: item.harbor
    //            }
    //        )) : tableDataFarmsRemoved.map((item) => (
    //            {
    //                id: item.id,
    //                x: item.x,
    //                y: item.y,
    //                xy: `${item.x}, ${item.y}`,
    //                region: item.region,
    //                village: item.village,
    //                population: item.population,
    //                player: `${item.player}`,
    //                alliance: item.alliance ? item.alliance : '⛔',
    //                uid: item.uid,
    //                vid: item.vid,
    //                capital: item.capital ? '✅' : '⛔',
    //                harbor: item.harbor ? '✅' : '⛔',
    //                city: item.city ? '✅' : '⛔',
    //                aid: item.aid,
    //                inactive: item.inactive,
    //                vp: item.vp, harborStatus: JSON.stringify(item.harbor)
    //            }
    //        ))

    //    setTableData(data)
        
    //    const currUserFarms = window.localStorage.getItem('MY_FARM_LIST');
    //    const getFarmList = JSON.parse(currUserFarms) ? JSON.parse(currUserFarms) : null;
    //    //props.reset(getFarmList.map((item) => (
    //    //    {
    //    //        id: item.id,
    //    //        x: item.x,
    //    //        y: item.y,
    //    //        xy: `${item.x}, ${item.y}`,
    //    //        region: item.region,
    //    //        village: item.village,
    //    //        population: item.population,
    //    //        player: `${item.player}`,
    //    //        alliance: item.alliance ? item.alliance : '⛔',
    //    //        uid: item.uid,
    //    //        vid: item.vid,
    //    //        capital: item.capital ? '✅' : '⛔',
    //    //        harbor: item.harbor ? '✅' : '⛔',
    //    //        city: item.city ? '✅' : '⛔',
    //    //        aid: item.aid,
    //    //        inactive: item.inactive,
    //    //        vp: item.vp, harborStatus: JSON.stringify(item.harbor)
    //    //    }
    //    //)))
    //    console.log(getFarmList)
    //}, [setRenderNewList])
    //useEffect(() => {
    //    const updateFarm = window.localStorage.getItem('MY_FARM_LIST');

    //    if (updateFarm !== null) setFarmies(JSON.parse(updateFarm));
    //}, []);

    return (
        //<div>


            //{props.info.map((item) => (
            //    <div key={item.id}>

            //        <li>({item.x}, {item.y}) {item.village} {item.player} {item.population} </li>
            //    </div>
            //))}
        //</div>
        /* <Box ClassName="App-table-header"  sx={{ height: '100%', width: '100%' }}>*/

            <DataGrid getRowHeight={() => 'auto'}
                rows={tableData
                }
                
                columns={columns}
                slots={{ toolbar: CustomToolbar,
                    loadingOverlay: LinearProgress,
                }}
            slotProps={{
                toolbar: {
                    setFarmies: setFarmies,
                    farmies: farmies,
                    addSelectedtoFarmList: addSelectedtoFarmList,
                    userFarms: userFarms,
                    userFarmListLength: userFarmListLength,
                    removeSelectedfromFarmList: removeSelectedfromFarmList,
                    selectedRows: selectedRows,
                    addParsedFarmlist: addParsedFarmlist,
                    farms: props.farms,
                    resetter: props.reset,
                    staticFarmList: staticFarmList,
                    setTableData: setTableData,
                    setTextInputX: setTextInputX,
                    setTextInputY: setTextInputY,
                    textInputX: textInputX,
                    textInputY: textInputY,
                    info: props.info
                }
            }}
                
                sx={{
                    margin: -2,
                    boxShadow: 2,
                    border: 0,
                    backgroundColor: `${blue[0]}`,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-row:hover': {
                        color: 'primary.light',
                        backgroundColor: blue[50],
                    }, 
                    
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
                }
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: props.pageSize || 5
,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = tableData.filter((row: any) =>
                    selectedIDs.has(row.id)
                );
                setSelectedRows(selectedRows);

            }}
                /*selectionModel={selectedRows}*/

            />
       /* </Box>*/
    );
}
//props.item.map((fields) => (
//    <p>{props.item} test </p>
//    ))}

export default VillageTable;
