import React, {useEffect, useState} from 'react';
import axios from 'axios';
import StockSearchItem from "../components/ListItems/StockSearchItem";
function AddStockView() {
    const [searchResults, setSearchResults] = useState([]);
    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/sc/search/CART',
            headers: {
                'X-RapidAPI-Key': '19eaceee83msh17a42ce61ffed43p135b50jsnb69e2cdbe427',
                'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setSearchResults(response.data['body']);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={'addStock'}>
            <form className={'addStockForm'}>
                <input type={'text'} placeholder={''}/>
                <input type={'button'} onClick={fetchData} value={'Search Stock'}/>
            </form>
            <div><b>SYMBOL - NAME - EXCHANGE</b><hr/></div>
            <div className={'scroll'}>
                {searchResults.map((val, index) =>
                    <StockSearchItem key={index} symbol={val['symbol']} name={val['name']} exchange={val['exchDisp']}/>
                )}
            </div>
        </div>
    );
}

export default AddStockView;