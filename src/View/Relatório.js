import React from 'react';
import { useLocation } from 'react-router-dom';

function Relatorio() {
  const location = useLocation();
  const resultados = location.state?.resultados || [];

  // Função para definir a largura da barra de progresso
  const calcularLarguraBarra = (media) => {
    if (media >= 7.5) {
      return '100%'; // Let's Growth!
    } else if (media >= 5) {
      return '62%'; // Acelerando
    } else if (media >= 2.5) {
      return '31%'; // Abaixo
    } else {
      return '5%'; // Crítico
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-md">
        <h1 className="text-2xl font-bold text-gray-800">Relatório de Diagnóstico</h1>
        <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600">
          Compartilhe e ganhe prêmios
        </button>
      </header>

      <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resultados.map((tema, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">{tema.tema}</h2>
              <span
                className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${
                  tema.media >= 7.5
                    ? 'bg-blue-200 text-blue-800'
                    : tema.media >= 5
                    ? 'bg-green-200 text-green-800'
                    : tema.media >= 2.5
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {tema.media >= 7.5
                  ? "Let's Growth!"
                  : tema.media >= 5
                  ? 'Acelerando'
                  : tema.media >= 2.5
                  ? 'Abaixo'
                  : 'Crítico'}
              </span>
            </div>
            <p className="mt-4 text-gray-600">{tema.mensagem}</p>
            <div className="relative pt-4">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: calcularLarguraBarra(tema.media) }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    tema.media >= 7.5
                      ? 'bg-blue-500'
                      : tema.media >= 5
                      ? 'bg-green-500'
                      : tema.media >= 2.5
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Crítico</span>
                <span>Abaixo</span>
                <span>Acelerando</span>
                <span>Let's Growth!</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Relatorio;
