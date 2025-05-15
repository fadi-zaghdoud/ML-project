import { useState } from 'react';
import axios from 'axios';

function SkillsRecommender() {
  const [formData, setFormData] = useState({
    current_skills: '',
    target_job: '',
    experience_level: 'junior'
  });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Cette route n'existe pas encore, nous simulons une réponse
      // Vous devrez implémenter cette route dans votre backend
      // const response = await axios.post('http://localhost:5000/recommend_skills', formData);
      // setRecommendations(response.data.recommendations);
      
      // Simulation d'une réponse pour la démonstration
      setTimeout(() => {
        const mockRecommendations = {
          essential_skills: ['Python', 'SQL', 'Machine Learning', 'Deep Learning'],
          advanced_skills: ['TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
          tools: ['Jupyter', 'Git', 'Docker', 'AWS/Azure']
        };
        setRecommendations(mockRecommendations);
        setLoading(false);
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue lors de la recommandation');
      console.error('Error:', err);
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommandation de Compétences</h2>
          <p className="mt-2 text-sm text-gray-600">Découvrez les compétences à acquérir pour votre carrière</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="current_skills" className="block text-sm font-medium text-gray-700">
                Compétences actuelles (séparées par des virgules)
              </label>
              <textarea
                name="current_skills"
                id="current_skills"
                rows={3}
                value={formData.current_skills}
                onChange={handleChange}
                placeholder="Python, JavaScript, HTML/CSS..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="target_job" className="block text-sm font-medium text-gray-700">
                Poste visé
              </label>
              <input
                type="text"
                name="target_job"
                id="target_job"
                value={formData.target_job}
                onChange={handleChange}
                placeholder="Data Scientist, Développeur Full Stack, DevOps..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700">
                Niveau d'expérience
              </label>
              <select
                name="experience_level"
                id="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="junior">Junior (0-2 ans)</option>
                <option value="intermediate">Intermédiaire (3-5 ans)</option>
                <option value="senior">Senior (5+ ans)</option>
              </select>
            </div>
          </div>          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Chargement...' : 'Obtenir des recommandations'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 p-4 rounded-md">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}        {recommendations && !error && (
          <div className="mt-8 bg-blue-50 p-8 rounded-md">
            <h2 className="text-2xl font-semibold text-center text-gray-900">Recommandations de compétences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-medium text-blue-800 text-lg mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Compétences essentielles
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recommendations.essential_skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-medium text-purple-800 text-lg mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Compétences avancées
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recommendations.advanced_skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-md text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-medium text-green-800 text-lg mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Outils recommandés
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recommendations.tools.map((tool, index) => (
                    <span key={index} className="px-3 py-1.5 bg-green-100 text-green-800 rounded-md text-sm font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillsRecommender;
