//Dependencies
import { useEffect, useState } from "react";
//Types
import type { HourlyForecast, WeatherUI } from "./types";
//Files
import { weatherMap } from "./weatherUI.ts";

function DailyForecast({lat, long, day}: {lat: number | undefined, long: number | undefined, day: string | undefined | null}) {


    //States
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast | null>(null);

    //API call to fetch the hourly forecast for the given latitude, longitude, and day
    //Hooks
    useEffect(() => {
        if (lat && long && day) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&start_date=${day}&end_date=${day}&timezone=auto`)
                .then(response => response.json())
                .then(data => setHourlyForecast(data.hourly))
                .catch(error => console.error('Error fetching hourly forecast:', error));
        }
    }, [lat, long, day]);

    //utility functions
    function getWeatherConfig(code: number): WeatherUI {
        return weatherMap[code] ?? { label: "Unknown", icon: "❓", color: "bg-gray-500" }
    } 

    return (
        <div className="container mt-5 mb-5">
            <h2 className="sm:text-sm lg:text-3xl font-bold ms-10">Hourly Forecast</h2>
            <div className="flex flex-row items-center justify-start w-[90%] ms-auto me-auto overflow-x-scroll">
                <div className="flex flex-row mt-4 gap-4">
                    {hourlyForecast && hourlyForecast.time.map((time, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg">
                            <span className="text-sm">{time.slice(11,)}</span>
                            <span className="text-sm">{getWeatherConfig(hourlyForecast.weather_code[index])?.icon}</span>
                            <span className="text-sm">{hourlyForecast.temperature_2m[index]}°C</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DailyForecast