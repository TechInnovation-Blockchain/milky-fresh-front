import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import wallets from "../resources/images/wallets-icon.png"


const Community = () => {
    return (
        <div class= "community-div">
            <h2>MilkyWay's evolving community</h2>
            <Row style = {{width : "80%"}}>
                <Col>
                <div class = "community-circ wallets-icon">
                    {/* <image src = "../resources/images/wallets-icon.png" alt="Wallet Icon" style={{width:"2000", height:"2000"}}/> */}
                    <h2 >20+</h2>
                    <p>Wallets Supported</p>
                </div>
                </Col>
                <Col>
                <div class = "community-circ chains-icon">
                    <h2 >14</h2>
                    <p>Chains Supported</p>
                </div>
                </Col>
                <Col>
                <div class = "community-circ community-icon">
                    <h2 >25k+</h2>
                    <p>Discord Members</p>
                </div>
                </Col>
                <Col>
                <div class = "community-circ milkyway-icon">
                    <h2 >150k+</h2>
                    <p>Milky Holders</p>
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default Community


