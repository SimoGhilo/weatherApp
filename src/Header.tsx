//Dependencies



function Header() {
return (
    <header className="w-full bg-blue-600 shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">☀️</span>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            Weather App
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;