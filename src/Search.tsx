
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
    <>
    <div className="bg-blue-500 w-full p-4">
        <div className="grid grid-cols-12 max-w-xl mx-auto">
            <div className="col-span-9 bg-amber-500 border-8 rounded-full border-blue-500">
                <input 
                  className="w-full p-2 border-2 rounded-full border-black bg-transparent text-white text-sm md:text-1xl lg:text-1xl placeholder-white placeholder-opacity-100 outline-none text-center" 
                  type="search" 
                  placeholder="Search for a city..." 
                  onChange={(e) => searchCity(e.target.value)} onFocus={() => setTogglePreview(true)} onBlur={() => setTogglePreview(false)}
                />
            </div>
            <div className="col-span-3 bg-amber-500 border-8 rounded-full border-blue-500">
                <button /*onClick={() => searchCity(city)} onFocus={() => setTogglePreview(true)}*/ className="w-full p-2 text-white text-sm md:text-1xl lg:text-1xl border-2 rounded-full border-black hover:bg-blue-700 transition-colors duration-300 cursor-pointer flex justify-center items-center">
                  <img src={searchicon} alt="Search" className="max-h-5" />
                </button>
            </div>
        </div>
        {togglePreview && (
          <div className="bg-blue-500 w-full" onMouseDown={(e) => e.preventDefault()}>
            <div className="grid grid-cols-12 gap-8">
              <div className= "col-span-3 *:text-white text-sm md:text-1xl lg:text-2xl p-6 rounded"><h1>Search weather in...</h1></div>
              <div className= "col-span-9 text-white text-sm  p-6 rounded">
                {/** If results */}
                {(city.length > 0) && (
                  <ul>
                    {cityData.slice(0,5).map((c: City) => (
                      <li key={c?.id} className="cursor-pointer transition-colors hover:bg-blue-700 duration-300 p-2 rounded" >
                        <a className="block w-full h-full" href={`/view/${c?.id}`}><p className="text-white text-base md:text-1xl lg:text-1xl">{c?.name}</p></a>
                      </li>
                    ))}
                  </ul>
                )}
                {/** If no results */}
                {(city.length > 0) && cityData.length === 0 && (
                  <p className="text-white text-xl md:text-1xl lg:text-1xl">We couldn't find any results for "{city}".</p>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  </>
  )
}

export default Search