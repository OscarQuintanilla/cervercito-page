import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";

const LOGGED_IN = "LOGGED_IN";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem(LOGGED_IN) ?? false
  );

  const login = useCallback(function (user) {
    window.localStorage.setItem(LOGGED_IN, true);
    window.localStorage.setItem("USER_DATA", JSON.stringify(user));
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(LOGGED_IN);
    window.localStorage.removeItem("USER_DATA");
    console.log("logout");
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ login, logout, isAuthenticated }),
    [login, logout, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
