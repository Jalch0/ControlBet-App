import { Box, Typography, useTheme, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { Link } from "react-router-dom";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Header from "../../components/Header"

const Bankroll = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Box m="20px">
                <Header title="My Bankrolls" subtitle="Manage or add your bankrolls"/>
            </Box>

            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <Box align="center">
                    <AddToPhotosIcon sx={{ fontSize: "110px", alignContent: "center", color: colors.greenAccent[600]}} />
                    <Typography 
                    variant="h3" 
                    fontWeight="bold"
                    >
                        What are you waiting for to add your first bankroll?
                    </Typography>
                    <Button 
                    sx={{mt: "15px", backgroundColor: colors.greenAccent[600]}} 
                    variant="contained"
                    component={Link}
                    to={'/addbankroll'}
                    > 
                    <AddCircleOutlineIcon sx={{ mr: "5px"}}/> Add bankroll
                    </Button>
                </Box>
            </Box>


        </Box>
    )

}

export default Bankroll;
