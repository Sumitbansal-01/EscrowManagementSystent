import React from 'react'
import { Form, Button } from 'react-bootstrap'
import image1 from "./sign-up.jpg"
import { Contract } from "ethers"
import { useHistory } from 'react-router-dom'
const {abi}=require("../contracts/EscrowFundManagementToken.json")

export const LoginPage = (props) => {
  const history= useHistory()
  return (
      <Form style={{width: '35%',height:'50vh',  position:'absolute', top :'20%', left:'30%', boxShadow:'5px 5px 5px grey', borderRadius:'5%', backgroundColor:'white'}} >
        <center>
          <figure>
            <img src={image1} style={{ height: '30vh', width: '30cw' }} alt='login'></img>
          </figure>
          <Button variant="primary" type="submit" style={{width:'80%', margin:'1%'}} onClick={async e=>{
            e.preventDefault()
            const result=await props?.connect()
            localStorage.setItem('tokenContractAddress',await result.contract.tokenContractAddress())
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
  )
}
