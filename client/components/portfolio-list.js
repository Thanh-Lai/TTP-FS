import React from 'react'
import Container from '@material-ui/core/Container'



const PortfolioItem = (props) => {
    const style = { border: "1px solid black", width: "430px" };
    const alignCenter = { textAlign: 'center' }
    const styleHead = { color: 'white', backgroundColor: 'black' }

    return (
        <Container component="main" maxWidth="xs">
            <h1 style={alignCenter}>Portfolio</h1>
            <table style={style}>
                <thead style={styleHead}>
                    <tr>
                        <th style={style}>Symbol</th>
                        <th style={style}>Shares</th>
                        <th style={style}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {props.portfolio.map(item => {
                        if (item.quantity > 0) {
                            const value = (props.openPrice[item.symbol] * item.quantity).toFixed(2) === 'NaN' ? null : (props.openPrice[item.symbol] * item.quantity).toFixed(2)
                            const pricePerformance = Number(props.currPrice[item.symbol] - props.openPrice[item.symbol])
                            const dynamicColor = performance => {
                                if (performance > 0) return 'green'
                                if (performance < 0) return 'red'
                                if (performance === 0) return 'grey'
                                return 'black'
                            }
                            const dataStyle = { border: "1px solid black", backgroundColor: "#e6e6ff", color: dynamicColor(pricePerformance), textAlign: 'center' };
                            return (
                                <tr key={item.id}>
                                    <td style={dataStyle}>{item.symbol}</td>
                                    <td style={dataStyle}>{item.quantity}</td>
                                    <td style={dataStyle}>$ {value}</td>
                                </tr>
                            )
                        }
                    })
                    }
                </tbody>
            </table>
        </Container>
    )
}

export default PortfolioItem