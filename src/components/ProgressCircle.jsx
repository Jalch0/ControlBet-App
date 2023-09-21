import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({firstValue = 0, secondValue= 0, progress, size="40"}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    if(firstValue === 0) {
        progress = 1
    }else {
        progress = (((secondValue * 100)/firstValue) / 100)
    }
    const angle = progress * 360;

    return (
        <Box 
        sx={{
            background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
                ${colors.greenAccent[500]}`,
            borderRadius: "50%",
            width: `${size}px`,
            height: `${size}px`,
        }}
        />
    )
}

export default ProgressCircle;