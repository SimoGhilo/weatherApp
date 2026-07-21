//Dependencies
import { useEffect, useRef, useState } from "react";
//Types
import type { HourlyForecast, WeatherUI } from "./types";
//Files
import { weatherMap } from "./weatherUI.ts";
//Styles
const activeCardStyle = "bg-slate-600 text-white border-slate-600 shadow-2xl transition-transform duration-300";

function DailyForecast({lat, long, day}: {lat: number | undefined, long: number | undefined, day: string | undefined | null}) {


    //States
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast | null>(null);
    const [timec, setTimec] = useState<string>(""); // current time to highlight the current hour in the forecast
    const [today, setToday] = useState<string>(""); // current string today to check whether time highlighted is today or not

    console.log(today, 'today in state')
    //Ref
    const activeCardRef = useRef<HTMLDivElement | null>(null);

    //Hooks

    //Time
    useEffect(() => {
        setInterval(() => {
            const time = new Date().toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setTimec(time.slice(0,2));
            setToday(new Date().toISOString().split('T')[0].split('-')[2]);
        },1000)
    });

    //centre time card in the middle of the screen using ref
    useEffect(() => {
    activeCardRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",   // <-- centers horizontally
        block: "nearest",
    });
    }, [timec, hourlyForecast]);


    //API call to fetch the hourly forecast for the given latitude, longitude, and day
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
                        <div key={index} ref={time.slice(11,13) === timec && time.slice(8,10) === today ? activeCardRef : null} className={`flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg ${(time.slice(11,13) === timec && time.slice(8,10) === today) ? activeCardStyle : 'bg-white'}`}>
                            <span className="text-sm">{time.slice(11,16)}</span>
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