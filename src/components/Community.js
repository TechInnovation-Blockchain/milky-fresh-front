import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import wallets from "../resources/images/wallets-icon.png";
import Partners from "./Partners";
import Footer from "./Footer";

const Community = () => {
  return (
    <div class="community-div">
      <br />
      <h2 className="galaxy-title">MilkyWay`s evolving community</h2>
      <Row style={{ width: "70%", margin: "0 auto", paddingTop: "50px" }}>
        <Col className="community-circ-container">
          <div className="community-circ wallets-icon">
            {/* <image src = "../resources/images/wallets-icon.png" alt="Wallet Icon" style={{width:"2000", height:"2000"}}/> */}
            <h2>20+</h2>
            <p>Wallets Supported</p>
          </div>
        </Col>
        <Col className="community-circ-container">
          <div className="community-circ chains-icon">
            <h2>14</h2>
            <p>Chains Supported</p>
          </div>
        </Col>
        <Col className="community-circ-container">
          <div className="community-circ community-icon">
            <h2>25k+</h2>
            <p>Discord Members</p>
          </div>
        </Col>
        <Col className="community-circ-container">
          <div className="community-circ milkyway-icon">
            <h2>150k+</h2>
            <p>Milky Holders</p>
          </div>
        </Col>
      </Row>

      <Partners />
      <Footer />
    </div>
  );
};

export default Community;
