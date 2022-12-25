import React, { useState } from 'react'
import { Button, Accordion, Form } from 'react-bootstrap'
import { PerAccordion } from './PerAccordion'
import { GenerateContract } from './GenerateContract'

export const ContractList = () => {
    const [showGenerateContract, setShowGenerateContract] = useState(false)
    const [search, setSearch] = useState('')
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
                    // setSearchColor(color.filter(n => {
                    //     if (n.includes(search.trim())) {
                    //         return true
                    //     } else {
                    //         return false
                    //     }
                    // }))
                }}>Search</Button>
            </Form>
            {showGenerateContract ? <GenerateContract show={showGenerateContract} handleClose={() => { setShowGenerateContract(false) }} /> : null}
            <div className='container' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outline-primary' style={{ margin: '1%' }} onClick={e => {
                    e.preventDefault()
                    setShowGenerateContract(true)
                }}>Generate Contract</Button>
            </div>
            <div className='container'>
                <Accordion >
                    {[1, 2, 3, 4]?.map((n, i) => <PerAccordion Address={n} index={i} />)}
                </Accordion>
            </div>
        </div >
    )
}
