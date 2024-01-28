import React from 'react';


const renderTableHeader = ({headers}) => {
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