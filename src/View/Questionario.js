import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../Model/data';
import { handleSubmit } from '../Controller/handleSubmit';
import logo from './assets/Captura de tela 2024-08-06 180311.png'; // Certifique-se de ter o caminho correto para a logo

function Questionario() {
  const [respostas, setRespostas] = useState([]);
  const [userData, setUserData] = useState({
    nome: '',
    empresa: '',
    funcionarios: '',
    email: ''
  });
  const [currentStep, setCurrentStep] = useState('coletaDados');
  const [currentQuestion, setCurrentQuestion] = useState({ temaIndex: 0, perguntaIndex: 0 });
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    iniciarChat();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const iniciarChat = () => {
    setChat([{ tipo: 'pergunta', texto: 'Qual é o seu nome?' }]);
  };

  const handleUserDataChange = (field, value) => {
    if (!value.trim()) return; // Não permite valores vazios

    setUserData((prevData) => ({
      ...prevData,
      [field]: value
    }));

    avancarColetaDados(field, value);
  };

  const avancarColetaDados = (field, value) => {
    let novaPergunta = '';

    if (field === 'nome') {
      novaPergunta = 'Qual é o nome da empresa em que você trabalha?';
    } else if (field === 'empresa') {
      novaPergunta = 'Quantos funcionários tem a empresa?';
    } else if (field === 'funcionarios') {
      novaPergunta = 'Qual é o seu e-mail?';
    } else if (field === 'email') {
      setCurrentStep('introducao');
      setChat((prevChat) => [
        ...prevChat,
        { tipo: 'resposta', texto: value },
        { tipo: 'info', texto: 'Obrigado! Reserve entre 7-10 minutos para fazer o questionário com calma. Vamos começar!' }
      ]);
      return; // Não adiciona nova pergunta, apenas mostra a mensagem de introdução
    }

    if (novaPergunta) {
      setChat((prevChat) => [
        ...prevChat,
        { tipo: 'resposta', texto: value },
        { tipo: 'pergunta', texto: novaPergunta }
      ]);
    }
  };

  const handleTextInputKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      handleUserDataChange(field, e.target.value);
      e.target.value = ''; // Limpa o campo após enviar
    }
  };

  const handleChange = (temaIndex, perguntaIndex, respostaTexto, valor) => {
    setRespostas((prevRespostas) => {
      const novasRespostas = [...prevRespostas];
      if (!novasRespostas[temaIndex]) {
        novasRespostas[temaIndex] = {
          tema: data[temaIndex].tema,
          respostas: []
        };
      }
      novasRespostas[temaIndex].respostas[perguntaIndex] = valor;
      return novasRespostas;
    });

    setChat((prevChat) => [...prevChat, { tipo: 'resposta', texto: respostaTexto }]);
    avancarParaProximaPergunta(temaIndex, perguntaIndex);
  };

  const avancarParaProximaPergunta = (temaIndex, perguntaIndex) => {
    if (perguntaIndex + 1 < data[temaIndex].perguntas.length) {
      setCurrentQuestion({ temaIndex, perguntaIndex: perguntaIndex + 1 });
      setChat((prevChat) => [
        ...prevChat,
        { tipo: 'pergunta', texto: data[temaIndex].perguntas[perguntaIndex + 1].pergunta }
      ]);
    } else if (temaIndex + 1 < data.length) {
      setCurrentQuestion({ temaIndex: temaIndex + 1, perguntaIndex: 0 });
      setChat((prevChat) => [
        ...prevChat,
        { tipo: 'pergunta', texto: data[temaIndex + 1].perguntas[0].pergunta }
      ]);
    } else {
      enviarDadosParaWebhook();
      handleSubmit(respostas, navigate);
    }
  };

  const handleTextInputChange = (e) => {
    const { value } = e.target;
    const { temaIndex, perguntaIndex } = currentQuestion;
    handleChange(temaIndex, perguntaIndex, value, value);
  };

  const enviarDadosParaWebhook = async () => {
    const dadosParaEnviar = {
      ...userData,
      respostas: respostas
    };

    try {
      const response = await fetch('URL VEM AQUI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso para o webhook!');
      } else {
        console.error('Erro ao enviar dados para o webhook');
      }
    } catch (error) {
      console.error('Erro na requisição ao webhook', error);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="w-full bg-white flex items-center p-4 shadow-md">
        <img src={logo} alt="Logo da Empresa" className="h-12 ml-2" />
      </div>

      {/* Chat Container */}
      <div className="p-5 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg mt-4">
        <div className="space-y-4 p-4 h-96 overflow-y-auto">
          {chat.map((mensagem, index) => (
            <div
              key={index}
              className={`flex ${mensagem.tipo === 'pergunta' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`p-4 max-w-sm rounded-lg shadow ${mensagem.tipo === 'pergunta' ? 'bg-blue-100' : mensagem.tipo === 'info' ? 'bg-yellow-100' : 'bg-green-200'
                  }`}
              >
                {mensagem.texto}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {currentStep === 'coletaDados' && (
          <div className="flex flex-col items-start space-y-2 p-4">
            {chat[chat.length - 1]?.texto.includes('nome') && !userData.nome && (
              <input
                type="text"
                placeholder="Digite seu nome..."
                onKeyPress={(e) => handleTextInputKeyPress(e, 'nome')}
                className="border border-gray-300 rounded py-2 px-4 w-full"
              />
            )}
            {chat[chat.length - 1]?.texto.includes('empresa') && !userData.empresa && (
              <input
                type="text"
                placeholder="Digite o nome da empresa..."
                onKeyPress={(e) => handleTextInputKeyPress(e, 'empresa')}
                className="border border-gray-300 rounded py-2 px-4 w-full"
              />
            )}
            {chat[chat.length - 1]?.texto.includes('funcionários') && !userData.funcionarios && (
              <input
                type="text"
                placeholder="Digite a quantidade de funcionários..."
                onKeyPress={(e) => handleTextInputKeyPress(e, 'funcionarios')}
                className="border border-gray-300 rounded py-2 px-4 w-full"
              />
            )}
            {chat[chat.length - 1]?.texto.includes('e-mail') && !userData.email && (
              <input
                type="email"
                placeholder="Digite seu e-mail..."
                onKeyPress={(e) => handleTextInputKeyPress(e, 'email')}
                className="border border-gray-300 rounded py-2 px-4 w-full"
              />
            )}
          </div>
        )}
        {currentStep === 'introducao' && (
          <div className="flex justify-center p-4">
            <button
              onClick={() => {
                setCurrentStep('questionario');
                setCurrentQuestion({ temaIndex: 0, perguntaIndex: 0 }); // Reiniciar o contador de perguntas
                setChat((prevChat) => [
                  ...prevChat,
                  { tipo: 'pergunta', texto: data[0].perguntas[0].pergunta } // Iniciar com a primeira pergunta do questionário
                ]);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Iniciar Questionário
            </button>
          </div>
        )}
        {currentStep === 'questionario' && (
          <div className="flex flex-col items-start space-y-2 p-4">
            {data[currentQuestion.temaIndex].perguntas[currentQuestion.perguntaIndex].respostas.map(
              (resposta, respostaIndex) => (
                <button
                  key={respostaIndex}
                  onClick={() =>
                    handleChange(
                      currentQuestion.temaIndex,
                      currentQuestion.perguntaIndex,
                      resposta.texto,
                      resposta.valor
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  {resposta.texto}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Questionario;
