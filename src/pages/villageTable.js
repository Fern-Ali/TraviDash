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
import { purple, red, blue, green, teal, indigo, pink } from '@mui/material/colors';


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


const myFarmies = window.localStorage.getItem('MY_FARM_LIST');
function CustomToolbar({ farmies, setFarmies }) {
    const handleSetFarmies = () => {
        const showingFarms = myFarmies !== null ? window.localStorage.getItem('MY_FARM_LIST') : null
        console.log(showingFarms)
        if(showingFarms !== null) setFarmies(JSON.parse(showingFarms))
    }
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button variant="text" startIcon={<AgricultureIcon />} onClick={ handleSetFarmies } size='small'> {`Show (${farmies ? farmies.length : 0}) Farms`}
            </Button >
        </GridToolbarContainer>
    );
}
/*onClick={ setToggleFarms(!toggleFarms) }*/

const VillageTable = (props) => {
    

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleFarms, setToggleFarms] = useState([false]);
    const [farmies, setFarmies] = useState([myFarmies]);
    
    useEffect(() => {
        console.log('selecting village', selectedRows)
        window.localStorage.setItem('SELECTED_VILLAGES', JSON.stringify(selectedRows));
        
    }, [selectedRows])


    //useEffect(() => {
    //    const updateFarm = window.localStorage.getItem('MY_FARM_LIST');
        
    //    if (updateFarm !== null) setFarmies(JSON.parse(updateFarm));
    //}, []);


    const data = props.info.map((item) => (
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
            capital: item.capital ? '✅' : '⛔',
            harbor: item.harbor ? '✅' : '⛔',
            city: item.city ? '✅' : '⛔',
            aid: item.aid,
            inactive: item.inactive,
            vp: item.vp
        }
    ))
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
                rows={
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
                            capital: item.capital ? '✅' : '⛔',
                            harbor: item.harbor ? '✅' : '⛔',
                            city: item.city ? '✅' : '⛔',
                            aid: item.aid,
                            inactive: item.inactive,
                            vp: item.vp
                        }
                    ))
                }
                
                columns={columns}
                slots={{ toolbar: CustomToolbar }}
                slotProps={{ toolbar: { setFarmies: setFarmies, farmies: farmies } }}
                
                sx={{
                    margin: -2,
                    boxShadow: 2,
                    border: 0,
                    backgroundColor: `${indigo[0]}`,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.light',
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
                const selectedRows = data.filter((row: any) =>
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
