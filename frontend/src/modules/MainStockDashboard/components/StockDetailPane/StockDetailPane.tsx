import React, {useEffect, useMemo, useState} from 'react';
import StockDetailItem from "./StockDetailItem";
import './StockDetailStyles.css'
import StockDetailChart from "./StockDetailChart";
import setUpCharts from "../../services/StockDetailPaneService"

interface Props {
    stockData: any,
    chartData: any
}

function StockDetailPane({stockData = [], chartData = []}: Props) {
    const [options, setOptions] = useState<any>({});
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useMemo(() => {        
        setUpCharts(stockData, chartData, setData, setOptions, setLoading);
    }, [stockData, chartData]);
    
    
    return (
        <div className={'round_borders grid3f2f'}>
            {/*<img className={'max_size100 gcs1'} src={'https://economictimes.indiatimes.com/thumb/msid-62469146,width-1200,height-900,resizemode-4,imgsize-43715/graph-market-thinkstock.jpg?from=mdr'} alt={'stock image'}></img>*/}
            {loading ? <StockDetailChart loading={loading} options={options} chartData={data}/> : ''}
            {/*<StockDetailItem key={'price'} value={'111'}></StockDetailItem>*/}
            <div className={'gcs2'}>
                {stockData ? stockData.map( (item:any) => (<div><b>{Object.keys(item)[0]}</b> : {item[Object.keys(item)[0]]}</div>) ) : ''}
            </div>
        </div>
    );
}

export default StockDetailPane;