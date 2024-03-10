import React, {useEffect, useMemo, useState} from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip);

interface Props {
    loading: boolean,
    options: any,
    chartData: any
}

function StockDetailChart({loading = false, options = {}, chartData = {}}: Props) {

    const [graph, setGraph] = useState<any>('');

    useMemo(() => {
        console.log('useMemo: ', options, chartData)
        setGraph(<Line options={options} data={chartData}/>);
        
    }, [chartData, options]);
    

    return (
        <div className={'max_size100'}>
            {graph}
        </div>
        
    );
}

export default StockDetailChart;