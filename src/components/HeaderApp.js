import React from 'react'
import logo from "../resources/images/mwlogo.png"
import {Container, Navbar, Dropdown, Button} from 'react-bootstrap';
import  { FaEllipsisH} from 'react-icons/fa';

const HeaderApp = () => {
    return (
        <div className= "milkynavapp" style = {{alignItems: "left"}}>
            <Navbar style = {{alignItems: "left"}}>
                <Container>
                    <Navbar.Brand id="navbrandapp" href="/"><img src = {logo} alt="Milkyway" style={{ alignSelf: 'left' }}/></Navbar.Brand>
                    <h2>APP</h2>
                    <a class="milkyapp-navlink">Swap</a> 
                    <a class="milkyapp-navlink">Farm</a> 
                    
                    <Button className= "milkyapp-navbtn">Connect Wallet</Button>
                    

                    <Dropdown className= "nav-language">
                        <Dropdown.Toggle variant="success" id="language-dropdown">
                            English
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item >English</Dropdown.Item>
                            <Dropdown.Item >Spanish</Dropdown.Item>
                            <Dropdown.Item >French</Dropdown.Item>
                            <Dropdown.Item >Afrikaans</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button className= "nav-settings" ><FaEllipsisH/></Button>
                    {/* <Button className= "milkyapp-navbtn"></Button> */}
                </Container>
                
            </Navbar>

        </div>
    )
}

export default HeaderApp
