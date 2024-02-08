import React, {useEffect, useState} from 'react';
import './DashboardContainerStyles.css'
import CardTable from "../../../Common/components/CardTable/CardTable";
import axios from "axios";
import SearchBar from "../../../Common/components/SearchBar/SearchBar";
interface Props {
}

function DashboardContainer({}: Props) {
    const [columns, setColumns] = useState();
    const [rawData, setRawData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(
                'http://localhost:5057/dashboard/portfolio',
                {headers: {'Access-Control-Allow-Origin' : 'Allow'}}
            ).then(response => {
                setColumns(response.data.columns.map( (col: any) => {
                    col['cell'] = ((props:any) => <p>{props.getValue()}</p>);
                    return col;
                }));
                setRawData(response.data.rawData);
                setLoading(false);
            }).catch(error => console.log(error));
    }, []);
    
    async function search() {
        axios.get(
            'http://localhost:5057/dashboard/search/' + query,
            {headers: {'Access-Control-Allow-Origin' : 'Allow'}}
        ).then(response => {
            console.log(response.data.body);
            var decoratedResults = response.data.body.map( (item: any) => ( item.symbol + ' ' + item.name));
            setDropdown(decoratedResults);
        }).catch(error => console.log(error));
    }
    
    const [query, setQuery] = useState('tsla');
    const [dropdown, setDropdown] = useState([]);

    return (
        <div className={'dashboard_window flex_col'}>
            <h1 className={'center font1'}>Dashboard</h1>
            <SearchBar setQuery={setQuery} search={search} dropdown={dropdown}/>
            <div className={'stock_lists flex_row'}>
                {loading ? '' : <CardTable columns={columns} rawData={rawData}/>}
            </div>
        </div>
    );
}

export default DashboardContainer;