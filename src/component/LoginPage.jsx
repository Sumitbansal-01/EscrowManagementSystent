import React from 'react'
import { Form, Button } from 'react-bootstrap'
import image1 from "./sign-up.jpg"

export const LoginPage = () => {
  return (
    // <div className='container' style={{ border: '1px solid red',  }}>
      <Form style={{width: '35%',height:'50vh',  position:'absolute', top :'20%', left:'30%', boxShadow:'5px 5px 5px grey', borderRadius:'5%', backgroundColor:'white'}} >
        <center>
          <figure>
            <img src={image1} style={{ height: '30vh', width: '30cw' }} alt='login'></img>
          </figure>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:'80%', borderRadius:'100%'}}>
            <Form.Control type="text" placeholder="Enter Your Wallet Address" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </center>
      </Form>
    // </div>
  )
}
