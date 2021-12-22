import React from 'react'

import FooterApp from './FooterApp'
import HeaderApp from './HeaderApp'
import Trader from './Trader'

const Trade = () => {
    return (
        <div className= "trade-div">
            <HeaderApp/>
            <Trader/>
            <FooterApp/>
        </div>
    )
}

export default Trade
