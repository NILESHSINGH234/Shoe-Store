import { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers";
import { useNavigate } from "react-router-dom";
import { signupService, loginService } from "../services";

const initialState = {
  token: "",
  userInfo: null,
  isLoggedIn: false,
  error: "",
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("token") || "";
  const getUserFromLocalStorage =
    JSON.parse(localStorage.getItem("user")) ||null;
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (getTokenFromLocalStorage !== "" && getUserFromLocalStorage !== "") {
      dispatch({
        type: "SAVE_TOKEN",
        payload: getTokenFromLocalStorage,
      });
      dispatch({
        type: "SAVE_USER_INFO",
        payload: getUserFromLocalStorage,
      });
    }
  }, []);

  const signupHandler = async (firstName, lastName, email, password) => {
    try {
      const { status } = await signupService(
        firstName,
        lastName,
        email,
        password
      );
      if (status === 200 || status === 201) {
        navigate("/login");
      }
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.response });
    }
  };

  const loginHandler = async (email, password) => {
    try {
      const {
        data: { encodedToken, foundUser },
        status,
      } = await loginService(email, password);
      if (status === 200) {
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: foundUser }));
        dispatch({ type: "SAVE_TOKEN", payload: encodedToken });
        dispatch({
          type: "SAVE_USER_INFO",
          payload: foundUser,
        });
      
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.response });
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <AuthContext.Provider
      value={{ state, dispatch, signupHandler, loginHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };