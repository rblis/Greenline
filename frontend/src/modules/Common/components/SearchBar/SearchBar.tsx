import React, {useEffect, useState} from 'react';
import SearchBarText from "./SearchBarText";
import SearchBarResults from "./SearchBarResults";
import './SearchBarStyles.css';
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;

interface Props {
    setQuery: Function,
    search: Function,
    dropdownItems: Array<string>
}

function SearchBar({setQuery, search, dropdownItems}: Props) {
    const [dropdownToggle, setDropdownToggle] = useState(false);
    //document.addEventListener('mousedown', () => setDropdownToggle(false))

    useEffect(() => setDropdownToggle(true), [dropdownItems]); //on search items change
    useEffect(() => setDropdownToggle(false), []);//initial load
//onBlur={() => setDropdownToggle(false)}
    return (
        <div className={'flex_col'} > 
            <SearchBarText setQuery={setQuery} search={search} />
            {dropdownToggle ? <SearchBarResults dropdownItems={dropdownItems} toggle={setDropdownToggle}/> : ''}
        </div>
    );
}

export default SearchBar;