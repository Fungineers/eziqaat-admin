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

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "area", element: <AreaPage /> },
        { path: "chairperson", element: <ChairpersonPage /> },
        { path: "office-secretary", element: <OfficeSecretaryPage /> },
        { path: "donors", element: <DonorPage /> },
        { path: "donations", element: <UserPage /> },
        { path: "settings", element: <UserPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
