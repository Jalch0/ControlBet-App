import { Box, Typography, useTheme, Button } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Header from "../../components/Header";
import { AuthContext } from "../../context/authContext";
import { ResponsiveBar } from "@nivo/bar";
import useMediaQuery from "@mui/material/useMediaQuery";

const NewBankroll = ({ id, name, capital }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bets, setBet] = useState([]);

  let daysbet = [0, 0, 0, 0, 0, 0, 0];

  const mockDataBank = [
    {
      day: "Mon",
      AmountGainPerDay: 0,
      color: "#3A82D4",
    },
    {
      day: "Tue",
      AmountGainPerDay: 0,
      color: "hsl(298, 70%, 50%)",
    },
    {
      day: "Wed",
      AmountGainPerDay: 0,
      color: "hsl(298, 70%, 50%)",
    },
    {
      day: "Thur",
      AmountGainPerDay: 0,
      color: "hsl(298, 70%, 50%)",
    },
    {
      day: "Fri",
      AmountGainPerDay: 0,
      color: "hsl(298, 70%, 50%)",
    },
    {
      day: "Sat",
      AmountGainPerDay: 0,
      color: "hsl(298, 70%, 50%)",
    },
    {
      day: "Sun",
      AmountGainPerDay: 0,
      color: "hsl(298, 70%, 50%)",
    },
  ];

  const mockDataProfits = [
    {
      Total: "$",
      Profits: 0,
      ProfitsColor: colors.blueAccent[500],
      Losses: 0,
      LossesColor: colors.redAccent[500],
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/bet/${id}`);
        setBet(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const day = new Date().toDateString().split(" ");

  bets.map((i) => {
    const dateCalc = i.date.split(" ");

    if (i.state === "Won") {
      mockDataProfits[0].Profits =
        mockDataProfits[0].Profits + (i.amount * i.odd - i.amount);
    } else if (i.state === "Lost") {
      mockDataProfits[0].Losses = mockDataProfits[0].Losses + i.amount;
    }

    if (day[1] === dateCalc[1] && Number(day[2]) === Number(dateCalc[2])) {
      if (i.state === "Won") {
        daysbet[0] = daysbet[0] + (i.amount * i.odd - i.amount);
      } else if (i.state === "Lost") {
        daysbet[0] = daysbet[0] - i.amount;
      }
      mockDataBank.map((ds) => {
        if (ds.day === dateCalc[0]) {
          if (Math.sign(daysbet[0]) === 1) {
            ds.color = "#2ca02c";
          } else {
            ds.color = colors.redAccent[500];
          }

          ds.AmountGainPerDay = Math.abs(daysbet[0].toFixed(2));
        }
      });
    }

    if (day[1] === dateCalc[1] && day[2] - 1 === Number(dateCalc[2])) {
      if (i.state === "Won") {
        daysbet[1] = daysbet[1] + (i.amount * i.odd - i.amount);
      } else if (i.state === "Lost") {
        daysbet[1] = daysbet[1] - i.amount;
      }
      mockDataBank.map((ds) => {
        if (ds.day === dateCalc[0]) {
          if (Math.sign(daysbet[1]) === 1) {
            ds.color = "#2ca02c";
          } else {
            ds.color = colors.redAccent[500];
          }
          ds.AmountGainPerDay = Math.abs(daysbet[1].toFixed(2));
        }
      });
    }
    if (day[1] === dateCalc[1] && day[2] - 2 === Number(dateCalc[2])) {
      if (i.state === "Won") {
        daysbet[2] = daysbet[2] + (i.amount * i.odd - i.amount);
      } else if (i.state === "Lost") {
        daysbet[2] = daysbet[2] - i.amount;
      }
      mockDataBank.map((ds) => {
        if (ds.day === dateCalc[0]) {
          if (Math.sign(daysbet[2]) === 1) {
            ds.color = "#2ca02c";
          } else {
            ds.color = colors.redAccent[500];
          }
          ds.AmountGainPerDay = Math.abs(daysbet[2].toFixed(2));
        }
      });
    }
    if (day[1] === dateCalc[1] && day[2] - 3 === Number(dateCalc[2])) {
      if (i.state === "Won") {
        daysbet[3] = daysbet[3] + (i.amount * i.odd - i.amount);
      } else if (i.state === "Lost") {
        daysbet[3] = daysbet[3] - i.amount;
      }
      mockDataBank.map((ds) => {
        if (ds.day === dateCalc[0]) {
          if (Math.sign(daysbet[3]) === 1) {
            ds.color = "#2ca02c";
          } else {
            ds.color = colors.redAccent[500];
          }
          ds.AmountGainPerDay = Math.abs(daysbet[3].toFixed(2));
        }
      });
    }
    if (day[1] === dateCalc[1] && day[2] - 4 === Number(dateCalc[2])) {
      if (i.state === "Won") {
        daysbet[4] = daysbet[4] + (i.amount * i.odd - i.amount);
      } else if (i.state === "Lost") {
        daysbet[4] = daysbet[4] - i.amount;
      }
      mockDataBank.map((ds) => {
        if (ds.day === dateCalc[0]) {
          if (Math.sign(daysbet[4]) === 1) {
            ds.color = "#2ca02c";
          } else {
            ds.color = colors.redAccent[500];
          }
          ds.AmountGainPerDay = Math.abs(daysbet[4].toFixed(2));
        }
      });
    }
    if (day[1] === dateCalc[1] && day[2] - 5 === Number(dateCalc[2])) {
      if (i.state === "Won") {
        daysbet[5] = daysbet[5] + (i.amount * i.odd - i.amount);
      } else if (i.state === "Lost") {
        daysbet[5] = daysbet[5] - i.amount;
      }
      mockDataBank.map((ds) => {
        if (ds.day === dateCalc[0]) {
          if (Math.sign(daysbet[5]) === 1) {
            ds.color = "#2ca02c";
          } else {
            ds.color = colors.redAccent[500];
          }
          ds.AmountGainPerDay = Math.abs(daysbet[5].toFixed(2));
        }
      });
    }
    if (day[1] === dateCalc[1] && day[2] - 6 === Number(dateCalc[2])) {
      if (i.state === "Won") {
        daysbet[6] = daysbet[6] + (i.amount * i.odd - i.amount);
      } else if (i.state === "Lost") {
        daysbet[6] = daysbet[6] - i.amount;
      }
      mockDataBank.map((ds) => {
        if (ds.day === dateCalc[0]) {
          if (Math.sign(daysbet[6]) === 1) {
            ds.color = "#2ca02c";
          } else {
            ds.color = colors.redAccent[500];
          }
          ds.AmountGainPerDay = Math.abs(daysbet[6].toFixed(2));
        }
      });
    }
  });

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        color: "white",
        width: "350px",
        height: "320px",
        p: "12px",
        borderRadius: "10px",
        boxShadow: "-1px 2px 4px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color={colors.grey[100]}>{name}</Typography>
        <Box>
          <Link
            to="/editbankroll"
            state={{ id: id, name: name, capital: capital }}
          >
            <EditIcon sx={{ color: colors.grey[200], marginTop: "5px" }} />
          </Link>
          <HighlightOffIcon
            sx={{ color: colors.grey[200] }}
            onClick={async () => {
              try {
                await axios.delete(`/bankroll/${id}`);
                window.location.reload(false);
              } catch (err) {
                console.log(err);
              }
            }}
            cursor="pointer"
          />
        </Box>
      </Box>
      <Link
        to="/bets"
        state={{ id: id, name: name, capital: capital }}
        style={{ textDecoration: "none" }}
      >
        <Box display="flex" justifyContent="space-between" mt="5px">
          <Box>
            {Math.sign((daysbet[0] - daysbet[1]) / Math.abs(daysbet[1])) ===
            1 ? (
              <Typography variant="h4" display="flex" color="green">
                <ArrowUpwardIcon sx={{ width: "18px" }} />
                {(
                  ((daysbet[0] - daysbet[1]) / Math.abs(daysbet[1])) *
                  100
                ).toFixed(2)}
                %
              </Typography>
            ) : (
              <Typography
                variant="h4"
                display="flex"
                color={colors.redAccent[500]}
              >
                <ArrowDownwardIcon sx={{ width: "18px" }} />
                {(
                  ((daysbet[0] - daysbet[1]) / Math.abs(daysbet[1])) *
                  100
                ).toFixed(2)}
                %
              </Typography>
            )}
            <Typography color={colors.grey[100]} >Than yesterday</Typography>
          </Box>

          <Box>
            <Typography variant="h4" color={colors.greenAccent[500]}>
              {capital}$
            </Typography>
            <Typography color={colors.grey[100]} >Starting Capital</Typography>
          </Box>
          <Box>
            <Typography variant="h4" color={colors.greenAccent[500]}>
              {(mockDataProfits[0].Profits - mockDataProfits[0].Losses).toFixed(
                2
              )}
              $
            </Typography>
            <Typography color={colors.grey[100]} >Total Gains</Typography>
          </Box>
        </Box>
        <Box sx={{ height: "60%", width: "100%" }}>
          <ResponsiveBar
            data={mockDataBank}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: colors.grey[100],
                  },
                },
                legend: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
                ticks: {
                  line: {
                    stroke: colors.grey[100],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: colors.grey[100],
                  },
                },
              },
            }}
            keys={["AmountGainPerDay"]}
            indexBy="day"
            margin={{ top: 10, right: 0, bottom: 25, left: 30 }}
            padding={0.5}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={({ data }) => data.color}
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
            data={mockDataProfits}
            theme={{
              legends: {
                text: {
                  fill: colors.grey[100],
                },
              },
            }}
            keys={["Profits", "Losses"]}
            indexBy="Total"
            margin={{ top: 0, right: 0, bottom: 20, left: 0 }}
            padding={0.2}
            layout="horizontal"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "category10" }}
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
      </Link>
    </Box>
  );
};

const Bankroll = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Desktop = useMediaQuery("(min-width:1400px)");
  const Ipad = useMediaQuery("(min-width:1000px)");
  const Mobile = useMediaQuery("(min-width:800px)");

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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box m="20px">
          <Header
            title="My Bankrolls"
            subtitle="Manage or add your bankrolls"
          />
        </Box>
        {Object.keys(bankroll).length ? (
          <Button
            sx={{
              backgroundColor: colors.greenAccent[600],
              height: "40px",
              mr: Mobile ? "15px" : "5px",
            }}
            variant="contained"
            component={Link}
            to={"/addbankroll"}
          >
            <AddCircleOutlineIcon sx={{ mr: "5px" }} /> Add bankroll
          </Button>
        ) : (
          ""
        )}
      </Box>

      {Object.keys(bankroll).length ? (
        <Box
          ml="30px"
          mr="30px"
          display="grid"
          gridTemplateColumns={
            !Ipad ? "1fr" :
            (!Mobile ? "1fr" :
            (!Desktop ? "1fr 1fr" :
            "1fr 1fr 1fr"))
          }
          rowGap="50px"
          paddingBottom="20px"
        >
          {bankroll.map((bank) => (
            <NewBankroll
              key={bank.id}
              id={bank.id}
              name={bank.name}
              capital={bank.capital}
            />
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
            <Typography variant={Mobile ? "h3" : "h4"} fontWeight="bold">
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
