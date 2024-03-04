import React, {useEffect, useState} from 'react';
import './DashboardContainerStyles.css'
import CardTable from "../../../Common/components/CardTable/CardTable";
import axios from "axios";
import SearchBar from "../../../Common/components/SearchBar/SearchBar";
import StockDetailPane from "../StockDetailPane/StockDetailPane";
interface Props {
}

function DashboardContainer({}: Props) {
    const [columns, setColumns] = useState();
    const [rawData, setRawData] = useState();
    const [loading, setLoading] = useState(true);
    const [overviewData, setOverviewData] = useState([{'test': 'data'}]);
    const [query, setQuery] = useState('');
    const [dropdownItems, setDropdownItems] = useState([]);
    
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
                console.log(response);
            }).catch(error => console.log(error));
    }, []);
    
    async function search() {
        if (query.length > 0) {
            axios.get(
                'http://localhost:5057/dashboard/search/' + query,
                {headers: {'Access-Control-Allow-Origin' : 'Allow'}}
            ).then(response => {
                console.log(response.data.body);
                setDropdownItems(response.data.body);
            }).catch(error => console.log(error));
        }
    }
    
    const fetchStockOverview = async (symbol: string) => {
        axios.get(
            'http://localhost:5057/dashboard/overview/' + symbol,
            {headers: {'Access-Control-Allow-Origin' : 'Allow'}}
        ).then(response => {
            console.log(response.data.body);
            let data = [
                {'Ask': response.data.body[0].ask},
                {'Bid': response.data.body[0].bid},
                {'Name': response.data.body.displayName},
                {'EPS Currrent Year': response.data.body[0].epsCurrentYear},
                {'EPS Trailing 12 Months': response.data.body[0].epsTrailingTwelveMonths},
                {'50 Day Average': response.data.body[0].fiftyDayAverage},
                {'50 Day Average Change %': response.data.body[0].fiftyDayAverageChangePercent},
                {'52-Week Range': response.data.body[0].fiftyTwoWeekRange},
                {'Market Cap': response.data.body[0].marketCap}, 
            ];
            // @ts-ignore
            setOverviewData(data);
        }).catch(error => console.log(error));
    }

    return (
        <div className={'dashboard_window flex_col'}>
            <h1 className={'center font1'}>Dashboard</h1>
            <SearchBar setQuery={setQuery} search={search} dropdownItems={dropdownItems}/>
            <div className={'round_borders flex_row'}>
                {loading ? '' : <CardTable columns={columns} rawData={rawData} clickHandler={fetchStockOverview}/>}
            </div>
            <StockDetailPane data={overviewData}/>
        </div>
    );
}

export default DashboardContainer;