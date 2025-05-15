import { useState } from 'react';
import axios from 'axios';

function SalaryPredictor() {
  const [formData, setFormData] = useState({
    annees_experience: 0,
    projets_realises: 0,
    competences: '',
    langues: '',
    specialité: '',
    diplome: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'annees_experience' || name === 'projets_realises' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data.salaire_pred);
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue lors de la prédiction');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 md:p-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Prédicteur de Salaire IA</h2>
        <p className="mt-3 text-md text-gray-600">Entrez vos informations pour obtenir une estimation de salaire</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3">
          <div>
            <label htmlFor="annees_experience" className="block text-sm font-medium leading-6 text-gray-700">
              Années d'expérience
            </label>
            <input
              type="number"
              name="annees_experience"
              id="annees_experience"
              min="0"
              value={formData.annees_experience}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div>
            <label htmlFor="projets_realises" className="block text-sm font-medium leading-6 text-gray-700">
              Projets réalisés
            </label>
            <input
              type="number"
              name="projets_realises"
              id="projets_realises"
              min="0"
              value={formData.projets_realises}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          
          <div>
            <label htmlFor="diplome" className="block text-sm font-medium leading-6 text-gray-700">
              Diplôme
            </label>
            <input
              type="text"
              name="diplome"
              id="diplome"
              value={formData.diplome}
              onChange={handleChange}
              placeholder="Master, Licence, BTS"
              className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
          <div>
            <label htmlFor="competences" className="block text-sm font-medium leading-6 text-gray-700">
              Compétences (séparées par des virgules)
            </label>
            <textarea
              name="competences"
              id="competences"
              rows={3}
              value={formData.competences}
              onChange={handleChange}
              placeholder="Python, Machine Learning, Data Science"
              className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="langues" className="block text-sm font-medium leading-6 text-gray-700">
              Langues parlées (séparées par des virgules)
            </label>
            <textarea
              name="langues"
              id="langues"
              rows={3}
              value={formData.langues}
              onChange={handleChange}
              placeholder="Français, Anglais, Espagnol"
              className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="specialité" className="block text-sm font-medium leading-6 text-gray-700">
            Spécialité
          </label>
          <input
            type="text"
            name="specialité"
            id="specialité"
            value={formData.specialité}
            onChange={handleChange}
            placeholder="Développement web, IA, Cybersécurité"
            className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out"
            required
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Chargement...' : 'Prédire le salaire'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow">
          <p className="font-medium">Erreur de prédiction</p>
          <p>{error}</p>
        </div>
      )}

      {result !== null && !error && (
        <div className="mt-8 bg-green-50 p-8 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-gray-800">Salaire Annuel Estimé</h3>
          <p className="mt-4 text-5xl font-bold text-green-600">{result.toLocaleString('fr-FR')} €</p>
          <p className="mt-4 text-md text-gray-600">Cette estimation est basée sur les informations que vous avez fournies.</p>
        </div>
      )}
    </div>
  );
}

export default SalaryPredictor;
