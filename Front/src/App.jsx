import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SalaryPredictor from './components/SalaryPredictor'
import SkillsRecommender from './components/SkillsRecommender'

function App() {
  const [activeModel, setActiveModel] = useState('salary');

  const handleModelChange = (model) => {
    setActiveModel(model);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onModelChange={handleModelChange} />
      
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeModel === 'salary' ? (
            <SalaryPredictor />
          ) : (
            <SkillsRecommender />
          )}
        </div>
      </main>
      
      <footer className="bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} IA Prédiction | Projet ML
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App
