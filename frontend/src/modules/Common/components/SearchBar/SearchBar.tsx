import React from 'react';
import SearchBarText from "./SearchBarText";
import SearchBarResults from "./SearchBarResults";
import './SearchBarStyles.css';

interface Props {
    setQuery: Function,
    search: Function,
    dropdown: Array<string>
}

function SearchBar({setQuery, search, dropdown}: Props) {
    return (
        <div className={'flex_col'}>
            <SearchBarText setQuery={setQuery} search={search}/>
            <SearchBarResults dropdown={dropdown}/>
        </div>
    );
}

export default SearchBar;