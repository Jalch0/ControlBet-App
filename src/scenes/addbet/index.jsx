import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Simplebet from "./simplebet";
import Combinatedbet from "./combinatedbet";
import useMediaQuery from "@mui/material/useMediaQuery";

const Addbet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const propsData = location.state;
  const Mobile = useMediaQuery("(min-width:800px)");

  const [bet, setBet] = useState("");

  if (bet === "simple") {
    return (
      <Simplebet setBet={setBet} id={propsData.id} name={propsData.name} />
    );
  } else if (bet === "combinated") {
    return (
      <Combinatedbet setBet={setBet} id={propsData.id} name={propsData.name} />
    );
  } else
    return (
      <Box
        width="100%"
        height="70vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            backgroundColor: colors.primary[600],
            padding: "20px",
            borderRadius: "10px",
            width: Mobile ? "50%" : "95%",
          }}
        >
          <Typography variant="h3" textAlign="center" marginBottom="10px">
            New Bet
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setBet("simple")}
            >
              Simple Bet
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setBet("combinated")}
            >
              Combined Bet
            </Button>
            {Mobile ?
              <Button variant="contained" color="primary" size="large">
                System Bet
              </Button>
            :
            <></>}
          </Box>
        </Box>
      </Box>
    );
};

export default Addbet;
