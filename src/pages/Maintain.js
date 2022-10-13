import React, { useEffect } from 'react'
import "react-multi-carousel/lib/styles.css";


export default function Maintain() {

    const authenticate = () => {
        return new Promise(resolve => setTimeout(resolve, 2000))
    }

    useEffect(() => {
        authenticate().then(() => {
            const ele = document.getElementById('progress-indicator')
            if (ele) {
                ele.classList.add('available')
                setTimeout(() => {
                    // ele.outerHTML = ''
                }, 2000)
            }
        })
    }, [])


    return (
        <div>
            <center>
                <img src="https://i.pinimg.com/originals/4e/e5/ca/4ee5ca990c4a7ec5ff5207719caa2e5c.png" />
            </center>
        </div>
    )
}