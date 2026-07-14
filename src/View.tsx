//Dependencies
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//Types
import type { RouteParam, City, WeatherData } from "./types";

//City data
import ukCityData from "./coords.ts";


function View() {

    //URL params
    const { city } = useParams<RouteParam>();

    //State
    const [chosenCity, setChosenCity] = useState<City | undefined>(undefined);
    const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);

    //Hooks
    useEffect(() => {
        if(city) {
            const foundCity = ukCityData.find(c => c?.id === city);
            setChosenCity(foundCity);
        }
    }, []);

    useEffect(() => {
        //Fetch weather data for the chosen city
        if (chosenCity) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${chosenCity.lat}&longitude=${chosenCity.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`)
                .then(response => response.json())
                .then(data => setWeatherData(data.daily)).catch(error => console.error('Error fetching weather data:', error));
        }
    }, [chosenCity]);

    //Utility functions
    function capitaliseFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    
    if(!city || !ukCityData.some(c => c?.id == city)) {
        return (
            <div className="flex flex-row items-center justify-start m-1">
                <h1 className="sm:text-sm lg:text-2xl font-bold">We could not find the city.</h1>
            </div>
        )
    }


    //TODO: We have a chosen city, so we can display the weather information accordingly, work on cards

    console.log(weatherData, 'data from api');

    return (
        <>
            <div className="flex flex-row items-start justify-start m-1">
                <h1 className="sm:text-sm lg:text-2xl font-bold">{capitaliseFirstLetter(city || 'We could not find the city.')}</h1>
            </div>
            <div>
                {weatherData && (
                    <div className="container">
                        <div className="flex flex-row items-center justify-center p-4">
                            <div className="mx-2">
                                <h2 className="sm:text-sm lg:text-2xl font-bold">Today</h2>
                            </div>
                            <div className="mx-2">
                                <h2 className="sm:text-sm lg:text-2xl font-bold">Tomorrow</h2>
                            </div>
                            <div className="mx-2">
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[2].slice(5,)}</h2>
                            </div>
                            <div className="mx-2">
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[3].slice(5,)}</h2>
                            </div>
                            <div className="mx-2">
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[4].slice(5,)}</h2>
                            </div>
                            <div className="mx-2">
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[5].slice(5,)}</h2>
                            </div>
                            <div className="mx-2">
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[6].slice(5,)}</h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default View