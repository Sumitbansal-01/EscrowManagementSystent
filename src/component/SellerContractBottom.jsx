import React from 'react'
import { Button } from 'react-bootstrap'
export const SellerContractBottom = (props) => {
    return (
        <>
            {props?.state === 1 ?
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
            : null}
            {props?.state > 0 && props?.state < 3 ?
            <Button variant='outline-primary button100 mt-3' onClick={async e => {
                e.preventDefault()
                try {
                    const tx = await props?.escrowContract.ReturnPayment()
                    await tx.wait()
                    props?.setState(await props?.escrowContract.state())
                } catch (err) {
                    console.error(err)
                }
            }}>Return Payment</Button>
            : null}
        </>
    )

}
