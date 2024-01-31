import React from 'react';

const renderTableData = ({body}) => {
    // change this to take in an array, map over its vals
    // optional performance val
    // optional array?
    // would this result in two nested maps?
    // how do we make this more general? 
    // if (currElem === Number) parseFloat else .toUpperCase()
    // if (currPrice) performance = classname and parseFloat
    
    return body.map((stock) => {
      const { 
        date,
        symbol, 
        buyPrice, 
        shares, 
        total, 
        type, 
         } = stock;

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