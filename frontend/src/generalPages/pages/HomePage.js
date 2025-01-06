import React from "react";
import NavBar from "../components/NavBar";
import Activities from "../../activity/pages/Activities";
import WelcomeBanner from "../components/WelcomeBanner";
import ActivitiesSection from "../components/ActivitiesSection";
import PagArea from "../../activity/components/PagArea";

const HomePage = () => {
  return (
    <span>
      <NavBar />
      <WelcomeBanner />
      <ActivitiesSection />
      <PagArea />
    </span>
  );
};

export default HomePage;
