import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import SignIn from "./scenes/login";
import SignUp from "./scenes/register";
import Dashboard from "./scenes/dashboard";
import Bankroll from "./scenes/bankroll";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import AddBankroll from "./scenes/addbankroll";
// import Form from "./scenes/form"
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography"
import Calendar from "./scenes/calendar";
import axios from "axios";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import Bets from "./scenes/bets";
import Addbet from "./scenes/addbet"
import EditSimpleBet from "./scenes/editbet/editsimplebet"
import EditCombinedBet from "./scenes/editbet/editcombinedbet"
import EditBankroll from "./scenes/editbankroll"

//CssBaseLine reset the css to default, and ThemeProvider add theme to the css (Material UI).

function App() {
  axios.defaults.baseURL = `https://server-betstatistixs.vercel.app`;
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
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  {/* <Route path="/form" element={<Form/>} /> */}
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  {/* <Route path="/geography" element={<Geography/>} /> */}
                  <Route path="/calendar" element={<Calendar />} />
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
