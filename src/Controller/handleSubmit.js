// src/Controller/handleSubmit.js
import { gerarRelatorio } from '../Model/calculation';

export function handleSubmit(respostas, navigate) {
  const resultados = respostas.map((tema) => {
    const total = tema.respostas.reduce((soma, valor) => soma + valor, 0);
    const media = total / tema.respostas.length;

    return {
      tema: tema.tema,
      media: media
    };
  });

  const relatorio = gerarRelatorio(resultados);

  // Redirecionar para a página de relatório com os resultados no estado
  navigate('/relatorio', { state: { relatorio } });
}
