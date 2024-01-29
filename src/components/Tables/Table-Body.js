import React from 'react';

const renderTableData = ({stocks}) => {
    return stocks.map((stock) => {
      const { 
        date,
        symbol, 
        buyPrice, 
        shares, 
        total, 
        type, 
         } = stock 
      return (
         <tr key={date}>
            <td >{date}</td>
            <td>{symbol.toUpperCase()}</td>
            <td>${Number.parseFloat(buyPrice).toFixed(2)}</td>
            <td>{shares}</td>
            <td>${Number.parseFloat(total).toFixed(2)}</td>
            <td>{type}</td>
         </tr>
      )
    })
  }

  export default renderTableData;