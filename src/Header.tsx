//Dependencies



function Header() {
    return (
    <div className="w-screen bg-blue-500 p-4">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white">Weather App</h1>
        <span className="text-2xl md:text-4xl lg:text-6xl">☀️</span>
      </div>
    </div>
    )
}

export default Header;