//Dependencies
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//Types
import type { RouteParam, City } from "./types";

//City data
import ukCityData from "./coords.ts";


function View() {

    //URL params
    const { city } = useParams<RouteParam>();

    //State
    const [chosenCity, setChosenCity] = useState<City | undefined>(undefined);
    const [weatherData, setWeatherData] = useState<any>(undefined);

    //Hooks
    useEffect(() => {
        if(city) {
            const foundCity = ukCityData.find(c => c?.id === city);
            setChosenCity(foundCity);
        }
    }, [])

    //Utility functions
    function capitaliseFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //TODO: Display the weather information accordingly. using api
    //TODO: Fetch coords from data and display the weather information accordingly. 

    if(!city || !ukCityData.some(c => c?.id == city)) {
        return (
            <div className="flex flex-row items-center justify-start m-1">
                <h1 className="sm:text-sm lg:text-2xl font-bold">We could not find the city.</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-row items-start justify-start m-1">
            <h1 className="sm:text-sm lg:text-2xl font-bold">{capitaliseFirstLetter(city || 'We could not find the city.')}</h1>
        </div>
    )
}

export default View