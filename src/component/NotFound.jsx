import React from 'react'

const NotFound = () => {
    return (
        <div style={{display:"flex", marginBlock:"2%", justifyContent:"center"}}>
            <img style={{ width: "90%", height: "90%" }} src={process.env.PUBLIC_URL + "/404.webp"} alt="404 not found" />
        </div>
    )
}

export default NotFound
