export function calcularMediaTema(tema) {
    let soma = 0;
    tema.perguntas.forEach(pergunta => {
      soma += pergunta.respostaSelecionada.valor;
    });
    return soma / tema.perguntas.length;
  }
  
  export function gerarRelatorio(resultados) {
    return resultados.map(tema => ({
      tema: tema.tema,
      media: calcularMediaTema(tema)
    }));
  }
  