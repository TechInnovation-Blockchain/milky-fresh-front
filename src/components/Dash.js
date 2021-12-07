import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import logo from "../resources/images/mwex.png"

const Dash = () => {
    return (
        <Container style = {{width : "100%", justifyContent : "center", textAlign : "center", alignItems : "center"}}>
            <Col style = {{justifyContent : "center", textAlign : "center", alignItems : "center"}}>

            <img src = {logo} alt = "MilkyWay Exchange" href = "#home" style = {{width : "605px"}}/>
            <p style = {{width : "690px", textAlign:"center", fontSize : "12px"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <Button class = "dash-btn button-grad">Enter App</Button>
            <Button class = "dash-btn">Learn more</Button>

            <Row style = {{width : "80%"}}>
                <Col>
                <div class = "dash-circ">
                    <h2>$11.50</h2>
                    <p>MilkyWay Price</p>
                </div>
                </Col>
                <Col>
                <div class = "dash-circ">
                    <h2>$4.50b</h2>
                    <p>Total Liquidity</p>
                </div>
                </Col>
                <Col>
                <div class = "dash-circ">
                    <h2>$112.5b</h2>
                    <p>Total Volume</p>
                </div>
                </Col>
                <Col>
                <div class = "dash-circ">
                    <h2>1.150</h2>
                    <p>Total Pairs</p>
                </div>
                </Col>
            </Row>

            </Col>
        </Container>
    )
}

export default Dash
