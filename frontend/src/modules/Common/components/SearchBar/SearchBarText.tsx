import React, {useEffect, useState} from 'react';
import './SearchBarStyles.css';

interface Props {
    setQuery: Function,
    search: Function,
}

function SearchBarText({setQuery, search}: Props) {
    const [text, setText] = useState('');
    
    function setSearchQuery(e: any) {
        console.log('setting search bar text', e.target.value);
        if (e.target.value === "") return;
        setQuery(e.target.value);
        setText(e.target.value);
    }    
    useEffect(() => {search();}, [text]);
    
    
    return (
        <div className={'search_bar_text flex_row'}>
            <input 
                className={'search_bar_txt font1'} 
                type={'text'} 
                placeholder={'Search'} 
                value={text} 
                onChange={(e) => setSearchQuery(e)}
            />
            <input className={'search_bar_btn'} type={'button'} value={'>'} onClick={(e) => search()}/>
        </div>
    );
}

export default SearchBarText;