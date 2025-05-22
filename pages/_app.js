// pages/_app.js
import "@/styles/globals.css";
import { ThemeProvider as AppThemeProvider, useTheme } from "@/context/ThemeContext";
import Header from "@/components/Header";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function AppContent({ Component, pageProps }) {
  const { darkMode } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </MuiThemeProvider>
  );
}

export default function App(props) {
  return (
    <AppThemeProvider>
      <AppContent {...props} />
    </AppThemeProvider>
  );
}
