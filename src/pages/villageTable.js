// JavaScript source code
import * as React from 'react';
import { useState, useEffect } from 'react';
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
            return <a class="App-retro-button" target="_blank"  href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}` }>({params.row.x}, {params.row.y})</a>;
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
        flex:   0.5,
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
            return <ColorButton size="small" fg={blue[400]} bg={blue[300]} className="App-button" variant="filledTonal" target="_blank" href={`https://sow.x1.europe.travian.com/karte.php?x=${params.row.x}&y=${params.row.y}`}> {params.row.village} </ColorButton> ;
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
    { field: 'capital', headerName: 'Capital', headerClassName: 'App-table-header', align: 'right', minWidth: 70, flex: 0.5},
    { field: 'harbor', headerName: 'Harbor', headerClassName: 'App-table-header', align: 'right', minWidth: 70, flex: 0.5 },
    { field: 'city', headerName: 'City', headerClassName: 'App-table-header', headerAlign: 'left', align: 'right', minWidth: 70, flex: 0.5 },
];




function CustomToolbar({ farmies, setFarmies, addSelectedtoFarmList, userFarms, userFarmListLength, removeSelectedfromFarmList, selectedRows }) {
    const handleSetFarmies = () => {
        console.log(farmies)
        setFarmies(!farmies)
        console.log(farmies)
    }
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
            <Button variant="contained" color={selectedRows.length > 0 ? 'secondary' : 'primary'  } size="small" startIcon={<LibraryAddCheckIcon /> } onClick={() => addSelectedtoFarmList()}>Add Farms</Button>
            <Button variant="contained" color={selectedRows.length > 0 ? 'secondary' : 'primary'} size="small" startIcon={<LibraryAddCheckIcon />} onClick={() => removeSelectedfromFarmList()}>Remove Farms</Button>
        </GridToolbarContainer>
    );
}
/*onClick={ setToggleFarms(!toggleFarms) }*/

const VillageTable = (props) => {

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
        setFarmies(!farmies) 
        setFarmies(!farmies) 

    }

    const currUserFarms = window.localStorage.getItem('MY_FARM_LIST');
    
    const persistentFarms = JSON.parse(currUserFarms) !== null ? JSON.parse(currUserFarms) : null;
    console.log((persistentFarms));
    /*farmies !== null ? console.log((farmies)) : console.log('farmies not intiialized');*/
    const [selectedFarms, setSelectedFarms] = useState(persistentFarms);
    const [userFarms, setUserFarms] = useState(persistentFarms);
    const [userFarmListLength, setUserFarmListLength] = useState(persistentFarms !== null ? persistentFarms.length : 0);
    const [staticFarmList, setStaticFarmList] = useState(persistentFarms !== null ? persistentFarms : [])
    useEffect(() => {
        console.log('adding to my farms', selectedFarms)

        //SETTING MY_FARM_LIST AS THE NEW SELECTED FARMS VALUE GOTTEN IN ADDSELECTEDTOFARMLIST FORMULA.
        window.localStorage.setItem('MY_FARM_LIST', JSON.stringify(selectedFarms));
        //GETTING THE NEWLY UPDATED VALUE, SO IF WE CLICK ADD TO FARMLIST AGAIN, WE DONT LOSE THE ONES WE ADDED BEFORE REFRESH. LATER, REMOVE DUPLICATE FARMS FROM LIST.
        //const updatingFarms = window.localStorage.getItem('MY_FARM_LIST');
        //let arr = JSON.parse(updatingFarms)

        setUserFarms(selectedFarms)

        /*setUserFarms(farmListDuplicatesRemoved)*/
    }, [selectedFarms])

    useEffect(() => {
        console.log('deleting from my farms', staticFarmList)

        //SETTING MY_FARM_LIST AS THE NEW SELECTED FARMS VALUE GOTTEN IN ADDSELECTEDTOFARMLIST FORMULA.
        window.localStorage.setItem('MY_FARM_LIST', JSON.stringify(staticFarmList));
        //GETTING THE NEWLY UPDATED VALUE, SO IF WE CLICK ADD TO FARMLIST AGAIN, WE DONT LOSE THE ONES WE ADDED BEFORE REFRESH. LATER, REMOVE DUPLICATE FARMS FROM LIST.
        //const updatingFarms = window.localStorage.getItem('MY_FARM_LIST');
        //let arr = JSON.parse(updatingFarms)
        setUserFarmListLength(staticFarmList.length)
        /*setUserFarms(staticFarmList)*/

        /*setUserFarms(farmListDuplicatesRemoved)*/
    }, [staticFarmList])

    useEffect(() => {
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
            vp: item.vp, harborStatus: item.harbor
        }
    )));

    useEffect(() => {
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
                    vp: item.vp, harborStatus: item.harbor
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
                    vp: item.vp, harborStatus: JSON.stringify(item.harbor)
                }
            ))

        setTableData(data)

    }, [farmies])
    
    useEffect(() => {
        console.log('selecting village', selectedRows)
        window.localStorage.setItem('SELECTED_VILLAGES', JSON.stringify(selectedRows));
        
    }, [selectedRows])


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

            <DataGrid 
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
                    selectedRows: selectedRows
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

            />
       /* </Box>*/
    );
}
//props.item.map((fields) => (
//    <p>{props.item} test </p>
//    ))}

export default VillageTable;
