import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./generalPages/pages/HomePage";
import IndividualActivity from "./activity/pages/IndividualActivity";
import AuthPage from "./user/pages/AuthPage";
import AboutPage from "./generalPages/pages/AboutPage";
import ProfilePage from "./user/pages/ProfilePage";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, // True if there is a token, false otherwise
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route
            exact
            path="/auth/signup"
            element={<AuthPage type="signup" />}
          />
          <Route exact path="/auth/login" element={<AuthPage type="login" />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route path="/:aid" element={<IndividualActivity />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
