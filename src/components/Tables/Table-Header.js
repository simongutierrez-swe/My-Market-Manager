import React from 'react';

import { titleNames } from '../../utils/constants';

const renderTableHeader = ({ headers }) => {
    const titles = Object.keys(headers);
    return (
        <tr>
            {
            titles.map((title) => {
                return <th key={title}>{titleNames[title.toUpperCase()]}</th>
                })
            }
        </tr>
    )
 };

 export default renderTableHeader;