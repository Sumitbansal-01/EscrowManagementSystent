import React from 'react'
import { Button } from 'react-bootstrap'
export const SellerContractBottom = (props) => {
    if (props?.state===1){
        console.log('sumit')
        return (
            <Button variant='outline-primary button100' onClick={async e => {
                e.preventDefault()
                try {
                    const tx = await props?.escrowContract.confirm_shipped()
                    await tx.wait()
                    props?.setState(await props?.escrowContract.state())
                } catch (err) {
                    console.error(err)
                }
            }}>Product Shipped</Button>
        )
    }else if (props?.state>1 && props?.state<3){
        return(
        <Button variant='outline-primary button100' onClick={async e => {
            e.preventDefault()
            try {
                const tx = await props?.escrowContract.ReturnPayment()
                await tx.wait()
                props?.setState(await props?.escrowContract.state())
            } catch (err) {
                console.error(err)
            }
        }}>Return Payment</Button>
        )
    }
    
}
