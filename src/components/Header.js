import React from 'react'
import logo from "../resources/images/mwlogo.png"
import {Container, Navbar, Nav, Button} from 'react-bootstrap';

const Header = () => {
    return (
        <div class = "milkynav" style = {{alignItems: "left"}}>
            <Navbar style = {{alignItems: "left"}}>
                <Container>
                    <Navbar.Brand id="navbrand" href="/"><img src = {logo} alt="Milkyway" style={{ alignSelf: 'left' }}/></Navbar.Brand>
                    <a class="milky-navlink">Analytics</a>
                    <Button class = "milky-navbtn">Milky App</Button>
                </Container>
                
            </Navbar>

        </div>
    )
}

export default Header
