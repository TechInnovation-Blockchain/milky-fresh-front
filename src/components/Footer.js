import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from "../resources/images/mwlogo.png"
import twitter from "../resources/images/twittersoc.png"
import telegram from "../resources/images/telegramsoc.png"
import msoc from "../resources/images/msoc.png"

const Footer = () => {
    return (
        <div style = {{padding: "80px"}}>
            <hr style = {{color: "white"}}/>
            <Container style = {{padding:"10px", textAlign : 'left'}}>
                <Row>
                    <Col>
                    <img src = {logo} alt="MilkyWay"/>
                    <p  style = {{fontSize: "12px", marginTop : "15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    
                    <div>
                        <p className="social-container">
                            <a
                            href="https://www.twitter.com"
                            className="twitter social"
                            >
                                <img src = {twitter} alt = "Twitter"/>
                            </a>
                            <a
                            href="https://www.facebook.com/learnbuildteach/"
                            className="telegram social"
                            >
                                <img src = {telegram} alt = "Telegram"/>
                            </a>
                            <a
                            href="http://www.instagram.com/larnbuildteach"
                            className="m social"
                            >
                                <img src = {msoc} alt = "M?"/>
                            </a>
                        </p>
                        </div>

                    </Col>

                    <Col>
                    <h5>PRODUCTS</h5>
                    <ul class = "footer-list" style = {{fontSize: "12px"}}>
                        <li>MilkyWay.exchange AMIM</li>
                        <li>WSG gaming</li>
                        <li>Third stuff</li>
                        <li>API</li>
                    </ul>
                    </Col>

                    <Col>
                    <h5>SUPPORT</h5>
                    <ul class = "footer-list" style = {{fontSize: "12px"}}>
                        <li>Tutorials</li>
                        <li>Documentation</li>
                        <li>Discord</li>
                        <li>Forum</li>
                    </ul>
                    </Col>

                    <Col>
                    <h5>SUPPORT</h5>
                    <ul class = "footer-list" style = {{fontSize: "12px"}}>
                        <li>Protocol</li>
                        <li>Create a pair</li>
                        <li>Register for WSG Gaming</li>
                    </ul>
                    </Col>

                </Row>
            </Container>

        </div>
    )
}

export default Footer
