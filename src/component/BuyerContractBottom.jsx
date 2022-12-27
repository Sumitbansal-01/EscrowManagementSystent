import React from 'react'
import {Button, Form } from 'react-bootstrap'
export const BuyerContractBottom = (props) => {
    if (props?.state === 0) {
        return (
            <>
                <Button variant='outline-primary button100' onClick={async e => {
                    e.preventDefault()
                    try {
                        const tx = await props?.tokenContract.transfer(props.address,props?.contractAmount.toString())
                       
                        tx.wait()
                            .then(async () => {
                                const tx2 = await props?.escrowContract.confirm_payment()
                                await tx2.wait()
                                props?.setState(await props?.escrowContract.state())
                                props.setCallUseEffect(e => !e)
                            }).catch(e => console.error(e))

                    } catch (err) {
                        console.error(err)
                    }
                }}>Confirm Payment</Button>
                <Form.Text>This step takes 2 transaction</Form.Text>
            </>)
    }else if (props?.state === 2) {
        return (
            <Button variant='outline-primary button100' onClick={async e => {
                e.preventDefault()
                try {
                    const tx = await props?.escrowContract?.confirm_Delivery()
                    await tx.wait()
                    props?.setState(await props?.escrowContract.state())
                } catch (err) {
                    console.error(err)
                }
            }}>Confirm Delivery</Button>
        )
    }
}
