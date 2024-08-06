// src/Model/calculation.js
export function gerarRelatorio(resultados) {
  return resultados.map((resultado) => {
    const { tema, media } = resultado;
    let mensagem = '';

    if (media < 5) {
      mensagem = 'Mensagem para média baixa';
    } else if (media >= 5 && media < 7) {
      mensagem = 'Mensagem para média média';
    } else {
      mensagem = 'Mensagem para média alta';
    }

    return {
      tema,
      media,
      mensagem
    };
  });
}
