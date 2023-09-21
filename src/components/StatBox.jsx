import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({title, subtitle, icon, firstValue = 0, secondValue = 0}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
     let progress;
     let increase;

    if(firstValue === 0) {
        progress = 1
        increase = 100
    }else {
        progress = (((secondValue * 100)/firstValue) / 100)
        increase = ((secondValue * 100)/firstValue).toFixed(2)
    }

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    sx={{ color: colors.grey[100]}}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={progress} firstValue={firstValue} secondValue={secondValue}/>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500]}}>
                    {subtitle}
                </Typography>
                <Typography 
                variant="h5" 
                fontStyle="italic" 
                sx={{ color: colors.greenAccent[600]}}>
                        {increase}%
                </Typography>
            </Box>
        </Box>
    )
}

export default StatBox;