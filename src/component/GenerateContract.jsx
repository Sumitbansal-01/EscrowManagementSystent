import React, { useState } from 'react'
import { Modal, Button, Form, Spinner } from "react-bootstrap"

export const GenerateContract = (props) => {
    const [sellerAddress, setSellerAddress] = useState('')
    const [buyeraddress, setBuyerAddress] = useState('')
    const [contractAmount, setContractAmount] = useState('')
    const [showLoader, setShowLoader] = useState(false)
    return (
        <Modal show={props?.show} onHide={props?.handleClose} centered >
            <Modal.Header closeButton>
                <Modal.Title>Generate Contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Buyer Address</Form.Label>
                        <Form.Control type="text" value={buyeraddress} onChange={e => setBuyerAddress(e.target.value)} placeholder="0x65973fd42A2b4DFC7AaBe7Fef875d9f9a660f771" />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Seller Address</Form.Label>
                        <Form.Control type="text" value={sellerAddress} onChange={e => setSellerAddress(e.target.value)} placeholder="0x65973fd42A2b4DFC7AaBe7Fef875d9f9a660f771" />
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Contact Amount [in Token]</Form.Label>
                        <Form.Control type="number" value={contractAmount} onChange={e => setContractAmount(e.target.value)} placeholder="0.0012" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={async e => {
                    try {
                        e.preventDefault()
                        setShowLoader(true)
                        const tx = await props.contract.generateContract(buyeraddress, sellerAddress, `${Number(contractAmount) * 10 ** 18}`)
                        await tx.wait()
                        setContractAmount('')
                        setBuyerAddress('')
                        setSellerAddress('')
                        props.setCallUseEffect(e => !e)
                        // setShowLoader(false)
                        props?.handleClose()
                    } catch (err) {
                        console.error(err)
                    }
                }}>
                    {!showLoader ? "Generate" : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
