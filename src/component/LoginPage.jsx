import React from 'react'
import { Form, Button } from 'react-bootstrap'
import image1 from "./sign-up.jpg"
import { Contract } from "ethers"
import { useHistory } from 'react-router-dom'
const {abi}=require("../contracts/EscrowFundManagementToken.json")

export const LoginPage = (props) => {
  const history= useHistory()
  return (
    // <div className='container' style={{ border: '1px solid red',  }}>
      <Form style={{width: '35%',height:'50vh',  position:'absolute', top :'20%', left:'30%', boxShadow:'5px 5px 5px grey', borderRadius:'5%', backgroundColor:'white'}} >
        <center>
          <figure>
            <img src={image1} style={{ height: '30vh', width: '30cw' }} alt='login'></img>
          </figure>
          {/* <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:'80%', borderRadius:'100%'}}>
            <Form.Control type="text" placeholder="Enter Your Wallet Address" />
          </Form.Group> */}
          <Button variant="primary" type="submit" style={{width:'80%', margin:'1%'}} onClick={async e=>{
            e.preventDefault()
            const result=await props?.connect()
            // console.log({result})
            localStorage.setItem('tokenContractAddress',await result.contract.tokenContractAddress())
            props.setTokenContractAddress(await result.contract.tokenContractAddress())
            // localStorage.setItem('tokenContract',JSON.stringify(new Contract(await result.contract.tokenContractAddress(),abi,result.signer)))
            const tokenContract=new Contract(await result.contract.tokenContractAddress(),abi,result.signer)
            props.setTokenContract(tokenContract)
            localStorage.setItem('accountTokenBalance', await tokenContract?.balanceOf(result?.address))
            history.push('/contractlist')
          }}>
            Connect Wallet
          </Button>
          <br></br>
          <span>Connect your Metamask Wallet</span>
        </center>
      </Form>
    // </div>
  )
}
