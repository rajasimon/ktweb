import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"))

  const login = (userToken, userID, userName) => {
    setToken(userToken);
    setUserID(userID);
    setUserName(userName);
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('userID', userID);
    localStorage.setItem('userName', userName)
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('KTReport');
    localStorage.removeItem('AutoProctorReport');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userID, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };