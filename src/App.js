import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questionario from './View/Questionario';
import Relatorio from './View/Relatório';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Questionario} />
        <Route path="/relatorio" component={Relatorio} />
      </Routes>
    </Router>
  );
}

export default App;
