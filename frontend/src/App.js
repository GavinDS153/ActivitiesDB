import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./generalPages/pages/HomePage"
import IndividualActivity from "./activity/pages/IndividualActivity";
import AuthPage from "./user/pages/AuthPage";
import AboutPage from "./generalPages/pages/AboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route path="/:aid" element={<IndividualActivity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
