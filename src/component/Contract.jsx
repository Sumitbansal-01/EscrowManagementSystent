import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
// import { MdOutlineNotificationsNone } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Notification } from './Notification';

export const EscrowContract = () => {
    const [user, setUser] = useState('buyer')
    const [showNotifcation, setShowNotification] = useState(false)
    return (
        <div className='container' style={{ backgroundColor: 'white', boxShadow: '5px 5px 5px grey', width: '70%', height: '70%', position: 'absolute', top: '15%', left: '15%', padding: '2%' }}>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Link to='#' onClick={e=>{
                    e.preventDefault()
                    setShowNotification(true)
                }}>Track Contract</Link>
            </div>
            {showNotifcation?<Notification show={showNotifcation} handleClose={()=>{setShowNotification(false)}}/>:null}
            <Form className='container'>
                <Row>
                    <Col>
                        <Form.Group className="mb-3 " controlId="formBasicEmail" >
                            <Form.Label>Contract Address</Form.Label>
                            <Form.Control type="text" value={"0x65973fd42A2b4DFC7AaBe7Fef875d9f9a660f771"} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Contract Status</Form.Label>
                            <Form.Control type="text" value={"Completed"} readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3 " controlId="formBasicEmail" >
                            <Form.Label>Buyer Address</Form.Label>
                            <Form.Control type="text" value={"0x65973fd42A2b4DFC7AaBe7Fef875d9f9a660f771"} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Seller Address</Form.Label>
                            <Form.Control type="text" value={"0x65973fd42A2b4DFC7AaBe7Fef875d9f9a660f771"} readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Create By</Form.Label>
                            <Form.Control type="text" value={"0x65973fd42A2b4DFC7AaBe7Fef875d9f9a660f771"} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Contract Amount [EMT]</Form.Label>
                            <Form.Control type="number" value={2.5} readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                {user === 'buyer' ?
                    <>
                        <Row>
                            <Button variant='outline-primary'>Confirm Payment</Button>
                        </Row>
                        <br />
                        <Row>
                            <Button variant='outline-primary'>Confirm Delivery</Button>
                        </Row>
                    </> :
                    <>
                        <Row>
                            <Button variant='outline-primary'>Product Shipped</Button>
                        </Row>
                        <br />
                        <Row>
                            <Button variant='outline-primary'>Return Payment</Button>
                        </Row>
                    </>}
            </Form>
        </div>
    )
}
