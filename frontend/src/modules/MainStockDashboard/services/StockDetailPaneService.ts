const setUpCharts = (
    stockData: any,
    chartData: any,
    setData: Function,
    setOptions: Function,
    setLoading: Function
) => {
    if (stockData.length == 0 || chartData.length == 0) return;
    const x: string[] = [];
    const y: number[] = [];

    chartData.forEach( (item: any) => {
        x.push(item.date);
        y.push(item.close);
    })

    let config = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: stockData[0]['Name']
            }
        }
    };
    let labels = x
    let dataset = {
        labels,
        datasets: [
            {
                data: y,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ]
    }
    setData(dataset);
    setOptions(config);
    console.log('charting', config, dataset)
    setLoading(true);
}

export default setUpCharts;