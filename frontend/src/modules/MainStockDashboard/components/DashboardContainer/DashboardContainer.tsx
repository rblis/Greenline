import React, {useEffect, useState} from 'react';
import './DashboardContainerStyles.css'
import CardTable from "../../../Common/components/CardTable/CardTable";
import axios from "axios";
import SearchBar from "../../../Common/components/SearchBar/SearchBar";
import StockDetailPane from "../StockDetailPane/StockDetailPane";
import {
    fetchPortfolio, 
    fetchSearchResults, 
    fetchStockOverview, 
    fetchHistoricalPrices
} from "../../services/DashboardContainerDataService"

interface Props {}
function DashboardContainer({}: Props) {
    const [portfolioStocks, setPortfolioStocks] = useState();
    const [rawData, setRawData] = useState();
    const [loading, setLoading] = useState(true);
    const [overviewData, setOverviewData] = useState<any>([{'test': 'data'}]);
    const [historicalPriceData, setHistoricalPriceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownItems, setDropdownItems] = useState([]);
    
    const fetchOverview = async (symbol: string) => {
        await fetchStockOverview(symbol, setOverviewData);
        await fetchHistoricalPrices(symbol, setHistoricalPriceData);
    }
    
    const searchStock = async () => {
        fetchSearchResults(searchQuery, setDropdownItems);
    }
    
    useEffect(() => {
        fetchPortfolio(setPortfolioStocks, setRawData, setLoading);
    }, []);

    return (
        <div className={'dashboard_window flex_col'}>
            <h1 className={'center font1'}>Dashboard</h1>
            <SearchBar setQuery={setSearchQuery} search={searchStock} dropdownItems={dropdownItems}/>
            <div className={'round_borders flex_row'}>
                {loading ? '' : <CardTable columns={portfolioStocks} rawData={rawData} clickHandler={fetchOverview}/>}
            </div>
            <StockDetailPane stockData={overviewData} chartData={historicalPriceData}/>
        </div>
    );
}

export default DashboardContainer;