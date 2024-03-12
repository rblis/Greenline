import React, {forwardRef, useEffect, useRef} from 'react';
import './SearchBarStyles.css';
import StockSearchItem, {SearchItem} from "./StockSearchItem";

interface Props {
    dropdownItems: any,
    toggle: Function,
    modalToggle: Function,
}

const SearchBarResults = forwardRef( ({dropdownItems, toggle, modalToggle}: Props, ref:any) => {
    
    const openAddStockModal = (item: SearchItem) => {
        console.log('clicked', item.name, 'opening add stonk modal');
        toggle(false);
        modalToggle(true);
    };
    
    return (
        <div ref={ref} className={'modal_container modal_bg flex_row'}>
            <div className={'search_bar_results modal_bg flex_col'}>
                {dropdownItems.map( (item: any, index:number) => 
                    <StockSearchItem key={index} item={item} onClick={openAddStockModal}></StockSearchItem>
                )}               
            </div>
        </div>
    );
});

export default SearchBarResults;