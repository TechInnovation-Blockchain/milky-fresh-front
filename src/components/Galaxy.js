import React from 'react'
import {Button} from 'react-bootstrap'

const Galaxy = () => {
    return (
        <div class = "galaxy-div">

            <div class="dimmer">
            </div>

            <div class = "galaxy-back ">
            </div>

            <div class = "galaxy">
                <h2>MilkyWay Exchange Properties</h2>
    
                <div class = "galaxy-circle" style ={{marginLeft: "1095px", marginTop:"60px"}}>
                    <h5> Title</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    <Button class = "dash-btn clickable">Enter</Button>
                </div>
                <div class = "galaxy-circle" style ={{marginLeft: "608px", marginTop:"-130px"}}>
                    <h5> Title</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    <Button class = "dash-btn clickable">Enter</Button>
                </div>
                <div class = "galaxy-circle" style ={{marginLeft: "1210px", marginTop:"39px"}}>
                    <h5> Title</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    <Button class = "dash-btn clickable">Enter</Button>
                </div>
                <div class = "galaxy-circle" style ={{marginLeft: "508px", marginTop:"-90px"}}>
                    <h5> Title</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    <Button class = "dash-btn clickable">Enter</Button>
                </div>
                <div class = "galaxy-circle" style ={{marginLeft: "898px", marginTop:"-70px"}}>
                    <h5> Title</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    <Button class = "dash-btn clickable">Enter</Button>
                </div>
                
            </div>
            


        </div>
    )
}

export default Galaxy
