//Dependencies
import ukMap from './resources/uk.svg';

function Map() {
  const cities = [
    { name: "London", top: "78%", left: "75%", id: "london" },
    { name: "Birmingham", top: "65%", left: "60%", id: "birmingham" },
    { name: "Manchester", top: "52%", left: "58%", id: "manchester" },
    { name: "Newcastle", top: "38%", left: "65%", id: "newcastle" },
    { name: "Edinburgh", top: "22%", left: "50%", id: "edinburgh" },
    { name: "Belfast", top: "40%", left: "25%", id: "belfast" },
  ];

  return (

    <div className='flex flex-col justify-center items-center'>
      
      <div className="w-full bg-blue-100 shadow-2xl text-slate-900 transition-all max-h-[70vh] overflow-hidden">
        <h2 className="text-xl font-bold mb-4 text-center my-5">UK Summary</h2>
        
        <div className="relative w-full overflow-hidden border-slate-700 rounded-lg bg-slate-450 max-h-[70vh]">
          
          <img 
            src={ukMap}
            alt="Map Background" 
            className="w-full h-auto object-contain block mx-auto opacity-80 max-h-[60vh]"
          />

          {cities.map((city) => (
            <button
              key={city.id}
              style={{ top: city.top, left: city.left }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 
                         bg-white text-slate-900 font-semibold text-xs md:text-sm 
                         px-2 py-1 rounded shadow-md hover:bg-amber-400 cursor-pointer
                         transition-colors duration-200 focus:outline-none z-10"
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