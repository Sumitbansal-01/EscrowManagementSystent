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
// import { LoginPage } from './component/LoginPage';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [contract, setContract] = useState({})
  // const [contractAddress, setContractAddress] = useState('sumit')
  const initWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const web3Modal = new Web3Modal({
          cacheProvider: true
        })
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const { chainId } = await provider.getNetwork()
        const signer = provider.getSigner();
        const contract = new Contract('0x65973fd42A2b4DFC7AaBe7Fef875d9f9a660f771', abi, signer)
        resolve({ contract, signer, chainId })
      } catch (err) {
        reject(err)
      }
    })

  }
  useEffect(() => {
    initWeb3()
      .then(async ({ contract }) => {
        setContract(contract)
        console.log({ contract })
        // setContractAddress(await contract.tokenContractAddress())
      })
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div style={{ minHeight: '82vh' }}>
          <Switch >
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route exact path="/contractlist">
              <ContractList />
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
