// Media imports
import ukMap from './resources/uk.svg';
//Dependencies
import { useNavigate } from 'react-router-dom';

function Map() {

  const navigate = useNavigate();

  const cities = [
    { name: "London", top: "82%", left: "84.5%", id: "london" },
    { name: "Birmingham", top: "72%", left: "76%", id: "birmingham" },
    { name: "Manchester", top: "58.5%", left: "69.5%", id: "manchester" },
    { name: "Edinburgh", top: "47%", left: "64%", id: "edinburgh" },
    { name: "Belfast", top: "56%", left: "42%", id: "belfast" },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-lg mx-auto p-4">
      
      <div className="w-full text-slate-900 rounded-2xl p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">UK Summary</h1>
        
        {/* The Wrapper: Locked to exactly 3:5 aspect ratio */}
        <div className="relative w-full aspect-3/5 overflow-hidden rounded-xl">
          
          <img 
            src={ukMap}
            alt="UK Map" 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />

          {cities.map((city) => (
            <button
              onClick={() => navigate(`/view/${city.id}`)}
              key={city.id}
              style={{ top: city.top, left: city.left }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 
                         bg-white text-slate-900 font-bold whitespace-nowrap
                         text-[9px] xs:text-xs sm:text-sm 
                         px-1 py-0.5 xs:px-2 xs:py-1 rounded-md shadow-md 
                         hover:bg-amber-400 cursor-pointer
                         transition-all duration-200 focus:outline-none z-10"
            >
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                {city.name}
              </span>
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Map;