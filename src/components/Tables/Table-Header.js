import React from 'react';

// TODO: we need spaces in titles create a mapping for titles => {'buyprice': 'Buy Price'}
const renderTableHeader = ({ headers }) => {
    const titles = Object.keys(headers);
    return (
        <tr>
            {
            titles.map((title) => {
                return <th key={title}>{title.toUpperCase()}</th>
                })
            }
        </tr>
    )
 };

 export default renderTableHeader;