import axios from "axios";
import React from "react";

export const fetchPortfolio = async (
    setPortfolioStocks: Function,
    setRawData: Function,
    setLoading: Function
) => {
    axios.get(
        'http://localhost:5057/dashboard/portfolio',
        {headers: {'Access-Control-Allow-Origin' : 'Allow'}}
    ).then(response => {
        setPortfolioStocks(response.data.columns.map( (col: any) => {
            col['cell'] = ((props:any) => <p>{props.getValue()}</p>);
            return col;
        }));
        setRawData(response.data.rawData);
        setLoading(false);
        console.log(response);
    }).catch(error => console.log(error));
}

export const fetchSearchResults = async (searchQuery: string, setDropdownItems: Function) => {
    if (searchQuery.length > 0) {
        axios.get(
            'http://localhost:5057/dashboard/search/' + searchQuery,
            {headers: {'Access-Control-Allow-Origin' : 'Allow'}}
        ).then(response => {
            console.log(response.data.body);
            setDropdownItems(response.data.body);
        }).catch(error => console.log(error));
    }
}

export const fetchStockOverview = async (symbol: string, setOverviewData: Function) => {
    axios.get(
        'http://localhost:5057/dashboard/overview/' + symbol,
        {headers: {'Access-Control-Allow-Origin' : 'Allow'}}
    ).then(response => {
        let data = [
            {'Name': response.data[0].displayName},
            {'Ask': response.data[0].ask},
            {'Bid': response.data[0].bid},
            {'EPS Currrent Year': response.data[0].epsCurrentYear},
            {'EPS Trailing 12 Months': response.data[0].epsTrailingTwelveMonths},
            {'50 Day Average': response.data[0].fiftyDayAverage},
            {'50 Day Average Change %': response.data[0].fiftyDayAverageChangePercent},
            {'52-Week Range': response.data[0].fiftyTwoWeekRange},
            {'Market Cap': response.data[0].marketCap},
        ];
        setOverviewData(data);
    }).catch(error => console.log(error));
}

export const fetchHistoricalPrices = async (symbol: string, setHistoricalPriceData: Function) => {
    axios.get(
        'http://localhost:5057/dashboard/HistoricalPrices/' + symbol,
        {headers: {'Access-Control-Allow-Origin' : 'Allow'}}
    ).then(response => {
        setHistoricalPriceData(response.data);
    }).catch(error => console.log(error));
}

export {}