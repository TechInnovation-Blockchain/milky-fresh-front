import React from 'react'
import styles from '../App.css'
import { Button, Dropdown, Form } from 'react-bootstrap'
import  { HiOutlineCog} from 'react-icons/hi';

const Trader = () => {
    return (
        <div className= "trader-div">
            <Form>

                <Button class="swap trade-button  selected-btn">Swap</Button>
                <Button class="trade-button" >Limit</Button>
                <Button class="trade-button">Liquidity</Button>
                <Button class="trade-button trade-settings" ><HiOutlineCog style={{fontSize : "25px"}}/></Button>

                <div className= "trade-from-div">
                    <h5>Swap from:</h5>                    
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="trade-from-dropdown">
                            Ethereum (default)
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item >Ethereum</Dropdown.Item>
                            <Dropdown.Item >Another</Dropdown.Item>
                            <Dropdown.Item >Another 2</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Group>
                        <Form.Text></Form.Text>

                    </Form.Group>
                    
                </div>
                <div className= "trade-to-div">
                    <h5>Swap to:</h5>      
                    <Dropdown>        
                        < Dropdown.Toggle variant="success" id="trade-to-dropdown">
                            Select a token
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item >Milkyway</Dropdown.Item>
                            <Dropdown.Item >Another 3</Dropdown.Item>
                            <Dropdown.Item >Another 4</Dropdown.Item>
                        </Dropdown.Menu>                   
                    </Dropdown>
                    <Form.Group>
                        <Form.Text></Form.Text>

                    </Form.Group>
                </div>

                <Button className= "trade-connect-btn">Connect Wallet</Button>
            </Form>

        </div>
    )
}

export default Trader
 