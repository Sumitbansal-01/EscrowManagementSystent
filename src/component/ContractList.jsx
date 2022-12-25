import React, {useState} from 'react'
import { Button, Accordion } from 'react-bootstrap'
import { PerAccordion } from './PerAccordion'
import { GenerateContract } from './GenerateContract'

export const ContractList = () => {
    const [showGenerateContract,setShowGenerateContract]=useState(false)
    return (
        <div >
            <div style={{height:'12vh'}}>
                <Button style={{ position: 'absolute', right: '3%', marginTop: '1%' }} onClick={e=>{
                    e.preventDefault()
                    setShowGenerateContract(true)
                }}>Generate Contract</Button>
                {showGenerateContract?<GenerateContract show={showGenerateContract} handleClose={()=>{setShowGenerateContract(false)}}/>:null}
            </div>
            <div className='container'>
                <Accordion >
                    {[1, 2, 3, 4]?.map((n, i) => <PerAccordion Address={n} index={i} />)}
                </Accordion>
            </div>
        </div >
    )
}
