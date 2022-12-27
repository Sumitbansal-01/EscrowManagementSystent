import React, { useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap"

export const Withdrawl = (props) => {
    const [amount, setAmount] = useState(0)
    return (
        <Modal show={props?.show} onHide={props?.handleClose} centered size='sm'>
            <Modal.Header closeButton>
                <Modal.Title> WidthDraw Token</Modal.Title>
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
                        const tx = await props.tokenContract.withdrawal(`${Number(amount) * (10 ** 18)}`)
                        console.log({ tx })
                        await tx.wait()
                        // console.log('after wait')
                        setAmount(0)
                        props.setCallUseEffect(e => !e)
                        // console.log('withdrawl complete')
                    }
                }}>
                    Withdrawl
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
