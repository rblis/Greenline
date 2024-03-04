import React from 'react';

interface Props {
    key: string,
    value: string,
    chart?: string
}

function StockDetailItem({key, value, chart}: Props) {
    return (
        <div className={'flex_row'}>
            <div>{key}</div> - <div>{value}</div>
        </div>
    );
}

export default StockDetailItem;