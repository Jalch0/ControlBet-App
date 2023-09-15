import { Box, Typography, useTheme, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { tokens } from "../../theme";

const Bets = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation()
    const propsData = location.state;
    console.log(propsData);

    return (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Box align="center">
            <CurrencyExchangeIcon
              sx={{
                fontSize: "110px",
                alignContent: "center",
                color: colors.greenAccent[500],
              }}
            />
            <Typography variant="h3" fontWeight="bold">This is the bankroll {propsData.name}</Typography>
            <Typography variant="h3" fontWeight="bold">
              What are you waiting for to add your first bet?
            </Typography>
            <Button
              sx={{ mt: "15px", backgroundColor: colors.greenAccent[600] }}
              variant="contained"
              component={Link} 
              to={"/addbet"}
              state={{id: propsData.id, name: propsData.name}}
            >
              <AddCircleOutlineIcon sx={{ mr: "5px" }} /> Add Bet
            </Button>
          </Box>
        </Box>
    )
}

export default Bets