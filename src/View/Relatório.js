import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Relatorio.css';

function Relatorio() {
  const location = useLocation();
  const relatorio = location.state.relatorio;

  const getCircleClassAndMessage = (media) => {
    if (media < 3) return { class: "circle low", message: "Mensagem para média baixa" };
    if (media >= 3 && media < 7) return { class: "circle medium", message: "Mensagem para média média" };
    return { class: "circle high", message: "Mensagem para média alta" };
  };

  return (
    <div className="report">
      <h1>Relatório do Diagnóstico</h1>
      {relatorio.map((tema, index) => (
        <div key={index} className="tema">
          <h2>{tema.tema}</h2>
          <p className="message">{getCircleClassAndMessage(tema.media).message}</p>
          <div className={getCircleClassAndMessage(tema.media).class}>
            {tema.media.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Relatorio;
