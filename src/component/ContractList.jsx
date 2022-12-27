import React, { useEffect, useState } from 'react'
import { Button, Accordion, Form } from 'react-bootstrap'
import { PerAccordion } from './PerAccordion'
import { GenerateContract } from './GenerateContract'
import { useHistory } from 'react-router-dom'

export const ContractList = (props) => {
    const [showGenerateContract, setShowGenerateContract] = useState(false)
    const [search, setSearch] = useState('')
    const [searchAddress, setSearchAddress] = useState([])
    const [addresses, setAddresses] = useState([])
    const [callUseEffect, setCallUseEffect] = useState(false)
    const history = useHistory()
    useEffect(() => {
        if (!props?.contract.address) {
            history.push('/')
        } else {
            props?.contract.getContracts(localStorage.getItem('address'))
                .then(e => {
                    setAddresses([...e].reverse())
                })
                .catch(e => console.error(e))
        }

    }, [history, props, callUseEffect])
    return (
        <div >
            <Form className="d-flex container mt-5 mb-3">
                <Form.Control
                    type="search"
                    placeholder="Search Contract Address"
                    className="me-2"
                    aria-label="Search"
                    value={search} onChange={e => setSearch(e.target.value)}
                />
                <Button variant="outline-primary" onClick={e => {
                    e.preventDefault()
                    setSearchAddress(addresses.filter(n => {
                        if (n.includes(search.trim())) {
                            return true
                        } else {
                            return false
                        }
                    }))
                }}>Search</Button>
            </Form>
            {showGenerateContract ? <GenerateContract show={showGenerateContract} handleClose={() => { setShowGenerateContract(false) }} setCallUseEffect={setCallUseEffect} contract={props?.contract} /> : null}
            <div className='container' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outline-primary' style={{ margin: '1%' }} onClick={e => {
                    e.preventDefault()
                    setShowGenerateContract(true)
                }}>Generate Contract</Button>
            </div>
            <div className='container'>
                {search !== '' && searchAddress.length === 0 ? <span>No Result Found</span> : null}
                <Accordion >
                    {(search === '' ? addresses : searchAddress)?.map((n, i) => <PerAccordion Address={n} index={i} signer={props?.signer} />)}
                </Accordion>
            </div>
        </div >
    )
}
