import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MdGeneratingTokens } from "react-icons/md";


export const Header = () => {
  return (
    <Navbar bg="dark" variant='dark' expand="lg">

      <Container fluid >
        <Navbar.Brand href="#">Escrow Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

          </Nav>
          <Form className="d-flex col-4">
            <NavDropdown title={<MdGeneratingTokens style={{color:'white', fontSize:'4vh'}}/>} id="navbarScrollingDropdown" >
              <NavDropdown.Item href="#action3">Add Token</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                WidthDraw Token
              </NavDropdown.Item>
            </NavDropdown>
            <Form.Control style={{backgroundColor:'white'}}
              type="number"
              className="me-2" readOnly
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
