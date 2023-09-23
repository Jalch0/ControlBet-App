import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from "../theme"
import useMediaQuery from '@mui/material/useMediaQuery';


const Header = ({ title, subtitle }) =>  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const Mobile = useMediaQuery('(min-width:800px)');

    return <Box mb="30px">
        <Typography 
        variant={Mobile ? "h2" : "h4"} 
        color={colors.grey[100]} 
        fontWeight="bold" 
        sx={{ mb: "5px"}}
        >
            {title}
        </Typography>
        <Typography
        variant={Mobile ? "h5" : "h6"}
        color={colors.greenAccent[400]}
        >{subtitle}</Typography>

    </Box>
}

export default Header