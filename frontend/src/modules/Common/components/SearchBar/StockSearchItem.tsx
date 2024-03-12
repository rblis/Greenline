import React from 'react';

interface Props {
    item: SearchItem,
    onClick: Function
}

export interface SearchItem {
    symbol: string,
    name: string,
    exch: string,
    exchDisp: string,
    type: string,
    typeDisp: string,    
}

function StockSearchItem({item, onClick}: Props) {
    
    return (
        <div className={'grid1f3f1f flex_just_center font_15 hover'} onClick={() => onClick(item)}> 
            <b className={'gcs1'}>{item.symbol}</b>
            <div className={'gcs2 marg_lrl'}>{item.name}</div>
            <div className={'gcs5'}>{item.exchDisp}</div>
        </div>
    );
}

export default StockSearchItem;