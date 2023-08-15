import { useAuth } from "src/contexts/auth.context";

const useNavConfig = () => {
  const auth = useAuth();

  switch (auth.data.user?.role) {
    case "GENERAL_SECRETARY":
      return [
        {
          title: "dashboard",
          path: "/dashboard/app",
        },
        {
          title: "Areas",
          path: "/dashboard/area",
        },
        {
          title: "Chairpersons",
          path: "/dashboard/chairperson",
        },
        {
          title: "Office Secretaries",
          path: "/dashboard/office-secretary",
        },
        {
          title: "Donors",
          path: "/dashboard/donors",
        },
        {
          title: "Donations",
          path: "/dashboard/donations",
        },
        {
          title: "Settings",
          path: "/dashboard/settings",
        },
      ];
    case "OFFICE_SECRETARY":
      return [
        {
          title: "dashboard",
          path: "/dashboard/app",
        },
        {
          title: "Donors",
          path: "/dashboard/donors",
        },
        {
          title: "Donations",
          path: "/dashboard/donations",
        },
        {
          title: "Settings",
          path: "/dashboard/settings",
        },
      ];
    default:
      return [];
  }
};

export default useNavConfig;
