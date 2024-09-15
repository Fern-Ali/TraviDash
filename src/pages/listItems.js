import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ForumIcon from '@mui/icons-material/Forum';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom"
import Badge from '@mui/material/Badge';

export const mainListItems = (


  <React.Fragment>
        <Link to='/' style={{ textDecoration: 'none', color: 'black'}}>
            <ListItemButton sx={{ bgcolor: 'none'}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="TraviDex" />
            </ListItemButton>
        </Link>
        <Link to='/finder' style={{ textDecoration: 'none', color: 'black' }}>
    <ListItemButton>
      <ListItemIcon>
                    <Badge color="primary" badgeContent=" " variant="dot">
                        <ScreenSearchDesktopIcon />
                    </Badge>
      </ListItemIcon>
      <ListItemText primary="Farm Finder" />
        </ListItemButton>
        </Link>
        <Link to='/farms' style={{ textDecoration: 'none', color: 'black' }}>
    <ListItemButton>
      <ListItemIcon>
                    <Badge color="success" badgeContent=" " variant="dot">
                        <AgricultureIcon/>
                    </Badge>
      </ListItemIcon>
      <ListItemText primary="My Farms" />
        </ListItemButton>
        </Link>
        
        <Link to='/advanced' style={{ textDecoration: 'none', color: 'black' }}>
            
                <ListItemButton>
                    <ListItemIcon>
                        <Badge color="secondary" badgeContent={'Live'}>
                            <BarChartIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Advanced" />
                </ListItemButton>
            
    
        </Link>
        <Link to='/worlds' style={{ textDecoration: 'none', color: 'black' }}>
            
                <ListItemButton>
                <ListItemIcon>
                    <Badge color="info" badgeContent={'Beta'}>
                        <TravelExploreIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Inactive Map" />
                </ListItemButton>
                
        </Link>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      TraviDex Community
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Discord" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Updates" />
    </ListItemButton>
    <Link to='/checkout' style={{ textDecoration: 'none', color: 'black' }}>
    <ListItemButton>
      <ListItemIcon>
      <Badge color="warning" badgeContent={'Beta'} variant='dot' 
      anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}>
      <VolunteerActivismIcon />
      </Badge>
        
      </ListItemIcon>
      <ListItemText primary="TraviDex Plus" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);
