import React from 'react'
import logo from "../resources/images/mwlogo.png"
import {Container, Navbar, Nav, Button} from 'react-bootstrap';

const Header = () => {
    return (
        <div class = "milkynav" style = {{alignItems: "left"}}>
            <Navbar style = {{alignItems: "left"}}>
                <Container>
                    <Navbar.Brand href="#home"><img src = {logo} alt="Milkyway" style={{ alignSelf: 'left' }}/></Navbar.Brand>
                    <Nav.Link>Analytics</Nav.Link>
                    <Button class = "dash-btn button-grad clickable">Milky App</Button>
                </Container>
                
            </Navbar>

        </div>
    )
}

export default Header
