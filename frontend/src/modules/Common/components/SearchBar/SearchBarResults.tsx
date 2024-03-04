import React, {useEffect, useRef} from 'react';
import './SearchBarStyles.css';
import StockSearchItem from "./StockSearchItem";

interface Props {
    dropdownItems: any,
    toggle: Function
}

function SearchBarResults({dropdownItems, toggle}: Props) {
    const autoHideRef = useRef(null);
    useEffect(() => {
        document.addEventListener('mousedown', ev => {
            // @ts-ignore
            if (autoHideRef.current && !autoHideRef?.current.contains(ev.target)) {
                toggle(false);
            }
        })
    }, []);
    
    const hideResults = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        
        // @ts-ignore
        // if (!autoHideRef.current.contains(e.target)) {
        // }
        console.log('hiding');
        toggle(false);
    }
    
    return (
        <div ref={autoHideRef} className={'search_bar_results_container blursed flex_row cont'}>
            <div className={'search_bar_results blursed flex_col'}>
                {dropdownItems.map( (item: any, index:number) => 
                    <StockSearchItem key={index} item={item} toggle={toggle}></StockSearchItem>
                )}               
            </div>
        </div>
    );
}

export default SearchBarResults;