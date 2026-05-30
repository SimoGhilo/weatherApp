
//Depnedencies

function Search() {
  return (
// Outer wrapper keeps the amber background full width
    <div className="bg-blue-500 w-full p-4">
        {/* This wrapper limits the total width of the search bar and centers it */}
        <div className="grid grid-cols-12 max-w-xl mx-auto">
            <div className="col-span-9 bg-amber-500 border-8 rounded-full border-blue-500">
                <input 
                  className="w-full p-2 border-2 rounded-full border-black bg-transparent text-white text-sm md:text-1xl lg:text-1xl placeholder-white placeholder-opacity-100 outline-none text-center" 
                  type="search" 
                  placeholder="Search for a city..." 
                />
            </div>
            <div className="col-span-3 bg-amber-500 border-8 rounded-full border-blue-500">
                <button className="w-full p-2 text-white text-sm md:text-1xl lg:text-1xl border-2 rounded-full border-black hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                  Search
                </button>
            </div>
        </div>
    </div>
  )
}

export default Search