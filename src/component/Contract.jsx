import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Alert } from 'react-bootstrap'
// import { MdOutlineNotificationsNone } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { Notification } from './Notification';
import { Contract } from 'ethers';
import { BuyerContractBottom } from './BuyerContractBottom';
import { SellerContractBottom } from './SellerContractBottom';
import { useHistory } from 'react-router-dom';

const { abi } = require("../contracts/escrow.json")


export const EscrowContract = (props) => {
    const history=useHistory()
    const location = useLocation()
    const [escrowContract, setEscrowContract] = useState({})
    const [user, setUser] = useState('buyer')
    const [showNotifcation, setShowNotification] = useState(false)
    const [buyer, setBuyer] = useState('')
    const [seller, setSeller] = useState('')
    const [arbiter, setArbiter] = useState('')
    const [contractAmount, setContractAmount] = useState('')
    const [status, setStatus] = useState('')
    const [state, setState] = useState(0)

    useEffect(() => {
        if (!props?.tokenContract.address) {
            history.push('/')
        } else {
            const contract = new Contract(location?.state?.address, abi, props?.signer)
            setEscrowContract(contract)
            async function callFn() {
                const buyer = await contract.buyer()
                const seller = await contract.seller()
                const contractStatus = await contract.state()
                setState(contractStatus)
                setBuyer(buyer)
                setSeller(seller)
                setArbiter(await contract.arbiter())
                setContractAmount(await contract.contractAmount())

                if (buyer === localStorage.getItem('address')) {
                    setUser('buyer')
                } else if (seller === localStorage.getItem('address')) {
                    setUser('seller')
                }
            }
            callFn()
        }
    }, [props, location, history])

    useEffect(() => {
        switch (state) {
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
    }, [state])
    return (
        <div className='container' style={{ backgroundColor: 'white', boxShadow: '5px 5px 5px grey', width: '70%', height: '65%', position: 'absolute', top: '15%', left: '15%', padding: '2%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to='#' onClick={e => {
                    e.preventDefault()
                    setShowNotification(true)
                }}>Track Contract</Link>
            </div>
            {showNotifcation ? <Notification show={showNotifcation} handleClose={() => { setShowNotification(false) }} state={state} /> : null}
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
                {state === 3 ? <Alert variant='success'>Contract Completed</Alert> : null}
                {state === 4 ? <Alert variant='danger'>Contract Cancelled and Refund Completed</Alert> : null}
                {user === 'buyer' ?
                    <BuyerContractBottom state={state} tokenContract={props?.tokenContract} escrowContract={escrowContract} contractAmount={contractAmount} address={props?.address} setState={setState} setCallUseEffect={props?.setCallUseEffect} />
                    : <SellerContractBottom state={state} escrowContract={escrowContract} setState={setState} setCallUseEffect={props?.setCallUseEffect} />
                }
            </Form>
        </div >
    )
}
