import React, { useEffect, useState } from 'react'
import { Accordion, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Contract } from 'ethers'
const { abi } = require("../contracts/escrow.json")

export const PerAccordion = (props) => {
    const [buyer, setBuyer] = useState('')
    const [seller, setSeller] = useState('')
    const [arbiter, setArbiter] = useState('')
    const [contractAmount, setContractAmount] = useState('')
    const [status, setStatus] = useState('')
    useEffect(() => {
        const contract = new Contract(props?.Address, abi, props?.signer)
        async function callFn() {
            setBuyer(await contract.buyer())
            setSeller(await contract.seller())
            setArbiter(await contract.arbiter())
            setContractAmount((parseFloat(await contract.contractAmount())/10**18).toString())
            switch (await contract.state()) {
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
        }
        callFn()
    }, [props])
    return (
        <Accordion.Item eventKey={props.index} key='{props.Address}'>
            <Accordion.Header>{props?.Address}</Accordion.Header>
            <Accordion.Body style={{ border: '1px solid grey', borderTop: 'none' }}>
                <div className='mt-2 mb-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={{ pathname: '/contract', state: { address: props?.Address } }}>View Contract</Link>
                </div>
                <Form>
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
                                <Form.Label>Contract Amount [in Token]</Form.Label>
                                <Form.Control type="number" value={contractAmount} readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Contract Status</Form.Label>
                            <Form.Control type="text" value={status} readOnly />
                        </Form.Group>
                    </Col>

                </Form>
            </Accordion.Body>
        </Accordion.Item>
    )
}
