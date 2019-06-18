import React from 'react'

const PortfolioItem = (props) => {

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
                {props.portfolio.map(item => {
                    const value = (props.price[item.symbol] * item.quantity).toFixed(2) === 'NaN' ? null : (props.price[item.symbol] * item.quantity).toFixed(2)
                    const pricePerformance = props.currPrice - props.price
                    let dynamicColor;
                    switch (pricePerformance) {
                        case pricePerformance > 0:
                            dynamicColor = 'green'
                            break;
                        case pricePerformance < 0:
                            dynamicColor = 'green'
                            break;
                        default:
                            dynamicColor = 'green'
                    }

                    const dataStyle = { border: "1px solid black", backgroundColor: "#e6e6ff", color: dynamicColor };
                    return (
                        <tr key={item.id}>
                            <td style={dataStyle}>{item.symbol}</td>
                            <td style={dataStyle}>{item.quantity}</td>
                            <td style={dataStyle}>$ {value}</td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
}

export default PortfolioItem