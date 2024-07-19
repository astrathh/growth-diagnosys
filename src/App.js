import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questionario from './View/Questionario';
import Relatorio from './View/Relatório';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Questionario />} />
        <Route path="/relatorio" element={<Relatorio />} />
      </Routes>
    </Router>
  );
}

export default App;
