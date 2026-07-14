//Dependencies
import { Routes, Route } from 'react-router-dom';
//Components
import Header from './Header';
import Search from './Search';
import Map from './Map';
import Footer from './Footer';
import View from './View';


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      
      <div className='flex flex-col grow'>
        <Header />
        <Search />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/view/:city" element={<View />} />
        </Routes>
      </div>

      <Footer />
      
    </div>
  )
}

export default App
