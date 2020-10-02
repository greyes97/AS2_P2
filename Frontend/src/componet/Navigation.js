import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import './navigation.css'


const Navigation = (props)=>{
    console.log(props.stateButton)
    return(
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" id="colorNav" variant="dark">
                {props.stateButton ? <Navbar.Brand href={"/DetailMaster/"+props.dataM.key}> Back </Navbar.Brand>: <Navbar.Brand href="#home">DetailMaster</Navbar.Brand>
            }
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href={"/Sales/"+props.dataM.key}>Sales</Nav.Link>
                <Nav.Link href="#">Pricing</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link>User</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    <strong>{props.dataM.userName}</strong>
                </Nav.Link>
                </Nav>
                <Nav.Link href="/">Salir</Nav.Link>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation;