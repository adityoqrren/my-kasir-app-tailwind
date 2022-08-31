
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './pages/Home';
import History from './pages/History';
import Pembayaran from './pages/Pembayaran';
import PembayaranSukses from './pages/PembayaranSukses';

function App() {

  return (
    <BrowserRouter>
      <Nav/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/history' element={<History/>}/>
          <Route path='/pembayaran' element={<Pembayaran/>}/>
          <Route path='/success' element={<PembayaranSukses/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
