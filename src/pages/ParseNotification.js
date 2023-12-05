import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Box from '@mui/material/Box';
import AddchartIcon from '@mui/icons-material/Addchart';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ParseNotification({ parser, farmNumber, refresher, farms }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        
    };
    const handleParse = () => {
        setOpen(false);
        parser();
        /*refresher(true);*/
    };

    return (
        <React.Fragment>
            <Badge badgeContent={farmNumber} color="secondary">
                <Button variant="contained" disabled={ farms === null || typeof(farms.message) === 'string' ? true : false } color="primary" size="small" onClick={ handleClickOpen } startIcon={
                                                                                        <AddchartIcon size="small" color="white" />
                                                                                               
                                                                                        } >
            
                {/*<Badge badgeContent={farmNumber} color="secondary">*/}
                {/*    <NotificationsIcon color="primary" />*/}

                    {/*</Badge>*/}Add Parsed Farms {  }
            </Button>
            </Badge>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle align={ 'center' } sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Update Farmlist?
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ maxWidth: 400 }}>
                    <Typography gutterBottom align={'center'}>
                        {`Attempt to add  (${farmNumber != null ? farmNumber : 0}) items to be parsed.` }
                        
                        
                    </Typography>
                    {/*<Typography gutterBottom align={'center'} >*/}
                    {/*    <Box >*/}
                    {/*        To optimize its performance, select features will be exclusively offered to*/}
                    {/*        TraviDex Plus*/}
                    {/*        users starting Jan 1st, 2024.*/}
                            


                    {/*    </Box>  */}
                        
                    {/*</Typography>*/}
                    <Typography gutterBottom align={'center' }>
                        Would you like to continue?
                    </Typography>
                    {/*<Typography gutterBottom align={'center'}>*/}
                    {/*    Your journey with us fuels our passion.*/}
                    {/*</Typography>*/}
                </DialogContent>
                <DialogActions >
                    <Button autoFocus onClick={handleParse} variant='contained' color="success">
                        Yes, Do it!
                    </Button>
                    <Button autoFocus onClick={handleClose} variant='contained' color="error">
                        No, Don't!
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}