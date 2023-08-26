import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar"

//CssBaseLine reset the css to default, and ThemeProvider add theme to the css (Material UI).

function App() {

  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <main className="content">
          <Topbar />
        </main>
      </>
    </ThemeProvider>
  </ColorModeContext.Provider>
  )
}

export default App
