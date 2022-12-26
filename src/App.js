import React, { useEffect, useState } from 'react';
import { Header } from './component/Header'
import { Footer } from './component/Footer';
import { LoginPage } from './component/LoginPage';
import { ContractList } from './component/ContractList';
import { EscrowContract } from './component/Contract'
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Web3Modal from "web3modal"
import { ethers, Contract } from "ethers"
const { abi } = require("./contracts/EscrowFundManagement.json")
const tokenContractData=require("./contracts/EscrowFundManagementToken.json")
// import { LoginPage } from './component/LoginPage';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [contract, setContract] = useState({})
  const [address, setAddress] = useState('')
  const [tokenContractAddress,setTokenContractAddress]=useState('')
  const [tokenContract,setTokenContract]=useState({})
  const initWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const web3Modal = new Web3Modal()
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const { chainId } = await provider.getNetwork()
        const signer = provider.getSigner();
        const address=await signer.getAddress()
        localStorage.setItem('address',address)
        // localStorage.setItem('tokenContractAddress',tokenContractAddress)
        setAddress(address)
        console.log({signer})
        const contract=new Contract('0x678194d5EBe9ff3B60474cA84E7Bef5bBf5F5F4b', abi, signer)
        setContract(contract)
        resolve({ signer, chainId , address, contract})
      } catch (err) {
        reject(err)
      }
    })

  }
  // useEffect(() => {
  //   initWeb3()
  //     .then(async ({ contract, signer }) => {
  //       setContract(contract)
  //       console.log({ signer})
  //       setTokenContractAddress(await contract.tokenContractAddress())
  //       setTokenContract(new Contract(await contract.tokenContractAddress(),tokenContractData.abi,signer))
  //     })
  // }, [])

  return (
    <div className="App">
      {/* {console.log({tokenContract,tokenContractAddress})} */}
      <BrowserRouter>
        <Header tokenContract={tokenContract} address={address}/>
        <div style={{ minHeight: '82vh' }}>
          <Switch >
            <Route exact path="/">
              <LoginPage connect={initWeb3} setTokenContract={setTokenContract} setTokenContractAddress={setTokenContractAddress}/>
            </Route>
            <Route exact path="/contractlist">
              <ContractList contract={contract}/>
            </Route>
            <Route exact path="/contract">
              <EscrowContract />
            </Route>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
