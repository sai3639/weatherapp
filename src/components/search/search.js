import {useState} from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";


const Search = ({onSearchChange}) => {


    const [search, setSearch] = useState(null);


    /*getting info from API*/ 
    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, 
            geoApiOptions
        )


        .then((response) => response.json())
        .then((response) => {
            return{
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    }
                })
            }
        } )
        .catch((err) => console.error(err));
    
    
    };

    /*retrieves data entered in component*/
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: 550,
            marginLeft: 255,
            borderRadius: '30px',
            border: '2px solid #ccc',
            height: 6,
            marginRight: 16,
            marginBottom: 0,
            fontSize: 18,
            boxShadow: state.isFocused ? '0 0 0 2px #3699FF' : null,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#ebffc' : null,
            color: state.isFocused ? 'blue' : null,
            
        }),

    }



    return (
        /*search bar component*/
        <AsyncPaginate
            placeholder = "Search for city"
            debounceTimeout = {600} /*debounce for API*/ 
            value={search}
            onChange={handleOnChange} 
            /*autocomplete/searching word based on what is typed*/
            loadOptions={loadOptions}
            styles={customStyles}
            />
    )

}



export default Search; 