import React, { Component } from 'react'

// const color = {color: 'green'}
class PortfolioItem extends Component {
    // console.log('items',props.portfolio)
    constructor(props) {
        super(props)
        this.state = {
            currPrices: []
        }
        // this.fetchCurrPrice = this.fetchCurrPrice.bind(this)
    }

    render() {
        const style = { border: "1px solid black" };

        return (
            <table style={style}>
                <thead>
                    <tr>
                        <th style={style}>Symbol</th>
                        <th style={style}>Shares</th>
                        <th style={style}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.portfolio.map(item => {
                        const value = (this.props.price[item.symbol] * item.quantity).toFixed(2) === 'NaN' ? 0 : (this.props.price[item.symbol] * item.quantity).toFixed(2)
                        // console.log('va',value)
                        return (
                            <tr key={item.id}>
                                <td style={style}>{item.symbol}</td>
                                <td style={style}>{item.quantity}</td>
                                <td style={style}>$ {value}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        )
    }
}

export default PortfolioItem