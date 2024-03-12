import React, {useEffect, useRef, useState} from 'react';
import SearchBarText from "./SearchBarText";
import SearchBarResults from "./SearchBarResults";
import './SearchBarStyles.css';
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;
import AddStockModal from "../../../AddStockModal/components/AddStockModal";

interface Props {
    setQuery: Function,
    search: Function,
    dropdownItems: Array<string>
}

function SearchBar({setQuery, search, dropdownItems}: Props) {
    const [dropdownToggle, setDropdownToggle] = useState(false);
    const [modalToggle, setModalToggle] = useState(false);
    const dropdownRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', ev => {
            // @ts-ignore
            if (dropdownRef.current && !dropdownRef?.current.contains(ev.target)) {
                console.log('hiding dropdown')
                setDropdownToggle(false);
            }
            // @ts-ignore
            if (modalRef.current && !modalRef?.current.contains(ev.target)) {
                console.log('hiding modal')
                setModalToggle(false);
            }
        })
    }, []);
    
    useEffect(() => setDropdownToggle(true), [dropdownItems]); //on search items change
    useEffect(() => setDropdownToggle(false), []);//initial load

    return (
        <div className={'flex_col'} > 
            <SearchBarText setQuery={setQuery} search={search} />
            {dropdownToggle ? 
                <SearchBarResults 
                    ref={dropdownRef}
                    dropdownItems={dropdownItems}
                    toggle={setDropdownToggle}
                    modalToggle={setModalToggle}
                /> 
            : ''}
            {modalToggle ? <AddStockModal ref={modalRef}/> : ''}
        </div>
    );
}

export default SearchBar;