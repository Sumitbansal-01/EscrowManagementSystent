import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
export const BuyerContractBottom = (props) => {
    const [showLoader, setShowLoader] = useState(false)

    if (props?.state === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: "column" }}>
                <Button variant='outline-primary button100' onClick={async e => {
                    e.preventDefault()
                    if (Number(localStorage.getItem('accountTokenBalance')) === 0) {
                        alert("Insufficient Balance! Please add the token from header")
                        return
                    }
                    setShowLoader(true)
                    try {
                        const tx = await props?.tokenContract.transfer(props.address, props?.contractAmount.toString())

                        tx.wait()
                            .then(async () => {
                                const tx2 = await props?.escrowContract.confirm_payment()
                                await tx2.wait()
                                props?.setState(await props?.escrowContract.state())
                                props.setCallUseEffect(e => !e)
                                setShowLoader(false)
                            }).catch(e => console.error(e))

                    } catch (err) {
                        console.error(err)
                    }
                }}>
                    {!showLoader ? "Confirm Payment" : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </Button>
                <span>This step takes 2 transaction</span>
            </div>
        )
    } else if (props?.state === 2) {
        return (
            <div style={{ display: 'flex', flexDirection: "column" }}>
                <Button variant='outline-primary button100' onClick={async e => {
                    e.preventDefault()
                    setShowLoader(true)
                    try {
                        const tx = await props?.escrowContract?.confirm_Delivery()
                        await tx.wait()
                        props?.setState(await props?.escrowContract.state())
                        setShowLoader(false)
                    } catch (err) {
                        console.error(err)
                    }
                }}>
                    {!showLoader ? "Confirm Delivery" : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </Button>
            </div>
        )
    }
}
