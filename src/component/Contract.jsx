import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
// import { MdOutlineNotificationsNone } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { Notification } from './Notification';
import { Contract } from 'ethers';
const { abi } = require("../contracts/escrow.json")


export const EscrowContract = (props) => {
    const location = useLocation()
    const [escrowContract, setEscrowContract] = useState({})
    const [user, setUser] = useState('buyer')
    const [showNotifcation, setShowNotification] = useState(false)
    const [buyer, setBuyer] = useState('')
    const [seller, setSeller] = useState('')
    const [arbiter, setArbiter] = useState('')
    const [contractAmount, setContractAmount] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        // if (!location?.state?.address) {
        //     history.push('/')
        // }
        const contract = new Contract(location?.state?.address, abi, props?.signer)
        setEscrowContract(contract)
        async function callFn() {
            const buyer = await contract.buyer()
            const seller = await contract.seller()
            const contractStatus = await contract.state()
            setBuyer(buyer)
            setSeller(seller)
            setArbiter(await contract.arbiter())
            setContractAmount(await contract.contractAmount())
            switch (contractStatus) {
                case 0:
                    setStatus('Contract Generated')
                    break
                case 1:
                    setStatus('Payment Confirmed')
                    break
                case 2:
                    setStatus('Product Shipped')
                    break
                case 3:
                    setStatus('Product Delivered')
                    break
                default:
                    setStatus('Contract Cancel')
            }
            if (buyer === localStorage.getItem('address')) {
                setUser('buyer')
            } else if (seller === localStorage.getItem('address')) {
                setUser('seller')
            }
        }
        callFn()
    }, [props, location])
    return (
        <div className='container' style={{ backgroundColor: 'white', boxShadow: '5px 5px 5px grey', width: '70%', height: '70%', position: 'absolute', top: '15%', left: '15%', padding: '2%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to='#' onClick={e => {
                    e.preventDefault()
                    setShowNotification(true)
                }}>Track Contract</Link>
            </div>
            {showNotifcation ? <Notification show={showNotifcation} handleClose={() => { setShowNotification(false) }} /> : null}
            <Form className='container'>
                <Row>
                    <Col>
                        <Form.Group className="mb-3 " controlId="formBasicEmail" >
                            <Form.Label>Contract Address</Form.Label>
                            <Form.Control type="text" value={location?.state?.address} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Contract Status</Form.Label>
                            <Form.Control type="text" value={status} readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3 " controlId="formBasicEmail" >
                            <Form.Label>Buyer Address</Form.Label>
                            <Form.Control type="text" value={buyer} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Seller Address</Form.Label>
                            <Form.Control type="text" value={seller} readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Create By</Form.Label>
                            <Form.Control type="text" value={arbiter} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Contract Amount [EMT]</Form.Label>
                            <Form.Control type="number" value={contractAmount} readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                {user === 'buyer' ?
                    <>
                        <Row>
                            <Button variant='outline-primary' onClick={async e => {
                                e.preventDefault()
                                try {
                                    const tx = await props?.tokenContract.transfer(seller, Number(contractAmount) * (10 ** 18))
                                    await tx.wait()
                                    await escrowContract.confirm_payment()
                                } catch (err) {
                                    console.error(err)
                                }
                            }}>Confirm Payment</Button>
                        </Row>
                        <br />
                        <Row>
                            <Button variant='outline-primary' onClick={async e => {
                                e.preventDefault()
                                try {
                                    const tx = await props?.escrowContract?.confirm_Delivery()
                                    await tx.wait()
                                } catch (err) {
                                    console.error(err)
                                }
                            }}>Confirm Delivery</Button>
                        </Row>
                    </> :
                    <>
                        <Row>
                            <Button variant='outline-primary' onClick={async e => {
                                e.preventDefault()
                                try {
                                    const tx = await props?.escrowContract.confirm_shipped()
                                    await tx.wait()
                                } catch (err) {
                                    console.error(err)
                                }
                            }}>Product Shipped</Button>
                        </Row>
                        <br />
                        <Row>
                            <Button variant='outline-primary' onClick={async e => {
                                e.preventDefault()
                                try {
                                    const tx = await props?.escrowContract.ReturnPayment()
                                    await tx.wait()
                                } catch (err) {
                                    console.error(err)
                                }
                            }}>Return Payment</Button>
                        </Row>
                    </>}
            </Form>
        </div>
    )
}
