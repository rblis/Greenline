import React from 'react';
import './SearchBarStyles.css';

interface Props {
    dropdown: Array<string>
}

function SearchBarResults({dropdown}: Props) {
    return (
        <div className={'search_bar_results_container blursed'}>
            <div className={'search_bar_results blursed'}>
                {dropdown.map( (item: any, index:number) => (<p key={index}>{item}</p>))}               
            </div>
        </div>
    );
}

export default SearchBarResults;