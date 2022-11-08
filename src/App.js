
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './pages/Home';
import History from './pages/History';
import PaymentSuccess from './pages/PaymentSuccess';
import Payment from './pages/Payment';

function App() {

  return (
    <BrowserRouter>
      <Nav/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/history' element={<History/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/success' element={<PaymentSuccess/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
