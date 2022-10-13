import React from 'react'

class PartnerUs extends React.Component {
    authenticate() {
        return new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds
    }

    componentDidMount() {
        this.authenticate().then(() => {
            const ele = document.getElementById('progress-indicator')
            if (ele) {
                // fade out
                ele.classList.add('available')
                setTimeout(() => {
                    // remove from DOM
                    ele.outerHTML = ''
                }, 2000)
            }
        })
    }
    
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default PartnerUs
