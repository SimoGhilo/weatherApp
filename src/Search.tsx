
//Dependencies
import { useEffect, useState } from "react";

//Imports 
import ukCityData from "./coords.ts";

//types
import type { City } from "./types.js";

//Media
import searchicon from './resources/magnifying-glasss.png';

function Search() {

  //States
  const[city, setCity] = useState<string>("");
  const[cityData, setCityData] = useState<City[]>([]);
  const[togglePreview, setTogglePreview] = useState<boolean>(false);

  //Hooks
    useEffect(() => {
        if(city) {
        const cityData : City [] = ukCityData.filter((c: City) => c?.id.toLowerCase().includes(city));
        setCityData(cityData);
        }
    }, [city]);



  //Handlers
  function searchCity(city: string): void {
    if((/^[a-zA-Z\s]+$/).test(city)) {
        setCity(city.toLowerCase());
    }
  }
  
return (
    <div className="bg-blue-600 w-full pb-8 pt-2 px-4 shadow-inner">
      <div className="relative max-w-xl mx-auto">
        
        {/* Unified Search Input Container */}
        <div className="relative flex items-center w-full bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg focus-within:ring-2 focus-within:ring-white/50 transition-all">
          <input
            className="w-full py-3 pl-6 pr-12 bg-transparent text-white placeholder-blue-100 text-sm md:text-base outline-none rounded-full"
            type="search"
            placeholder="Search for a UK city..."
            value={city}
            onChange={(e) => searchCity(e.target.value)}
            onFocus={() => setTogglePreview(true)}
            onBlur={() => setTogglePreview(false)}
          />
          <button 
            type="button"
            className="absolute right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors cursor-pointer"
          >
            <img src={searchicon} alt="Search" className="w-5 h-5 filter brightness-0 invert" />
          </button>
        </div>

        {togglePreview && city.length > 0 && (
          <div 
            className="absolute top-full left-0 right-0 mt-2 bg-blue-700/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 p-2"
            onMouseDown={(e) => e.preventDefault()}
          >
            {cityData.length > 0 ? (
              <ul className="divide-y divide-white/10">
                {cityData.slice(0, 5).map((c: City) => (
                  <li key={c?.id}>
                    <a
                      className="block px-4 py-3 text-white text-sm md:text-base hover:bg-white/10 rounded-xl transition-colors"
                      href={`/view/${c?.id}`}
                    >
                      📍 {c?.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-blue-100 text-sm text-center">
                We couldn't find any results for "{city}".
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Search