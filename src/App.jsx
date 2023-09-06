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
import { useNavigate } from "react-router-dom";

//CssBaseLine reset the css to default, and ThemeProvider add theme to the css (Material UI).

function App() {
  axios.defaults.baseURL = `http://localhost:8000/api`;
  const [theme, colorMode] = useMode();

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
