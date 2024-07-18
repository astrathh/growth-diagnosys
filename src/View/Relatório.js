import React from 'react';
import { useLocation } from 'react-router-dom';

function Relatorio() {
  const location = useLocation();
  const relatorio = location.state.relatorio;

  return (
    <div>
      <h1>Relatório do Diagnóstico</h1>
      {relatorio.map((tema, index) => (
        <div key={index}>
          <h2>{tema.tema}</h2>
          <p>Média: {tema.media.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default Relatorio;
