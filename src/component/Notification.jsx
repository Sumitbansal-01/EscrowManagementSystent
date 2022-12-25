import React from 'react'
import { Modal, Button, Form } from "react-bootstrap"
export const Notification = (props) => {

    return (
        <Modal show={props?.show} onHide={props?.handleClose} centered size='sm'>
            <Modal.Header >
                <Modal.Title>Contract Tracking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check type="checkbox" label="Contract Generated" checked={true} />
                    <Form.Check type="checkbox" label="Payment Confirm" />
                    <Form.Check type="checkbox" label="Product Shipped" />
                    <Form.Check type="checkbox" label="Product Delivered" />
                    <Form.Check type="checkbox" label="Contract Cancel" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props?.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
