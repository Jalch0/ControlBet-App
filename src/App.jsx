import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import SignIn from "./scenes/login";
import SignUp from "./scenes/register";
import Dashboard from "./scenes/dashboard";
import Bankroll from "./scenes/bankroll";
import AddBankroll from "./scenes/addbankroll";
import axios from "axios";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import Bets from "./scenes/bets";
import Addbet from "./scenes/addbet"
import EditSimpleBet from "./scenes/editbet/editsimplebet"
import EditCombinedBet from "./scenes/editbet/editcombinedbet"
import EditBankroll from "./scenes/editbankroll"


function App() {
  axios.defaults.baseURL = `YOUR_DATABASE_URL`;
  const [theme, colorMode] = useMode();

  const { currentUser } = useContext(AuthContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {currentUser ? (
            <>
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bankroll" element={<Bankroll />} />
                  <Route path="/addbankroll" element={<AddBankroll />} />
                  <Route path="/bets" element={<Bets />} />
                  <Route path="/addbet" element={<Addbet />} />
                  <Route path="/editsimplebet" element={<EditSimpleBet />} />
                  <Route path="/editcombinedbet" element={<EditCombinedBet />} />
                  <Route path="/editbankroll" element={<EditBankroll />} />
                </Routes>
              </main>
            </>
          ) : (
            <>
              <Routes>
                  <Route path="/" element={<SignIn/>} />
                  <Route path="/register" element={<SignUp />} />
              </Routes>
            </>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
