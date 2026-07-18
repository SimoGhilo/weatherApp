//Dependencies
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//Types
import type { RouteParam, City, WeatherData, WeatherUI } from "./types";

//City data
import ukCityData from "./coords.ts";

//Map of weather codes to UI elements
import { weatherMap } from "./weatherUI.ts";


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

    function getWeatherConfig(code: number): WeatherUI {
        return weatherMap[code] ?? { label: "Unknown", icon: "❓", color: "bg-gray-500" }
    }


    //UI

    
    if(!city || !ukCityData.some(c => c?.id == city)) {
        return (
            <div className="flex flex-row items-center justify-start ms-3">
                <h1 className="sm:text-sm lg:text-2xl font-bold">We could not find the city.</h1>
            </div>
        )
    }


    console.log(weatherData, 'data from api');

    return (
        <>
            <div className="flex flex-row items-start justify-start ms-10 mt-5">
                <h1 className="sm:text-sm lg:text-4xl font-bold">{capitaliseFirstLetter(city || 'We could not find the city.')}</h1>
            </div>
            <div>
                {weatherData && (
                    <div className="container">
                        <div className="flex flex-row items-center justify-center p-4 flex-wrap gap-2">

                            <div className={`mx-2 border-2 border-t-5 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">Today</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[0])?.icon}</span>
                            </div>

                            <div className={`mx-2 border-2 border-t-5  border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">Tomorrow</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[1])?.icon}</span>
                            </div>

                            <div className={`mx-2 border-2 border-t-5  border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[2].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[2])?.icon}</span>
                            </div>

                            <div className={`mx-2 border-2 border-t-5  border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[3].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[3])?.icon}</span>
                            </div>

                            <div className={`mx-2 border-2 border-t-5  border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[4].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[4])?.icon}</span>
                            </div>

                            <div className={`mx-2 border-2 border-t-5  border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[5].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[5])?.icon}</span>
                            </div>

                            <div className={`mx-2 border-2 border-t-5  border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[6].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[6])?.icon}</span>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default View