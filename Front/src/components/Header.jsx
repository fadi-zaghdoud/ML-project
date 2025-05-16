import { useState } from 'react';
import logo from '/images/logo.png'; // Utilisation du logo SVG

function Header({ onModelChange }) {
  const [currentModel, setCurrentModel] = useState('salary');
  
  const handleModelChange = (model) => {
    setCurrentModel(model);
    onModelChange(model);
  };
    return (
    <header className="bg-gradient-to-r from-indigo-700 to-blue-600 shadow-lg w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">          <div className="bg-white p-2 rounded-full shadow-md">
            <img
              src={logo}
              alt="AI Logo"
              className="h-12 w-auto" // Slightly increased logo size
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/vite.svg'; // Fallback image if logo doesn't exist
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-white">TuniHire</h1> {/* Increased title size */}
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => handleModelChange('salary')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ease-in-out transform hover:scale-105 ${
              currentModel === 'salary'
                ? 'bg-white text-indigo-700 shadow-lg'
                : 'bg-indigo-800 bg-opacity-40 text-white hover:bg-opacity-60'
            }`}
          >
            Salary Prediction
          </button>
          <button
            onClick={() => handleModelChange('candidates')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ease-in-out transform hover:scale-105 ${
              currentModel === 'candidates'
                ? 'bg-white text-indigo-700 shadow-lg'
                : 'bg-indigo-800 bg-opacity-40 text-white hover:bg-opacity-60'
            }`}
          >
            Candidate Recommender
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
