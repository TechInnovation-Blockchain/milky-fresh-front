import React from "react";
import { Col, Row, Container } from "react-bootstrap";

const Partners = () => {
  return (
    <div className="partners-div">
      <h2>Partners helping us travel faster through the galaxy</h2>
      <Row style={{ width: "70%", margin: "0 auto", paddingTop: "50px" }}>
        <Col>
          <div className="partners-circ"></div>
          <h5> Partner name 1 </h5>
        </Col>
        <Col>
          <div className="partners-circ"></div>
          <h5> Partner name 2 </h5>
        </Col>
        <Col>
          <div className="partners-circ"></div>
          <h5> Partner name 3 </h5>
        </Col>
        <Col>
          <div className="partners-circ"></div>
          <h5> Partner name 4 </h5>
        </Col>
        <Col>
          <div className="partners-circ"></div>
          <h5> Partner name 5 </h5>
        </Col>
        <Col>
          <div className="partners-circ"></div>
          <h5> Partner name 6 </h5>
        </Col>
      </Row>
    </div>
  );
};

export default Partners;
