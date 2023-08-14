import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { RootProvider } from './contexts';

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
    </HelmetProvider>
  );
}
