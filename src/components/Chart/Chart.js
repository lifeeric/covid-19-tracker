import React, { useEffect, useState} from 'react';
import { fetchDailyData } from '../../APIs';
import { Line, Bar } from 'react-chartjs-2';

import classes from './Chart.module.scss';

export default ({data: {confirmed, recovered, deaths}, country}) => {

    // Daily Data
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        (async () => {
            setDailyData(await fetchDailyData());
        })();

    }, []);

    const lineChart = (
        dailyData.length
        ? (<Line 
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }]
            }}
        />) : null
    );

    // BAR GRAPH
    const barChart = (
        confirmed
            ? (
                <Bar data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false, },
                    title: { display: true, text: `Current state in ${country}`}
                }} />
            ) : null
    );
    
    return (
        <div className={classes.container}>
            {country ? barChart : lineChart}
        </div>
    )
}