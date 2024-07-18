import { gerarRelatorio } from '../Model/calculation';

export function handleSubmit(respostas, navigate) {
  const resultados = Object.keys(respostas).map(key => {
    const perguntas = Object.keys(respostas[key]).map(perguntaKey => ({
      [perguntaKey]: respostas[key][perguntaKey]
    }));

    return {
      tema: `Tema ${parseInt(key) + 1}`,
      perguntas
    };
  });

  const relatorio = gerarRelatorio(resultados);

  // Redirecionar para a página de relatório com o relatório no estado
  navigate('/relatorio', { state: { relatorio } });
}

