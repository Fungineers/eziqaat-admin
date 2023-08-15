import { useEffect, useState } from "react";
import { useContext } from "react";
import getTokenFromResponse from "../utils/getTokenFromResponse";
import { createContext } from "react";
import { useApi } from "src/api";
import { toast } from "react-toastify";

const signedOut = () => ({
  signedIn: false,
  authenticating: false,
  signingIn: false,
  user: null,
  error: null,
});

const authenticating = () => ({
  signedIn: false,
  authenticating: true,
  signingIn: false,
  user: null,
  error: null,
});

const signingIn = () => ({
  signedIn: false,
  authenticating: false,
  signingIn: true,
  user: null,
  error: null,
});

const signedIn = (user) => ({
  signedIn: true,
  authenticating: false,
  signingIn: false,
  user,
  error: null,
});

const signinFailed = (error) => ({
  signedIn: false,
  authenticating: false,
  signingIn: false,
  user: null,
  error,
});

const updateUser = (oldUser, updates) => ({
  signedIn: true,
  authenticating: false,
  signingIn: false,
  user: {
    ...oldUser,
    ...updates,
  },
  error: null,
});

const initialData = authenticating();

const AuthContext = createContext({
  data: initialData,
  signin: ({ credential, password }) => {},
  signout: async () => {},
  update: (updates) => {},
});

export const AuthProvider = ({ children }) => {
  const api = useApi();

  const [auth, setAuth] = useState(initialData);

  const authenticate = () => {
    setAuth(authenticating());
    api
      .me()
      .then(async (res) => {
        const { user } = res.data;
        setAuth(signedIn(user));
      })
      .catch((err) => {
        console.log(err);
        setAuth(signedOut());
      });
  };

  // eslint-disable-next-line
  useEffect(authenticate, []);

  const signin = ({ credential, password }) => {
    setAuth(signingIn());
    api
      .login({ credential, password })
      .then(async (res) => {
        const token = getTokenFromResponse(res);
        localStorage.setItem("token", token);
        toast("Successfully signed in", { type: "success" });
        authenticate();
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        toast(message, { type: "error" });
        setAuth(signinFailed(message));
      });
  };

  const signout = async () => {
    setAuth(signedOut());
    localStorage.removeItem("token");
  };

  const update = (updates) => {
    setAuth(updateUser(auth.user, updates));
  };

  console.log("AUTH STATE", auth);

  return (
    <AuthContext.Provider
      value={{
        data: auth,
        signin,
        signout,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
