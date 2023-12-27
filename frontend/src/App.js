import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./generalPages/pages/HomePage"
import IndividualActivity from "./activity/pages/IndividualActivity";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/:aid" element={<IndividualActivity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
