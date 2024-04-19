import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/client/Login';
import Dashboard from './views/client/Dashboard';
import Mapas from './components/mapas';
import Humedad from './components/humedad';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calor" element={<Mapas />} />
          <Route path="/humedad" element={<Humedad />} />; 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
