import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from "../theme"
import useMediaQuery from '@mui/material/useMediaQuery';


const Header = ({ title, subtitle }) =>  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const Desktop = useMediaQuery('(min-width:1200px)');
    const Ipad = useMediaQuery('(min-width:1000px)');
    const Mobile = useMediaQuery('(min-width:800px)');

    return <Box mb="30px">
        <Typography 
        variant={Mobile ? "h2" : "h3"} 
        color={colors.grey[100]} 
        fontWeight="bold" 
        sx={{ mb: "5px"}}
        >
            {title}
        </Typography>
        <Typography
        variant="h5"
        color={colors.greenAccent[400]}
        >{subtitle}</Typography>

    </Box>
}

export default Header