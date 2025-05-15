import { useState } from 'react';
import logo from '/images/logo_ia.svg'; // Utilisation du logo SVG

function Header({ onModelChange }) {
  const [currentModel, setCurrentModel] = useState('salary');
  
  const handleModelChange = (model) => {
    setCurrentModel(model);
    onModelChange(model);
  };
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo IA"
            className="h-10 w-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/vite.svg'; // Image de fallback si le logo n'existe pas
            }}
          />
          <h1 className="text-xl font-bold text-gray-900">IA Prédiction</h1>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => handleModelChange('salary')}
            className={`px-4 py-2 rounded-md ${
              currentModel === 'salary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Prédiction Salaire
          </button>
          <button
            onClick={() => handleModelChange('skills')}
            className={`px-4 py-2 rounded-md ${
              currentModel === 'skills'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
