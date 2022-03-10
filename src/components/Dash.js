import Button from "@restart/ui/esm/Button";
import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import logo from "../resources/images/mwex.png";

const Dash = () => {
  return (
    <div className="dash-div">
      <Container
        className="dash-contain"
        style={{
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Col
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="MilkyWay Exchange"
            href="/"
            style={{ width: "100%", paddingTop: "130px" }}
          />
          <p
            style={{
              maxWidth: "95%",
              textAlign: "center",
              fontSize: "12px",
              paddingTop: "50px",
              paddingBottom: "50px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <a href="/swap" target="_self">
            <Button className="dash-btn dash-btn1">Enter App</Button>
          </a>
          <Button className="dash-btn dash-btn2">Learn more</Button>

          <Row style={{ width: "80%", margin: "0 auto", paddingTop: "50px" }}>
            <Col>
              <div className="dash-circ">
                <h2>$11.50</h2>
                <p>MilkyWay Price</p>
              </div>
            </Col>
            <Col>
              <div className="dash-circ">
                <h2>$4.50b</h2>
                <p>Total Liquidity</p>
              </div>
            </Col>
            <Col>
              <div className="dash-circ">
                <h2>$112.5b</h2>
                <p>Total Volume</p>
              </div>
            </Col>
            <Col>
              <div className="dash-circ">
                <h2>1.150</h2>
                <p>Total Pairs</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Dash;
