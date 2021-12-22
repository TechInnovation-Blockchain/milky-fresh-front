import React from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import logo from "../resources/images/mwlogo.png"
import twitter from "../resources/images/twittersoc.png"
import telegram from "../resources/images/telegramsoc.png"
import msoc from "../resources/images/msoc.png"


const FooterApp = () => {
    return (
        <div style = {{padding: "80px"}}>
            <hr style = {{color: "white"}}/>
            <Container style = {{padding:"10px", textAlign : 'left'}}>
                <Row style={{width: "100%", margin:"0 auto"}}>

                    <Col>
                    <h5>Analytics</h5>

                    </Col>

                    <Col>
                    <h5>WSG Gaming</h5>

                    </Col>


                    <Col>

                    <div>
                        <p className="social-container">
                            <a
                            href="https://www.twitter.com"
                            className="twitter social"
                            >
                                <img src = {twitter} alt = "Twitter"/>
                            </a>
                            <a
                            href="https://www.facebook.com"
                            className="telegram social"
                            >
                                <img src = {telegram} alt = "Telegram"/>
                            </a>
                            <a
                            href="http://www.instagram.com"
                            className="m social"
                            >
                                <img src = {msoc} alt = "M?"/>
                            </a>
                        </p>
                    </div>

                    </Col>



                    <Col>
                    <h5>Discord</h5>

                    </Col>

                    <Col>
                    <h5>Built: 1.0.2.3.4.</h5>

                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default FooterApp
