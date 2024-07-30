import React from "react";
import NavBar from "../components/NavBar";
import Activities from "../../activity/pages/Activities";
import WelcomeBanner from "../components/WelcomeBanner";
import ActivitiesSection from "../components/ActivitiesSection";

const HomePage = () => {
  return (
    <span>
      <NavBar />
      <WelcomeBanner />
      <ActivitiesSection />
    </span>
  );
};

export default HomePage;
