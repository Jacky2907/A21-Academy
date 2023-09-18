import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <Button>Contact: peneblaise.2016@gmail.com</Button>
      </a>
      <p><a className="mailBtn" href="tel:+237676850200">Number: +237 6 76 85 02 00</a></p>
    </div>
  );
};

export default Contact;
