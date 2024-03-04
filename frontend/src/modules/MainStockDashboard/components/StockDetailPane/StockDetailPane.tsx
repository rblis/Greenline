import React from 'react';
import StockDetailItem from "./StockDetailItem";
import './StockDetailStyles.css'
import StockDetailChart from "./StockDetailChart";

interface Props {
    data: any
}

function 
StockDetailPane({data}: Props) {
    return (
        <div className={'round_borders grid3f2f'}>
            <img className={'max_size100 gcs1'} src={'https://economictimes.indiatimes.com/thumb/msid-62469146,width-1200,height-900,resizemode-4,imgsize-43715/graph-market-thinkstock.jpg?from=mdr'} alt={'stock image'}></img>
            <StockDetailChart/>
            {/*<StockDetailItem key={'price'} value={'111'}></StockDetailItem>*/}
            <div className={'gcs4'}>
                {data ? data.map( (item:any) => (<div><b>{Object.keys(item)[0]}</b> : {item[Object.keys(item)[0]]}</div>) ) : ''}
            </div>
        </div>
    );
}

export default StockDetailPane;

/**
 ask
 bid
 displayName
 epsCurrentYear
 epsTrailingTwelveMonths
 fiftyDayAverage
 fiftyDayAverageChangePercent
 fiftyTwoWeekRange
 marketCap
 */