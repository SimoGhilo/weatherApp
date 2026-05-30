//Dependencies
import { useState } from 'react';
//Components
import Header from './Header';
import Search from './Search';
import Map from './Map';
import Footer from './Footer';


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      
      <div className='flex flex-col grow'>
        <Header />
        <Search />
        <Map />
      </div>

      <Footer />
      
    </div>
  )
}

export default App
