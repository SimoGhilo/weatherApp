//Dependencies
import { useEffect, useState } from "react";
//Types
import type { Metrics } from "./types";
//Media
import drop from "./resources/drop.png";
import sea from "./resources/sea.png";
import wind from "./resources/wind.png";

function Stats({ lat, long, day }: { lat: number | undefined; long: number | undefined; day: string | undefined }) {

    //States
    const [metrics, setMetrics] = useState<Metrics | null>(null);

    //Hooks
    //API call to fetch the metrics
    useEffect(() => {
        if (lat && long && day) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&start_date=${day}&end_date=${day}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,precipitation_probability_max,precipitation_sum&timezone=auto`)
                .then(response => response.json())
                .then(data => setMetrics({
                    wind_speed_10m_max: data.daily.wind_speed_10m_max,
                    precipitation_probability_max: data.daily.precipitation_probability_max,
                    precipitation_sum: data.daily.precipitation_sum
                }))
                .catch(error => console.error('Error fetching daily forecast:', error));
        }
    }, [lat, long, day]);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="sm:text-sm lg:text-3xl font-bold ms-10">Other Metrics for {day?.split('-').reverse().join('-')}</h2>
            <div className="flex flex-row items-center justify-start sm:justify-center w-[90%] ms-auto me-auto overflow-x-scroll">
                <div className="flex flex-row mt-4 gap-8 min-h-40 min-w-40">

                   <div className="flex flex-col items-center justify-center my-5 p-4 border border-gray-300 rounded-lg">
                        <img className="min-w-10 max-h-12 max-w-15 mb-2" src={wind}/>
                        <span className="sm:text-sm lg:text-xl whitespace-nowrap">Max Wind Speed: {metrics?.wind_speed_10m_max[0]} m/s</span>
                   </div>

                   <div className="flex flex-col items-center justify-center my-5 p-4 border border-gray-300 rounded-lg">
                        <img className="min-w-10 max-h-12 max-w-15 mb-2" src={drop}/>
                        <span className="sm:text-sm lg:text-xl whitespace-nowrap">Precipitation Probability: {metrics?.precipitation_probability_max} %</span>
                   </div>

                   <div className="flex flex-col items-center justify-center my-5 p-4 border border-gray-300 rounded-lg">
                        <img className="min-w-10 max-h-12 max-w-15 mb-2" src={sea}/>
                        <span className="sm:text-sm lg:text-xl whitespace-nowrap">Total Precipitation: {metrics?.precipitation_sum} mm</span>
                   </div>

                </div>
            </div>
        </div>
    )
}

export default Stats