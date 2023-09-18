import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { CgFacebook } from "react-icons/cg";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitFacebook = () => {
    window.location = "https://www.facebook.com/profile.php?id=100088681123650";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dwcrcaa7u/image/upload/v1690140934/BZZWorld%20Shop/ensemble_bzz_bx4qga.jpg"
              alt="Founder"
            />
            <Typography>BZZWORLD: Academy A21</Typography>
            <Button onClick={visitFacebook} color="primary">
              Visit Facebook
            </Button>
            
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/profile.php?id=100088681123650"
              target="blank"
            >
              <CgFacebook className="youtubeSvgIcon" />
            </a>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
