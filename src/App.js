import React, { useState, useEffect } from 'react';
import { Header } from './component/Header'
import { Footer } from './component/Footer';
import { LoginPage } from './component/LoginPage';
import { ContractList } from './component/ContractList';
import { EscrowContract } from './component/Contract'
import NotFound from './component/NotFound';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Web3Modal from "web3modal"
import { ethers, Contract } from "ethers"
const { abi } = require("./contracts/EscrowFundManagement.json")


function App() {

  const [contract, setContract] = useState({})
  const [address, setAddress] = useState('')
  const [tokenContract, setTokenContract] = useState({})
  const [signer, setSigner] = useState({})
  const [balance, setBalance] = useState(Number(localStorage.getItem('accountTokenBalance')) / 10 ** 18)
  const [callUseEffect, setCallUseEffect] = useState(false)
  const initWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const web3Modal = new Web3Modal()
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const { chainId } = await provider.getNetwork()

        // Check network and prompt user to switch
        console.log({ chainId })
        if (chainId !== 5) {
          alert("Please use Goerli test network")
          throw new Error("Please use Goerli test network")
        }

        // Continue with your DApp logic

        const signer = provider.getSigner();
        const address = await signer.getAddress()
        localStorage.setItem('address', address)
        setAddress(address)
        const contract = new Contract('0x6CB986118c646c0D51303b82459f8Ae1086b1De0', abi, signer)
        setContract(contract)
        setSigner(signer)
        resolve({ signer, chainId, address, contract })
      } catch (err) {
        reject(err)
      }
    })

  }
  useEffect(() => {
    if (tokenContract.balanceOf) {
      tokenContract.balanceOf(address)
        .then(e => {
          setBalance(Number(e.toString()) / 10 ** 18)
          localStorage.setItem('accountTokenBalance', e.toString())
        }).catch(e => console.error(e))
    }
  }, [callUseEffect, tokenContract, address])

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: "100vh" }}>
      <BrowserRouter>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header tokenContract={tokenContract} address={address} balance={balance} setCallUseEffect={setCallUseEffect} />
          <Switch >
            <Route exact path="/">
              <LoginPage connect={initWeb3} setTokenContract={setTokenContract} />
            </Route>
            <Route exact path="/contractlist">
              <ContractList contract={contract} signer={signer} />
            </Route>
            <Route exact path="/contract">
              <EscrowContract signer={signer} tokenContract={tokenContract} setCallUseEffect={setCallUseEffect} />
            </Route>
            <NotFound />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
