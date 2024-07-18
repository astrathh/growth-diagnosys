export function calcularMediaTema(tema) {
  if (!Array.isArray(tema.perguntas)) {
    console.error('Erro: tema.perguntas não é um array', tema.perguntas);
    return 0;
  }

  const total = tema.perguntas.reduce((soma, pergunta) => {
    const valores = Object.values(pergunta);
    const mediaPergunta = valores.reduce((somaValor, valor) => somaValor + valor, 0) / valores.length;
    return soma + mediaPergunta;
  }, 0);

  return total / tema.perguntas.length;
}

export function gerarRelatorio(resultados) {
  const relatorio = resultados.map(tema => {
    return {
      tema: tema.tema,
      media: calcularMediaTema(tema)
    };
  });

  return relatorio;
}
