import { useState } from 'react';
import logo from '/images/logo_ia.svg'; // Utilisation du logo SVG

function Header({ onModelChange }) {
  const [currentModel, setCurrentModel] = useState('salary');
  
  const handleModelChange = (model) => {
    setCurrentModel(model);
    onModelChange(model);
  };
    return (
    <header className="bg-gradient-to-r from-indigo-700 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="bg-white p-2 rounded-full shadow-md">
            <img
              src={logo}
              alt="Logo IA"
              className="h-10 w-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/vite.svg'; // Image de fallback si le logo n'existe pas
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-white">IA Prédiction</h1>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => handleModelChange('salary')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              currentModel === 'salary'
                ? 'bg-white text-indigo-700 shadow-md'
                : 'bg-indigo-800 bg-opacity-30 text-white hover:bg-indigo-800 hover:bg-opacity-50'
            }`}
          >
            Prédiction Salaire
          </button>
          <button
            onClick={() => handleModelChange('skills')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              currentModel === 'skills'
                ? 'bg-white text-indigo-700 shadow-md'
                : 'bg-indigo-800 bg-opacity-30 text-white hover:bg-indigo-800 hover:bg-opacity-50'
            }`}
          >
            Recommandation Compétences
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
