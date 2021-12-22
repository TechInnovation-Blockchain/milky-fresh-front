import React from 'react'
import FooterApp from './FooterApp'
import HeaderApp from './HeaderApp'
import { Row, Col, Button } from 'react-bootstrap'

const Farms = () => {
    return (
        <div className='farm-page'>
            <HeaderApp/>

            <div className='farms-div'>
                <Row>
                    <Col xs = {2}>
                        <Button className = 'your-farm-btn'><p>Your Farm</p></Button>
                    </Col>
                    <Col xs  ={10}>
                        
                    </Col>
                </Row>
                    
                <Row className='dividers'>
                    <Col xs = {2}>
                        <hr/>
                    </Col>
                    <Col xs  ={10} className='divider-right'>
                        <p>Farms</p><hr/>
                    </Col>

                </Row>

                <Row>
                    <Col xs = {2}>
                        <Button className='selected-farm farm-btn'><p>Farm 1</p></Button>
                        <Button className='farm-btn'><p>Farm 2</p></Button>
                        <Button className='farm-btn'><p>Farm 3</p></Button>
                        <Button className='farm-btn'><p>Farm 4</p></Button>

                    </Col>
                    <Col xs  ={10}>
                        
                    </Col>

                </Row>
            </div>

            <FooterApp/>
        </div>
    )
}

export default Farms
