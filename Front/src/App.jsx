import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SalaryPredictor from './components/SalaryPredictor'
import CandidateRecommender from './components/CandidateRecommender'

function App() {
  const [activeModel, setActiveModel] = useState('salary');

  const handleModelChange = (model) => {
    setActiveModel(model);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header onModelChange={handleModelChange} />
      
      <main className="flex-grow w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">          {activeModel === 'salary' && <SalaryPredictor />}
          {activeModel === 'candidates' && <CandidateRecommender />}
        </div>
      </main>      <footer className="w-full bg-white py-6 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} IA Prédiction | Projet ML
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App
