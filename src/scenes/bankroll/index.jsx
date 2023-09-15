import { Box, Typography, useTheme, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Header from "../../components/Header";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { mockDataBank as data } from "../../data/mockDataBankroll";
import { mockDataProfits as dataP } from "../../data/mockDataBankroll";

const NewBankroll = ({ title, capital, roi, to }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
      <Box
        sx={{
          backgroundColor: "white",
          color: "black",
          width: "350px",
          height: "320px",
          p: "10px",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography>{title}</Typography>
          <SettingsIcon />
        </Box>
        <Box display="flex" justifyContent="space-between" mt="5px">
          <Box>
            <Typography variant="h4" display="flex">
              <ArrowUpwardIcon sx={{ width: "18px" }} />
              23%
            </Typography>
            <Typography>Than yesterday</Typography>
          </Box>

          <Box>
            <Typography variant="h4">760 kcal</Typography>
            <Typography>Total burned</Typography>
          </Box>
          <Box>
            <Typography variant="h4">247 kcal</Typography>
            <Typography>Daily avg</Typography>
          </Box>
        </Box>
        <Box sx={{ height: "60%", width: "100%" }}>
          <ResponsiveBar
            data={data}
            keys={["AmountBetPerDay"]}
            indexBy="day"
            margin={{ top: 10, right: 0, bottom: 25, left: 30 }}
            padding={0.5}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "category10" }}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: -40,
            }}
            enableGridY={false}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) =>
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            }
          />
        </Box>
        <Box sx={{ height: "19%", width: "100%" }}>
          <ResponsiveBar
            data={dataP}
            keys={["Profits", "Losses"]}
            indexBy="Total"
            margin={{ top: 0, right: 0, bottom: 20, left: 0 }}
            padding={0.2}
            layout="horizontal"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "red_yellow_green" }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridY={false}
            enableLabel={false}
            labelSkipWidth={9}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 30,
                translateY: 10,
                itemWidth: 100,
                itemHeight: 10,
                itemsSpacing: 5,
                symbolSize: 10,
                itemDirection: "left-to-right",
              },
            ]}
            role="application"
            ariaLabel="Profits and losses of bankroll"
            barAriaLabel={(e) =>
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            }
          />
        </Box>
      </Box>
  );
};

const Bankroll = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { currentUser } = useContext(AuthContext);

  const [bankroll, setBankroll] = useState({});

  const userId = currentUser?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/bankroll/${userId}`);
        setBankroll(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <Box>
      <Box m="20px">
        <Header title="My Bankrolls" subtitle="Manage or add your bankrolls" />
      </Box>

      {Object.keys(bankroll).length ? (
        <Box
          ml="30px"
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          rowGap="50px"
          paddingBottom="20px"
        >
          {bankroll.map((bank) => (
            <Link 
            key={bank.id}
            to="/bets"
            state={{id: bank.id, name: bank.name}}
            style={{textDecoration: "none"}}
            >
              <NewBankroll title={bank.name} />
            </Link>
          ))}
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Box align="center">
            <AddToPhotosIcon
              sx={{
                fontSize: "110px",
                alignContent: "center",
                color: colors.greenAccent[600],
              }}
            />
            <Typography variant="h3" fontWeight="bold">
              What are you waiting for to add your first bankroll?
            </Typography>
            <Button
              sx={{ mt: "15px", backgroundColor: colors.greenAccent[600] }}
              variant="contained"
              component={Link}
              to={"/addbankroll"}
            >
              <AddCircleOutlineIcon sx={{ mr: "5px" }} /> Add bankroll
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Bankroll;
