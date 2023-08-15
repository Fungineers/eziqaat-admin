import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import AreaPage from "./pages/AreaPage";
import ChairpersonPage from "./pages/ChairpersonPage";
import DonorPage from "./pages/DonorPage";
import OfficeSecretaryPage from "./pages/OfficeSecretaryPage";
import NewAreaPage from "./pages/NewAreaPage";
import NewChairpersonPage from "./pages/NewChairpersonPage";
import NewOfficeSecretaryPage from "./pages/NewOfficeSecretaryPage";
import { useAuth } from "./contexts/auth.context";
import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import DonationPage from "./pages/DonationPage";

export default function Router() {
  const auth = useAuth();

  const authRoutes = useRoutes([
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [{ element: <Navigate to="/login" />, index: true }],
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ]);

  const generalSecretaryRoutes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "area", element: <AreaPage /> },
        { path: "area/create", element: <NewAreaPage /> },
        { path: "chairperson", element: <ChairpersonPage /> },
        { path: "chairperson/create", element: <NewChairpersonPage /> },
        { path: "office-secretary", element: <OfficeSecretaryPage /> },
        { path: "office-secretary/create", element: <NewOfficeSecretaryPage /> },
        { path: "donors", element: <DonorPage /> },
        { path: "donations", element: <DonationPage /> },
        { path: "settings", element: <UserPage /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" />,
    },
  ]);

  const officeSecretaryRoutes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "donors", element: <DonorPage /> },
        { path: "donations", element: <DonationPage /> },
        { path: "settings", element: <UserPage /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" />,
    },
  ]);

  if (auth.data.authenticating) {
    return (
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{ height: "100svh" }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (auth.data.signedIn) {
    switch (auth.data.user?.role) {
      case "GENERAL_SECRETARY":
        return generalSecretaryRoutes;
      case "OFFICE_SECRETARY":
        return officeSecretaryRoutes;
      default:
        return <Page404 />;
    }
  }

  return authRoutes;
}
