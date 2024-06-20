import React from "react";
import NavBar from "../components/NavBar";
import Activities from "../../activity/pages/Activities";
import WelcomeBanner from "../components/WelcomeBanner";

const HomePage = () => {
  return (
    <span>
      <NavBar />
      <WelcomeBanner />
      <Activities />
    </span>
  );
};

export default HomePage;
