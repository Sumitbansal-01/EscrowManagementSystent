import React, { useState } from 'react'
import { Modal, Button, Form, Spinner } from "react-bootstrap"

export const Deposit = (props) => {
    const [amount, setAmount] = useState(0)
    const [showLoader, setShowLoader] = useState(false)
    return (
        <Modal show={props?.show} onHide={props?.handleClose} centered size='sm'>
            <Modal.Header closeButton>
                <Modal.Title>Add Token</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Token</Form.Label>
                        <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                        <Form.Text className="text-muted">
                            Transaction will not revert back
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={async e => {
                    e.preventDefault()
                    if (amount <= 0) {
                        alert('Value cannot be zero or negative')
                        
                    } else {
                        try {
                            setShowLoader(true)
                            const tx = await props.tokenContract.deposit(localStorage.getItem('address'), `${Number(amount) * (10 ** 18)}`, { value: `${Number(amount) * (10 ** 18)}` })
                            await tx.wait()
                            setAmount(0)
                            props.setCallUseEffect(e => !e)
                        } catch (err) {
                            console.log(err)
                        }finally{
                            props?.handleClose()
                        }
                    }
                }}>
                    {!showLoader ? "Add" : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
