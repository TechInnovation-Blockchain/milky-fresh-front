import {
	Box, Container, Stack, Divider, TextField, InputAdornment,
	Typography, Table, TableBody, TableCell, TableContainer,
	TableRow, TableHead, Collapse, Button, Grid, CircularProgress,
	Link
} from '@mui/material'

const Test = () => {
	return (
        <Stack flexDirection='row' alignItems='center' justifyContent='center'>
            <Typography sx={{ paddingTop: '40px', fontSize: '40px', color: '#fff', fontWeight: 'bold' }}>COMING SOON {process.env.REACT_APP_PRODUCTION}</Typography>
        </Stack>
    )
}

export default Test