import { gerarRelatorio } from '../Model/calculation';

export function handleSubmit(event, respostas) {
  event.preventDefault();
  const resultados = Object.keys(respostas).map(key => {
    const tema = respostas[key];
    return {
      tema: `Tema ${parseInt(key) + 1}`,
      perguntas: tema
    };
  });
  const relatorio = gerarRelatorio(resultados);
  console.log(relatorio);
  // Adicione lógica para exibir o relatório ao usuário
}
