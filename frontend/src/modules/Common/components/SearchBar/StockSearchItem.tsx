import React from 'react';
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;

interface Props {
    item: SearchItem,
    toggle: Function
}

interface SearchItem {
    symbol: string,
    name: string,
    exch: string,
    exchDisp: string,
    type: string,
    typeDisp: string,
    
}

function StockSearchItem({item, toggle}: Props) {
    
    const selectItem = (item: SearchItem) => {
        //e.preventDefault();
        alert(item.name);
        toggle(false);
    }
    
    return (
        <div className={'flex_row flex_just_center font_15 hover'} onClick={() => selectItem(item)}> 
            <b>{item.symbol}</b>
            <div className={'text_left margin_lr_l'}>{item.name}</div>
            <div>{item.exchDisp}</div>
        </div>
    );
}

export default StockSearchItem;