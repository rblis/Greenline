import React from 'react';

interface Props {
    name: string, 
    symbol: string, 
    price: number,
    className?: string, 
}
function Card({name, symbol, price, className = ''}: Props) : JSX.Element {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} className={className}>
            <h3>{name}</h3>
            <h4>{symbol}</h4>
            <h4>{price}</h4>
        </div>
    );
}

export default Card;