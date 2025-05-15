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
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Prédicteur de Salaire IA</h2>
          <p className="mt-2 text-sm text-gray-600">Entrez vos informations pour obtenir une estimation de salaire</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="annees_experience" className="block text-sm font-medium text-gray-700">
                Années d'expérience
              </label>
              <input
                type="number"
                name="annees_experience"
                id="annees_experience"
                min="0"
                value={formData.annees_experience}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="projets_realises" className="block text-sm font-medium text-gray-700">
                Projets réalisés
              </label>
              <input
                type="number"
                name="projets_realises"
                id="projets_realises"
                min="0"
                value={formData.projets_realises}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="competences" className="block text-sm font-medium text-gray-700">
              Compétences (séparées par des virgules)
            </label>
            <input
              type="text"
              name="competences"
              id="competences"
              value={formData.competences}
              onChange={handleChange}
              placeholder="Python, Machine Learning, Data Science"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="langues" className="block text-sm font-medium text-gray-700">
              Langues parlées (séparées par des virgules)
            </label>
            <input
              type="text"
              name="langues"
              id="langues"
              value={formData.langues}
              onChange={handleChange}
              placeholder="Français, Anglais, Espagnol"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="specialité" className="block text-sm font-medium text-gray-700">
              Spécialité
            </label>
            <input
              type="text"
              name="specialité"
              id="specialité"
              value={formData.specialité}
              onChange={handleChange}
              placeholder="Développement web, IA, Cybersécurité"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="diplome" className="block text-sm font-medium text-gray-700">
              Diplôme
            </label>
            <input
              type="text"
              name="diplome"
              id="diplome"
              value={formData.diplome}
              onChange={handleChange}
              placeholder="Master, Licence, BTS"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Chargement...' : 'Prédire le salaire'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 p-4 rounded-md">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {result !== null && !error && (
          <div className="mt-6 bg-green-50 p-6 rounded-md">
            <h2 className="text-xl font-semibold text-center text-gray-900">Salaire estimé</h2>
            <p className="mt-2 text-3xl font-bold text-center text-green-600">{result.toLocaleString('fr-FR')} €</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalaryPredictor;
