import React from 'react';
import {
    Cards,
    CountryPicker,
    Chart
} from '../components/';

// APIS
import { fetchData } from '../APIs';

import classes from './Covid-19.module.scss';
import coronaImage from '../images/image.png';

export default class extends React.Component {

    state = {
        data: {},
        country: ''
    }

    // Component Did Mount
    async componentDidMount(){
         const fetchedData = await fetchData();

        this.setState({data: fetchedData});
    }

    // Chosing country
    countryChosingHandler = async (country) => {

        const fetchedData = await fetchData(country);
       
        this.setState({country: country, data: fetchedData});
    }

    render() {

        // Destruct
        const { data, country } = this.state;

        return (
            <div className={classes.container}>
                    <img className={classes.image} src={coronaImage} alt="Covid-19" />
                    <Cards data={data} />
                    <CountryPicker country={this.state.country} countryChosingHandler={this.countryChosingHandler} />
                    <Chart data={data} country={country} />
            </div>
        );
    }
}