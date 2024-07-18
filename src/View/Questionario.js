// src/Questionario.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../Model/data';
import { handleSubmit } from '../Controller/handleSubmit';


function Questionario() {
  const [respostas, setRespostas] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({ temaIndex: 0, perguntaIndex: 0 });
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (chat.length === 0) {
      const { temaIndex, perguntaIndex } = currentQuestion;
      const temaAtual = data[temaIndex];
      const perguntaAtual = temaAtual.perguntas[perguntaIndex];

      const novaMensagem = {
        tipo: 'pergunta',
        texto: perguntaAtual.pergunta
      };

      setChat([novaMensagem]);
    }
  }, [chat.length, currentQuestion]);

  const handleChange = (temaIndex, perguntaIndex, respostaTexto, valor) => {
    setRespostas(prevRespostas => ({
      ...prevRespostas,
      [temaIndex]: {
        ...prevRespostas[temaIndex],
        [perguntaIndex]: valor
      }
    }));

    const novaMensagemResposta = {
      tipo: 'resposta',
      texto: respostaTexto
    };

    setChat(prevChat => [...prevChat, novaMensagemResposta]);

    // Avança para a próxima pergunta
    if (perguntaIndex + 1 < data[temaIndex].perguntas.length) {
      setCurrentQuestion({ temaIndex, perguntaIndex: perguntaIndex + 1 });

      const novaMensagemPergunta = {
        tipo: 'pergunta',
        texto: data[temaIndex].perguntas[perguntaIndex + 1].pergunta
      };

      setChat(prevChat => [...prevChat, novaMensagemPergunta]);
    } else if (temaIndex + 1 < data.length) {
      setCurrentQuestion({ temaIndex: temaIndex + 1, perguntaIndex: 0 });

      const novaMensagemPergunta = {
        tipo: 'pergunta',
        texto: data[temaIndex + 1].perguntas[0].pergunta
      };

      setChat(prevChat => [...prevChat, novaMensagemPergunta]);
    } else {
      // Se todas as perguntas foram respondidas, submeter o formulário
      handleSubmit(respostas, navigate);
    }
  };

  const { temaIndex, perguntaIndex } = currentQuestion;
  const temaAtual = data[temaIndex];
  const perguntaAtual = temaAtual.perguntas[perguntaIndex];

  return (
    <div className="chat-container">
      {chat.map((mensagem, index) => (
        <div key={index} className={`mensagem ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      ))}
      <div className="mensagem pergunta">
        {perguntaAtual.respostas.map((resposta, respostaIndex) => (
          <button
            key={respostaIndex}
            onClick={() => handleChange(temaIndex, perguntaIndex, resposta.texto, resposta.valor)}
          >
            {resposta.texto}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questionario;
