import { CircularProgress } from "@mui/material";

function LoadingSpinner() {
    return (
        <div style={{display: 'flex', justifyContent:'center',alignItems:'center',width:'100%', position: 'absolute', marginTop: '30px'}}>
            <CircularProgress size="30px" color='inherit'/>
        </div>
    )
}

export default LoadingSpinner;