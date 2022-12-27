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
                    <Form.Check type="checkbox" label="Contract Generated" checked={true} readOnly/>
                    <Form.Check type="checkbox" label="Payment Confirm" checked={props?.state>0?true:false} readOnly/>
                    <Form.Check type="checkbox" label="Product Shipped" checked={props?.state>1?true:false} readOnly/>
                    <Form.Check type="checkbox" label="Product Delivered" checked={props?.state>2?true:false} readOnly/>
                    {props?.state===4?<Form.Check type="checkbox" label="Contract Cancel" checked={true} readOnly/>:null}
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
