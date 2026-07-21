//Dependencies
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//Types
import type { RouteParam, City, WeatherData, WeatherUI } from "./types";

//City data
import ukCityData from "./coords.ts";

//Map of weather codes to UI elements
import { weatherMap } from "./weatherUI.ts";

//Components
import DailyForecast from "./DailyForecast.tsx";

//Styles
const activeCardStyle = "bg-slate-600 text-white border-slate-600 shadow-2xl scale-110 transition-transform duration-300";


function View() {

    //URL params
    const { city } = useParams<RouteParam>();

    //Navigation
    const navigate = useNavigate();

    //State
    const [chosenCity, setChosenCity] = useState<City | undefined>(undefined);
    const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);
    const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

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

    function getTemperatureRangeClass(min: number, max: number): string {
        const average = (min + max) / 2;
        if (average < 5) return "border-t-blue-500";
        if (average < 10) return "border-t-blue-300";
        if (average < 15) return "border-t-yellow-300";
        if (average < 20) return "border-t-yellow-500";
        if (average < 25) return "border-t-red-400";
        return "border-t-red-600";
    }


    //UI

    
    if(!city || !ukCityData.some(c => c?.id == city)) {
        return (
            <div className="flex flex-row items-center justify-start ms-3">
                <h1 className="sm:text-sm lg:text-2xl font-bold">We could not find the city.</h1>
            </div>
        )
    }

    //TODO: Use carousel for cards / grid ?
    //TODO: Sort out search button

    return (
        <>
            <div className="flex flex-row items-center justify-start mt-5">
                <h1 className="sm:text-sm lg:text-4xl font-bold ms-10">{capitaliseFirstLetter(city || 'We could not find the city.')}</h1>
                <button className="m bg-white text-slate-900 font-bold whitespace-nowrap
                         text-[9px] xs:text-xs sm:text-sm 
                         px-1 py-0.5 xs:px-2 xs:py-1 rounded-md shadow-md 
                         hover:bg-amber-400 cursor-pointer
                         transition-all duration-200 focus:outline-none ms-auto me-3" 
                         onClick={() => navigate('/')}>
                    &lt; Back to Map
                </button>
            </div>
            <div>
                {weatherData && (
                    <div className="container ms-auto me-auto mt-1">
                        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center p-4 gap-2">

                            <div className={`mx-2 flex-1 min-w-[200px] max-w-[400px] md:max-w-[100px] border-2 border-t-5 ${getTemperatureRangeClass(weatherData?.temperature_2m_min[0], weatherData?.temperature_2m_max[0])} border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-md ${activeCardIndex === 0 ? activeCardStyle : ''} hover:cursor-pointer`} onClick={() => setActiveCardIndex(0)}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">Today</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[0])?.icon}</span>
                                <span>{weatherData?.temperature_2m_min[0]}°C - {weatherData?.temperature_2m_max[0]}°C</span>
                                <div className="border-t border-gray-300 my-4 w-full"></div>
                                <span>{getWeatherConfig(weatherData?.weather_code[0])?.label}</span>
                            </div>

                            <div className={`mx-2 flex-1 min-w-[200px] max-w-[400px] md:max-w-[100px] border-2 border-t-5 ${getTemperatureRangeClass(weatherData?.temperature_2m_min[1], weatherData?.temperature_2m_max[1])} border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-md ${activeCardIndex === 1 ? activeCardStyle : ''} hover:cursor-pointer`} onClick={() => setActiveCardIndex(1)}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">Tomorrow</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[1])?.icon}</span>
                                <span>{weatherData?.temperature_2m_min[1]}°C - {weatherData?.temperature_2m_max[1]}°C</span>
                                <div className="border-t border-gray-300 my-4 w-full"></div>
                                <span>{getWeatherConfig(weatherData?.weather_code[1])?.label}</span>
                            </div>

                            <div className={`mx-2 flex-1 min-w-[200px] max-w-[400px] md:max-w-[100px] border-2 border-t-5 ${getTemperatureRangeClass(weatherData?.temperature_2m_min[2], weatherData?.temperature_2m_max[2])} border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-md ${activeCardIndex === 2 ? activeCardStyle : ''} hover:cursor-pointer`} onClick={() => setActiveCardIndex(2)}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[2].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[2])?.icon}</span>
                                <span>{weatherData?.temperature_2m_min[2]}°C - {weatherData?.temperature_2m_max[2]}°C</span>
                                <div className="border-t border-gray-300 my-4 w-full"></div>
                                <span>{getWeatherConfig(weatherData?.weather_code[2])?.label}</span>
                            </div>

                            <div className={`mx-2 flex-1 min-w-[200px] max-w-[400px] md:max-w-[100px] border-2 border-t-5 ${getTemperatureRangeClass(weatherData?.temperature_2m_min[3], weatherData?.temperature_2m_max[3])} border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-md ${activeCardIndex === 3 ? activeCardStyle : ''} hover:cursor-pointer`} onClick={() => setActiveCardIndex(3)}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[3].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[3])?.icon}</span>
                                <span>{weatherData?.temperature_2m_min[3]}°C - {weatherData?.temperature_2m_max[3]}°C</span>
                                <div className="border-t border-gray-300 my-4 w-full"></div>
                                <span>{getWeatherConfig(weatherData?.weather_code[3])?.label}</span>
                            </div>

                            <div className={`mx-2 flex-1 min-w-[200px] max-w-[400px] md:max-w-[100px] border-2 border-t-5 ${getTemperatureRangeClass(weatherData?.temperature_2m_min[4], weatherData?.temperature_2m_max[4])} border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-md ${activeCardIndex === 4 ? activeCardStyle : ''} hover:cursor-pointer`} onClick={() => setActiveCardIndex(4)}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[4].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[4])?.icon}</span>
                                <span>{weatherData?.temperature_2m_min[4]}°C - {weatherData?.temperature_2m_max[4]}°C</span>
                                <div className="border-t border-gray-300 my-4 w-full"></div>
                                <span>{getWeatherConfig(weatherData?.weather_code[4])?.label}</span>
                            </div>

                            <div className={`mx-2 flex-1 min-w-[200px] max-w-[400px] md:max-w-[100px] border-2 border-t-5 ${getTemperatureRangeClass(weatherData?.temperature_2m_min[5], weatherData?.temperature_2m_max[5])} border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-md ${activeCardIndex === 5 ? activeCardStyle : ''} hover:cursor-pointer`} onClick={() => setActiveCardIndex(5)}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[5].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[5])?.icon}</span>
                                <span>{weatherData?.temperature_2m_min[5]}°C - {weatherData?.temperature_2m_max[5]}°C</span>
                                <div className="border-t border-gray-300 my-4 w-full"></div>
                                <span>{getWeatherConfig(weatherData?.weather_code[5])?.label}</span>
                            </div>

                            <div className={`mx-2 flex-1 min-w-[200px] max-w-[400px] md:max-w-[100px] border-2 border-t-5 ${getTemperatureRangeClass(weatherData?.temperature_2m_min[6], weatherData?.temperature_2m_max[6])} border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-md ${activeCardIndex === 6 ? activeCardStyle : ''} hover:cursor-pointer`} onClick={() => setActiveCardIndex(6)}>
                                <h2 className="sm:text-sm lg:text-2xl font-bold">{weatherData?.time?.[6].slice(5,).split('-').reverse().join('-')}</h2>
                                <span className="text-4xl">{getWeatherConfig(weatherData?.weather_code[6])?.icon}</span>
                                <span>{weatherData?.temperature_2m_min[6]}°C - {weatherData?.temperature_2m_max[6]}°C</span>
                                <div className="border-t border-gray-300 my-4 w-full"></div>
                                <span>{getWeatherConfig(weatherData?.weather_code[6])?.label}</span>
                            </div>

                        </div>
                    </div>
                )}
            </div>
            <DailyForecast lat={chosenCity?.lat} long={chosenCity?.lon} day={weatherData?.time?.[activeCardIndex]} />
        </>
    )
}

export default View