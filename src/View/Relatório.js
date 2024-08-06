// src/Relatorio.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Relatorio.css';

function Relatorio() {
  const location = useLocation();
  const relatorio = location.state.relatorio;

  return (
    <div className="report">
      <h1>Relatório do Diagnóstico</h1>
      {relatorio.map((tema, index) => (
        <div key={index} className="tema">
          <h2>{tema.tema}</h2>
          <p>{tema.mensagem}</p>
          <div className="circle" style={{ backgroundColor: tema.media >= 7 ? 'green' : tema.media >= 5 ? 'orange' : 'red' }}>
            {tema.media.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Relatorio;
