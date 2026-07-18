//Dependencies
import { useEffect, useState } from "react";
//Types
import type { HourlyForecast } from "./types";

function DailyForecast({lat, long, day}: {lat: number | undefined, long: number | undefined, day: string | undefined | null}) {


    //States
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast | null>(null);

    //API call to fetch the hourly forecast for the given latitude, longitude, and day
    useEffect(() => {
        if (lat && long && day) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&start_date=${day}&end_date=${day}&timezone=auto`)
                .then(response => response.json())
                .then(data => setHourlyForecast(data.hourly))
                .catch(error => console.error('Error fetching hourly forecast:', error));
        }
    }, [lat, long, day]);

    //TODO: Do cards and fix title offset when not in desktop view

    return (
        <div className="container ms-auto me-auto mt-1">
            <h2 className="sm:text-sm lg:text-3xl font-bold">DailyForecast</h2>
        </div>
    )
}

export default DailyForecast