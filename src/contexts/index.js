import { AuthProvider } from './auth.context';

export const RootProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
