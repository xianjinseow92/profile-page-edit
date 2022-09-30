import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "styles/index";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

// Routes
import AppRoutes from "routes/AppRoutes";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
      <Alert stack={{ limit: 1 }} html position="top" effect="stackslide" />
    </ThemeProvider>
  );
}

export default App;
