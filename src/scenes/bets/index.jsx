import { Box, Typography, useTheme, Button, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { tokens } from "../../theme";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import LineChart from "../../components/LineChart";

const TableBets = ({
  id,
  name,
  bookmarker,
  odd,
  stake,
  type,
  date,
  state,
  sport,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      margin="15px"
      padding="10px"
      borderRadius="10px"
      backgroundColor={colors.primary[400]}
    >
      <Box width="50%">
        <Box display="flex">
          <Typography variant="h7" color={colors.grey[200]} marginRight="10px">
            {date}
          </Typography>
          <Box
            padding="0px 5px 0px 5px"
            borderRadius="20px"
            backgroundColor={ theme.palette.mode === "dark" ? colors.greenAccent[800]: colors.blueAccent[500]}
            fontSize="12px"
            display="flex"
            alignItems="center"
          >
            {type}
          </Box>
        </Box>

        <Box display="flex">
          <EmojiEventsIcon sx={{ color: colors.blueAccent[500] }} />
          <Typography variant="h6">{name}</Typography>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
        width="100%"
      >
        <Box padding="0 15px 0 15px" display="flex" alignItems="center">
          <Typography>{bookmarker}</Typography>
        </Box>
        <Box
          padding="0 15px 0 15px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6" color={colors.grey[200]}>
            Total Odd
          </Typography>
          <Typography>{odd}</Typography>
        </Box>
        <Box
          padding="0 15px 0 15px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6" color={colors.grey[200]}>
            Total Stake
          </Typography>
          <Typography>{stake}$</Typography>
        </Box>
        <Box
          padding="0 15px 0 15px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6" color={colors.grey[200]}>
            Total Gain
          </Typography>

          {state === "Lost" && (
            <Typography color={colors.redAccent[500]}>-{stake}$</Typography>
          )}
          {state === "Won" && (
            <Typography color={colors.greenAccent[500]}>
              {(stake * odd).toFixed(2)}$
            </Typography>
          )}
          {state === "Pending" && (
            <Typography color="#F4D35E">{(stake * odd).toFixed(2)}$</Typography>
          )}
          {state === "Canceled" && (
            <Typography color={colors.grey[200]}>--$</Typography>
          )}
          {state === "Cashout" && (
            <Typography color={colors.redAccent[500]}>--{stake}$</Typography>
          )}
        </Box>
        <Box
          padding="0 15px 0 15px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6" color={colors.grey[200]}>
            Total Profit
          </Typography>

          {state === "Lost" && (
            <Typography color={colors.redAccent[500]}>-{stake}$</Typography>
          )}
          {state === "Won" && (
            <Typography color={colors.greenAccent[500]}>
              {(stake * odd - stake).toFixed(2)}$
            </Typography>
          )}
          {state === "Pending" && (
            <Typography color="#F4D35E">
              {(stake * odd - stake).toFixed(2)}$
            </Typography>
          )}
          {state === "Canceled" && (
            <Typography color={colors.grey[200]}>--$</Typography>
          )}
          {state === "Cashout" && (
            <Typography color={colors.grey[200]}>--$</Typography>
          )}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <HighlightOffIcon
          sx={{ color: colors.greenAccent[500] }}
          onClick={async () => {
            try {
              await axios.delete(`/bet/${id}`);
              window.location.reload(false);
            } catch (err) {
              console.log(err);
            }
          }}
          cursor="pointer"
        />

        {type === "simple" ? (
          <Link
            to="/editsimplebet"
            state={{
              id: id,
              name: name,
              capital: stake,
              bookmarker: bookmarker,
              sport: sport,
              odd: odd,
            }}
          >
            <EditIcon
              sx={{ color: colors.greenAccent[500], marginTop: "5px" }}
            />
          </Link>
        ) : (
          <Link
            to="/editcombinedbet"
            state={{
              id: id,
              name: name,
              capital: stake,
              bookmarker: bookmarker,
              sport: sport,
              odd: odd,
            }}
          >
            <EditIcon
              sx={{ color: colors.greenAccent[500], marginTop: "5px" }}
            />
          </Link>
        )}
      </Box>
    </Box>
  );
};

const ComponentBet = ({ title, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="250px"
      height="100px"
      borderRadius="10px"
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor={colors.primary[400]}
    >
      <Typography variant="h5" color={colors.grey[500]}>
        {title}
      </Typography>
      <Typography variant="h3" color={colors.greenAccent[500]}>
        {data}
      </Typography>
    </Box>
  );
};

const Bets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const propsData = location.state;

  const [bets, setBet] = useState([]);
  const [update, setUpdate] = useState();

  const bankrollId = propsData.id;
  let totalgraph = propsData.capital;

  const DataLineChart = [
    {
      id: "capital",
      color: tokens("dark").greenAccent[500],
      data: [
        {
          x: "Starting Capital",
          y: totalgraph,
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/bet/${bankrollId}`);
        setBet(res.data);
        if(theme.palette.mode === "dark"){
          setUpdate(theme.palette.mode);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [bankrollId, theme.palette.mode]);

  bets.map((i) => {
    if (i.state === "Won") {
      totalgraph = totalgraph + (i.amount * i.odd - i.amount);
      DataLineChart[0].data.push({ x: i.name, y: totalgraph });
    } else if (i.state === "Lost" || i.state === "Cashout") {
      totalgraph = totalgraph - i.amount;
      DataLineChart[0].data.push({ x: i.name, y: totalgraph });
    }
  });

  console.log(DataLineChart[0]);
  console.log(bets, "lol")
  console.log(update);
  return (
    <>
      {Object.keys(bets).length ? (
        <Box>
          <Box>
            <Box
              marginLeft="15px"
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h2">
                  {propsData.name}{" "}
                  <Link
                    to="/editbankroll"
                    state={{
                      id: propsData.id,
                      name: propsData.name,
                      capital: propsData.capital,
                    }}
                  >
                    <EditIcon
                      sx={{ color: colors.greenAccent[500], marginTop: "5px" }}
                    />
                  </Link>
                </Typography>

                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  fontWeight="bold"
                >
                  Starting Capital {propsData.capital}$
                </Typography>
                <Typography
                  variant="h5"
                  color={colors.blueAccent[500]}
                  fontWeight="bold"
                >
                  Actual Capital {totalgraph.toFixed(2)}$
                </Typography>
              </Box>
              <Box mr="15px">
                <Button
                  sx={{ mt: "15px", backgroundColor: colors.greenAccent[600] }}
                  variant="contained"
                  component={Link}
                  to={"/addbet"}
                  state={{
                    id: propsData.id,
                    name: propsData.name,
                    capital: propsData.capital,
                  }}
                >
                  <AddCircleOutlineIcon sx={{ mr: "5px" }} /> Add Bet
                </Button>
              </Box>
            </Box>

            <Box height="50vh">
              {DataLineChart[0].data.length > 15 ? (
                <LineChart stateData={DataLineChart} Lot={true} />
              ) : (
                <LineChart stateData={DataLineChart} />
              )}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            padding="0 50px 0px 50px"
          >
            <ComponentBet title="Total Bets" data={bets.length} />
            <ComponentBet
              title="Profits"
              data={`${(totalgraph - propsData.capital).toFixed(2)}$`}
            />
            <ComponentBet
              title="ROI"
              data={`${(
                ((totalgraph - propsData.capital) * 100) /
                propsData.capital
              ).toFixed(2)}%`}
            />
          </Box>

          <Box m="15px">
            <Typography variant="h3">Historial of bets</Typography>
          </Box>

          {bets.reverse().map((i, index) => (
            <Box key={index}>
              <TableBets
                id={i.id}
                name={i.name}
                bookmarker={i.bookmarker}
                odd={i.odd}
                stake={i.amount}
                type={i.type}
                date={i.date}
                state={i.state}
                sport={i.sport}
              />
            </Box>
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
            <CurrencyExchangeIcon
              sx={{
                fontSize: "110px",
                alignContent: "center",
                color: colors.greenAccent[500],
              }}
            />
            <Typography variant="h3" fontWeight="bold">
              This is the bankroll {propsData.name}
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              What are you waiting for to add your first bet?
            </Typography>
            <Button
              sx={{ mt: "15px", backgroundColor: colors.greenAccent[600] }}
              variant="contained"
              component={Link}
              to={"/addbet"}
              state={{ id: propsData.id, name: propsData.name }}
            >
              <AddCircleOutlineIcon sx={{ mr: "5px" }} /> Add Bet
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Bets;
