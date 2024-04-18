import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/client/Login';
import Dashboard from './views/client/Dashboard';
import './App.css';
import WeatherDataReceiver from './components/notificaciones';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <div>
      <WeatherDataReceiver />
    </div>
    </Router>
  );
}

export default App;
