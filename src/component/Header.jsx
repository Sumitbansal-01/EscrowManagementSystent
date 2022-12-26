import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MdGeneratingTokens } from "react-icons/md";
import { Withdrawl } from './Withdrawl';
import { useEffect, useState } from 'react';
import { Deposit } from './Deposit';
import { useHistory } from 'react-router-dom';


export const Header = (props) => {
  const history=useHistory()
  const [showWithdrawl, setShowWithdrawl] = useState(false)
  const [showDeposit, setShowDeposit] = useState(false)
  const [balance,setBalance]=useState(Number(localStorage.getItem('accountTokenBalance'))/10**18)
  const [callUseEffect, setCallUseEffect]=useState(false)
  useEffect(()=>{
    console.log('in useeffect')
    if (!props?.tokenContract.address){
      history.push('/')
    }else{
      props?.tokenContract?.balanceOf(localStorage.getItem('address'))
      .then(e=>{
        console.log(e.toString())
        setBalance(Number(e.toString())/10**18)
        localStorage.setItem('accountTokenBalance', e.toString())
      }).catch(e=>console.error(e))
    }
  },[props, history, callUseEffect])
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
          {props?.tokenContract.address ?
            <>
              {showWithdrawl ? <Withdrawl show={showWithdrawl} handleClose={() => { setShowWithdrawl(false) }} tokenContract={props?.tokenContract} setCallUseEffect={setCallUseEffect}/> : null}
              {showDeposit ? <Deposit show={showDeposit} handleClose={() => { setShowDeposit(false) }} tokenContract={props?.tokenContract} setCallUseEffect={setCallUseEffect}/> : null}
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
                  value={balance}
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
