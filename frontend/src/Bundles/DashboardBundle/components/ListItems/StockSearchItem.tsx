import React from 'react';

// @ts-ignore
function StockSearchItem({key, symbol, name, exchange}) {


    return (
        <div>
            <div className={'stockSearchItem'}>
                <label>{'[' + symbol + '] '}</label>
                <label>{' ' + name + ' '}</label>
                <label>{' ' + exchange + ' '}</label>
                <button style={{height:'min-content'}}>Add</button>
            </div>
            <hr/>
        </div>
    );
}

export default StockSearchItem;