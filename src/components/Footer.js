import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../resources/images/mwlogo.png";
import twitter from "../resources/images/twitter.svg";
import telegram from "../resources/images/telegram.svg";
import msoc from "../resources/images/medium.svg";

const Footer = () => {
  return (
    <div
      className="footerContainer"
      style={{ padding: "80px", paddingBottom: "20px" }}
    >
      <hr style={{ color: "white" }} />
      <Container style={{ padding: "10px", textAlign: "left" }}>
        <Row>
          <Col className="footerLogo">
            <img src={logo} alt="MilkyWay" />
            <p
              style={{
                fontSize: "14px",
                marginTop: "16px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>

            <div>
              <p className="social-container">
                <a href="https://www.twitter.com" className="twitter social">
                  <img src={twitter} alt="Twitter" />
                </a>
                <a href="https://www.facebook.com" className="telegram social">
                  <img src={telegram} alt="Telegram" />
                </a>
                <a href="http://www.instagram.com" className="m social">
                  <img src={msoc} alt="M?" />
                </a>
              </p>
            </div>
          </Col>

          <Col>
            <h5>PRODUCTS</h5>
            <ul className="footer-list" style={{ fontSize: "16px" }}>
              <li>MilkyWay.exchange AMIM</li>
              <li>WSG gaming</li>
              <li>Third stuff</li>
              <li>API</li>
            </ul>
          </Col>

          <Col>
            <h5>SUPPORT</h5>
            <ul className="footer-list" style={{ fontSize: "16px" }}>
              <li>Tutorials</li>
              <li>Documentation</li>
              <li>Discord</li>
              <li>Forum</li>
            </ul>
          </Col>

          <Col>
            <h5>SUPPORT</h5>
            <ul className="footer-list" style={{ fontSize: "16px" }}>
              <li>Protocol</li>
              <li>Create a pair</li>
              <li>Register for WSG Gaming</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
