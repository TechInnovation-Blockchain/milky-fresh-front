import React from "react";
import FooterApp from "./FooterApp";
import HeaderApp from "./HeaderApp";
import { Row, Col, Button } from "react-bootstrap";
import PoolItem from "./PoolItem";

const Farms = () => {
  return (
    <div className="farm-page">
      <HeaderApp />

      <div className="farms-div">
        {/*
                <Row>
                    <Col xs = {2}>
                        <Button className = 'your-farm-btn'><p>Your Farm</p></Button>
                    </Col>
                    <Col xs  ={10}>

                    </Col>
                </Row>
                */}

        <Row className="dividers">
          <Col xs={2}>
            <hr />
          </Col>
          <Col xs={10} className="divider-right">
            <p>Farms</p>
            <hr />
          </Col>
        </Row>
        <PoolItem
          ticker={"MWT"}
          name={"MilkyWay Token"}
          apy={"--"}
          stake={"--"}
          tokenAddress={"0x7B19993a90f5e839066408Bca1341E016231d5A4"}
          pid={0}
        />
        <PoolItem
          ticker={"MWT-BNB"}
          name={"MWT-BNB"}
          apy={"--"}
          stake={"--"}
          tokenAddress={"0xaccb55780831c02f39e07ea59567b2de299b867e"}
          pid={1}
        />

        <Row>
          <Col xs={2}>
            <div clasName="farm-row"></div>

            {/*
            <Button className="selected-farm farm-btn">
              <p>Farm 1</p>
            </Button>
            <Button className="farm-btn">
              <p>Farm 2</p>
            </Button>
            <Button className="farm-btn">
              <p>Farm 3</p>
            </Button>
            <Button className="farm-btn">
              <p>Farm 4</p>
            </Button>
            */}
          </Col>
          <Col xs={10}></Col>
        </Row>
      </div>

      <FooterApp />
    </div>
  );
};

export default Farms;
