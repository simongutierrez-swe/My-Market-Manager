import React from 'react';

const calcPerformace = (currentPrice, openingPrice) => {
    if (openingPrice > currentPrice) {
        return 'red-text-color';
    } else if (openingPrice < currentPrice) {
        return 'green-text-color';
    }
        
    return 'grey-text-color';
    
};

const renderTableData = ({ body }) => {
    // TODO: find a way to make currentPrice not hard coded
    return body.map((elem, idx) => {
        return (
           <tr key={idx}>
              {
                Object.values(elem).map((cell, idx) => {
                return <td key={idx} className = {cell === elem['currentPrice'] ? calcPerformace(elem.currentPrice, elem.openingPrice) : ''}>
                            {
                            Number(cell) ? '$' + Number.parseFloat(cell).toFixed(2)
                            : cell.toUpperCase()
                            }
                        </td>
                })
            }
           </tr>
        )
      })

  }

  export default renderTableData;