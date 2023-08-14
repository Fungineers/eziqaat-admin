import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import { RootProvider } from "./contexts";
import { ToastContainer } from "react-toastify";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <RootProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </RootProvider>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer />
    </HelmetProvider>
  );
}
