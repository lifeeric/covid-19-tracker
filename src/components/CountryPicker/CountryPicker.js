import React, {useEffect, useState} from 'react';
import { CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { countries } from '../../APIs/';

import classes from './CountryPicker.module.scss';

export default ({countryChosingHandler, country}) => {

    const [fetchCountries, setFetchCountries] = useState([]);
    const [getCountry, setCountry] = useState('Global');

    useEffect(() => {
        (async () => {
            setFetchCountries(await countries())
        })();
    }, []);


    // Country Changer
    const changeCountry = (e) => {
        setCountry(e.target.value)
        countryChosingHandler(e.target.value === 'Global' ? '' : e.target.value)
    }

    if(!fetchCountries.length)
        return <CircularProgress />


    return (
        <FormControl variant="outlined" className={classes.formcontrol}>
            <InputLabel className={classes.label} id="country">Select Country</InputLabel>
            <Select
                labelId="country-picker"
                id="country-pick"
                label="Select Country"
                value={getCountry}
                onChange={changeCountry}
            >
                <MenuItem value="Global">Global</MenuItem>
                {fetchCountries.map((name, index) => (
                    <MenuItem key={index} value={name}>{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}