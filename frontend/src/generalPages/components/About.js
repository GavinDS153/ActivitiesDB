import React from "react";
import "./About.css";

const About = () => {
  return (
    <React.Fragment>
      <div className="about-container">
        <h1>About ActivitiesDB</h1>
        <h3>
          ActivitiesDB is a website to help high school students find
          educational oppurtunities. You can browse our large database of
          activities and save them to your account. To help in finding the best
          activities for you, use our search and sort functionalities to filter
          activities.
        </h3>
        <h3>
          Gavin Sweeney is the founder of ActivitiesDB. During his junior year
          of high school, he came across a YouTube video about the day in the
          life of a student in a high school study abroad program called the
          National Security Language Initiative for Youth (NSLI-Y). The video
          followed the student and his life living with a host family and
          getting to experience South Korea first-hand. The program seemed like
          such a great oppurtunity, and so Gavin decided to apply and eventually
          got accepted. The program was a truly transformative experience. He
          realized that if he had not stumbled upon a video about the program,
          he would have never found out about it. This is what sparked the idea
          for ActivitiesDB, a website to help high school students find
          similarly enriching programs and activities to encourage them to grow
          both academically and as a person.
        </h3>
      </div>
    </React.Fragment>
  );
};

export default About;
