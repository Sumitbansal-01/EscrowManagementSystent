import React from 'react'
import { Accordion, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const PerAccordion = (props) => {
    return (
        <Accordion.Item eventKey={props?.index} key={props?.index}>
            <Accordion.Header>{props?.Address}</Accordion.Header>
            <Accordion.Body style={{border:'1px solid grey', borderTop:'none'}}>
                <div className='mt-2 mb-3' style={{display:'flex', justifyContent:'flex-end'}}>
                    <Link >View Contract</Link>
                </div>
                <Form>
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
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    )
}
