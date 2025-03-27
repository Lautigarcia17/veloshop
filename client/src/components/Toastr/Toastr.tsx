
import { Snackbar, Alert, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastrState } from '../../types/interfaces/toastrState';
import { toastrStyles } from '../../styles/toastrStyles';

function Toastr( {message, type, open, closeToastr} : ToastrState) {

    const currentStyle = toastrStyles[type] || toastrStyles.success;

    return (
        <>
            <Snackbar
                open={open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                TransitionComponent={(props) => <Slide {...props} direction='up' />}
            >
                <Alert
                    severity={type}
                    variant="outlined"
                    sx={{
                        width: '100%',
                        backgroundColor: currentStyle.backgroundColor,
                        borderColor: currentStyle.borderColor,
                        color: currentStyle.color,
                        fontFamily: 'Ubuntu',
                        fontSize: '18px',
                        padding: "10px ",
                        display: 'flex', 
                        alignItems: 'center'
                    }}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            onClick={closeToastr}
                        >
                            <CloseIcon sx={{color: 'white', fontWeight: 700, marginRight: '6px'}}  fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Toastr