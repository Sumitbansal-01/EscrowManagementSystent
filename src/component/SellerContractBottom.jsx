import {useState} from 'react'
import { Button, Spinner } from 'react-bootstrap'
export const SellerContractBottom = (props) => {
    const [showLoader, setShowLoader] = useState(false)
    const [showReturnLoader, setShowReturnLoader] = useState(false)

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            {props?.state === 1 ?
                <Button variant='outline-primary button100' onClick={async e => {
                    e.preventDefault()
                    setShowLoader(true)
                    try {
                        const tx = await props?.escrowContract.confirm_shipped()
                        await tx.wait()
                        props?.setState(await props?.escrowContract.state())
                        setShowLoader(false)
                    } catch (err) {
                        console.error(err)
                    }
                }}>
                     {!showLoader ? "Product Shipped" : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                    </Button>
                : null}
            {!showLoader && props?.state > 0 && props?.state < 2 ?
                <Button variant='outline-primary button100 mt-3' onClick={async e => {
                    e.preventDefault()
                    try {
                        setShowReturnLoader(true)
                        const tx = await props?.escrowContract.ReturnPayment()
                        await tx.wait()
                        props?.setState(await props?.escrowContract.state())
                        setShowReturnLoader(false)
                    } catch (err) {
                        console.error(err)
                    }
                }}>
                    {!showReturnLoader ? "Return Payment" : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </Button>
                : null}
        </div>
    )

}
