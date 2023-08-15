import { useAuth } from "src/contexts/auth.context";

const useAccount = () => {
  const auth = useAuth();

  const account = {
    displayName: `${auth.data.user?.firstName} ${auth.data.user?.lastName}`,
    email: auth.data.user?.email || "N/A",
    photoURL: "/assets/images/avatars/user.png",
  };

  return account;
};

export default useAccount;
