import { calcularMediaTema } from '../Model/calculation';
import { gerarRelatorio } from '../Model/calculation';

export function handleSubmit(respostas, navigate) {
  // Calcular médias
  const medias = calcularMediaTema(respostas);

  // Gerar relatório com mensagens
  const relatorio = gerarRelatorio(medias);

  // Redirecionar para a página de relatório com os dados
  navigate('/relatorio', { state: { resultados: relatorio } });
}

