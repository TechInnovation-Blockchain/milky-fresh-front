import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import logo from "../resources/images/mwlogo.png";
import twitter from "../resources/images/twitter.svg";
import telegram from "../resources/images/telegram.svg";
import msoc from "../resources/images/medium.svg";

const FooterApp = () => {
  return (
    <div className="footer-app" style={{ padding: "80px" }}>
      <hr style={{ color: "white" }} />
      <Row
        style={{
          width: "100%",
          margin: "0",
          justifyContent: "space-between",
        }}
      >
        <Col className="footerLink">
          <h5 style={{ textAlign: "left" }}>Analytics</h5>
        </Col>

        <Col className="footerLink">
          <h5>WSG Gaming</h5>
        </Col>

        <Col>
          <div>
            <p className="social-container">
              <a href="https://www.twitter.com" className="twitter social">
                <img src={twitter} alt="Twitter" />
              </a>
              <a href="https://www.facebook.com" className="telegram social">
                <img src={telegram} alt="Telegram" />
              </a>
              <a href="http://www.instagram.com" className="m social">
                <img src={msoc} alt="Medium" />
              </a>
            </p>
          </div>
        </Col>

        <Col className="footerLink">
          <h5>Discord</h5>
        </Col>

        <Col className="footerLink">
          <h5 style={{ textAlign: "right" }}>Built: 1.0.2.3.4.</h5>
        </Col>
      </Row>
    </div>
  );
};

export default FooterApp;
