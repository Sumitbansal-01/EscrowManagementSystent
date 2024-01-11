import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MdGeneratingTokens } from "react-icons/md";
import { Withdrawl } from './Withdrawl';
import { useState } from 'react';
import { Deposit } from './Deposit';


export const Header = (props) => {
  const [showWithdrawl, setShowWithdrawl] = useState(false)
  const [showDeposit, setShowDeposit] = useState(false)

  return (
    <Navbar bg="dark" variant='dark' sticky='top'>
      <Container fluid >
        {/* <Navbar.Brand href="#">Escrow Management System</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ color: "white" }}
          >
            EMS
          </Nav>
          {props?.tokenContract.address ?
            <>
              <span style={{color:"white"}}>{props?.address?.slice(0, 7) + "..." + props?.address?.slice(props?.address.length - 5)}</span>
              {showWithdrawl ? <Withdrawl show={showWithdrawl} handleClose={() => { setShowWithdrawl(false) }} tokenContract={props?.tokenContract} setCallUseEffect={props?.setCallUseEffect} /> : null}
              {showDeposit ? <Deposit show={showDeposit} handleClose={() => { setShowDeposit(false) }} tokenContract={props?.tokenContract} setCallUseEffect={props?.setCallUseEffect} /> : null}

              <Form className="d-flex col-4">
                <NavDropdown title={<MdGeneratingTokens style={{ color: 'white', fontSize: '4vh' }} />} id="navbarScrollingDropdown" >
                  <NavDropdown.Item onClick={(e) => { e.preventDefault(); setShowDeposit(true) }}>Add Token</NavDropdown.Item>
                  <NavDropdown.Item onClick={e => { e.preventDefault(); setShowWithdrawl(true) }}>
                    WidthDraw Token
                  </NavDropdown.Item>
                </NavDropdown>
                <Form.Control style={{ backgroundColor: 'white' }}
                  type="number"
                  className="me-2"
                  value={props?.balance}
                  readOnly
                />
              </Form>
            </>
            : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
