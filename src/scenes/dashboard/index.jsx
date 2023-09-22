import { useEffect, useState, useContext } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StatBox";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { currentUser } = useContext(AuthContext);
  const [bankroll, setBankroll] = useState([]);
  const [bet, setBet] = useState([]);
  const [update, setUpdate] = useState();
  const mockTransactions = [];

  const Bardata = [];
  const BarDataNow = [];

  const Barkeys = [];

  const userId = currentUser?.id;

  // Solicitud al servidor

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/bet/all/${userId}`);
        setBet(res.data);
        if (theme.palette.mode === "dark") {
          setUpdate(theme.palette.mode);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId, theme.palette.mode]);

  let totalCapital = 0;
  let totalProfits = 0;

  // Llenado de datos

  bankroll.map((i, index) => {
    totalCapital = totalCapital + Number(i.capital);
    Barkeys.push(i.name);
    Bardata.push({
      bankroll: i.name,
      data: [],
    });

    bet.map((e) => {
      if (e.id_bankroll === i.id) {
        for (let n = 0; n < index + 1; n++) {
          if (Bardata[n].bankroll === i.name) {
            let totalBet = 0;
            if (e.state === "Won") {
              totalBet = e.amount * e.odd - e.amount;
              Bardata[n].data.push(totalBet);
            } else if (e.state === "Lost" || e.state === "Cashout") {
              totalBet = -e.amount;
              console.log(totalBet, "lost");
              Bardata[n].data.push(totalBet);
            }
          }
        }
      }
    });
  });

  // Transacciones recientes

  bet.reverse().map((i) => {
    mockTransactions.push({
      type: i.type,
      name: `${i.name.substring(0, 5)}...`,
      date: i.date,
      amount: i.amount.toFixed(2),
      state: i.state,
    });
    if (i.state === "Won") {
      totalProfits = totalProfits + i.amount * i.odd;
    } else if (i.state === "Lost") {
      totalProfits = totalProfits - i.amount;
    }
  });

  Bardata.map((i) => {
    const sum = i.data.reduce((last, first) => last + first, 0);

    BarDataNow.push({
      bankroll: i.bankroll,
      Gains: Math.abs(sum.toFixed(2)),
      color:
        Math.sign(sum) === 1 ? colors.greenAccent[500] : colors.redAccent[500],
    });
  });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* Download Button  */}

        <Box display="flex" flexDirection="column" alignItems="end">
          <Typography variant="h3">
            Welcome Back {currentUser?.username}
          </Typography>
          <Typography variant="h4" color={colors.greenAccent[500]}>
            {" "}
            I hope you have a great day betting!
          </Typography>
        </Box>

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={bet.length}
            subtitle="Total bets"
            icon={
              <AllInboxIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={bankroll.length}
            subtitle="Total Bankrolls"
            icon={
              <AccountBalanceWalletIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalProfits.toFixed(2)}$`}
            subtitle="Total Profits"
            firstValue={totalCapital}
            secondValue={totalProfits}
            icon={
              <PaidIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalCapital.toFixed(2)}$`}
            subtitle="Total capital invested"
            icon={
              <AccountBalanceIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="15px"
            mb="10px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${totalProfits.toFixed(2)}
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" mt="-20px">
            <Link>
              <ResponsiveBar
                data={BarDataNow}
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
                keys={["Gains"]}
                indexBy="bankroll"
                margin={{ top: 20, right: 30, bottom: 28, left: 30 }}
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
                  e.id +
                  ": " +
                  e.formattedValue +
                  " in country: " +
                  e.indexValue
                }
              />
            </Link>
          </Box>
        </Box>

        {/* TRANSACTIONS  */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Bets
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.name}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.type}
                </Typography>
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.name}
                </Typography>
              </Box>
              <Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>

                {transaction.state === "Lost" && (
                  <Box
                    p="5px 10px"
                    backgroundColor={colors.redAccent[500]}
                    borderRadius="4px"
                    textAlign="center"
                  >
                    {transaction.state}
                  </Box>
                )}
                {transaction.state === "Won" && (
                  <Box
                    p="5px 10px"
                    backgroundColor={colors.greenAccent[600]}
                    borderRadius="4px"
                    textAlign="center"
                  >
                    {transaction.state}
                  </Box>
                )}
                {transaction.state === "Pending" && (
                  <Box
                    p="5px 10px"
                    backgroundColor="#F4D35E"
                    borderRadius="4px"
                    textAlign="center"
                  >
                    {transaction.state}
                  </Box>
                )}
                {transaction.state === "Canceled" && (
                  <Box
                    p="5px 10px"
                    backgroundColor={colors.grey[100]}
                    borderRadius="4px"
                    textAlign="center"
                  >
                    {transaction.state}
                  </Box>
                )}
                {transaction.state === "Cashout" && (
                  <Box
                    p="5px 10px"
                    backgroundColor={colors.redAccent[400]}
                    borderRadius="4px"
                    textAlign="center"
                  >
                    {transaction.state}
                  </Box>
                )}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.amount}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Row 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h4" fontWeight="600">
            Total Capital recovered
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle
              size="130"
              firstValue={totalCapital}
              secondValue={totalProfits}
            />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              ${totalProfits.toFixed(2)} of income generated on invested capital
            </Typography>
            <Typography>includes all bankrolls and bets</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
