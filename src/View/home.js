import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/anim.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleStartDiagnosis = () => {
    navigate('/diagnosys');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Growth Diagnosys</h1>
        <p className="text-xl">Descubra insights valiosos para alavancar seu negócio!</p>
      </header>

      <div className="flex justify-center items-center">
        <button
          onClick={handleStartDiagnosis}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110">
          Iniciar Diagnóstico
        </button>
      </div>

      <footer className="absolute bottom-4 text-center">
        <p>&copy; 2024 Growth Agency. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
