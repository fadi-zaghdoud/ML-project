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
      // Simulation d'une réponse pour la démonstration
      setTimeout(() => {
        const mockRecommendations = {
          essential_skills: ['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'Data Analysis', 'Statistics'],
          advanced_skills: ['TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'Reinforcement Learning', 'Big Data Technologies (Spark, Hadoop)'],
          tools: ['Jupyter', 'Git & GitHub', 'Docker', 'Kubernetes', 'AWS/Azure/GCP', 'Tableau/PowerBI']
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 md:p-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Recommandation de Compétences IA</h2>
        <p className="mt-3 text-md text-gray-600">Découvrez les compétences clés pour atteindre vos objectifs de carrière.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="current_skills" className="block text-sm font-medium leading-6 text-gray-700">
              Compétences actuelles (séparées par des virgules)
            </label>
            <textarea
              name="current_skills"
              id="current_skills"
              rows={3}
              value={formData.current_skills}
              onChange={handleChange}
              placeholder="Python, JavaScript, HTML/CSS..."
              className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="target_job" className="block text-sm font-medium leading-6 text-gray-700">
              Poste visé
            </label>
            <input
              type="text"
              name="target_job"
              id="target_job"
              value={formData.target_job}
              onChange={handleChange}
              placeholder="Data Scientist, Développeur Full Stack..."
              className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="experience_level" className="block text-sm font-medium leading-6 text-gray-700">
              Niveau d'expérience actuel
            </label>
            <select
              name="experience_level"
              id="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out bg-white"
            >
              <option value="junior">Junior (0-2 ans)</option>
              <option value="intermediate">Intermédiaire (3-5 ans)</option>
              <option value="senior">Senior (5+ ans)</option>
            </select>
          </div>
        </div>
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Chargement...' : 'Obtenir des recommandations'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow">
          <p className="font-medium">Erreur de recommandation</p>
          <p>{error}</p>
        </div>
      )}

      {recommendations && !error && (
        <div className="mt-10 bg-indigo-50 p-6 sm:p-8 rounded-lg shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">Vos Compétences Recommandées</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              title: 'Compétences Essentielles',
              skills: recommendations.essential_skills,
              iconColor: 'text-blue-600',
              bgColor: 'bg-blue-100',
              textColor: 'text-blue-800',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            }, {
              title: 'Compétences Avancées',
              skills: recommendations.advanced_skills,
              iconColor: 'text-purple-600',
              bgColor: 'bg-purple-100',
              textColor: 'text-purple-800',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            }, {
              title: 'Outils à Maîtriser',
              skills: recommendations.tools,
              iconColor: 'text-green-600',
              bgColor: 'bg-green-100',
              textColor: 'text-green-800',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            }].map((category, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className={`font-semibold ${category.iconColor} text-xl mb-4 flex items-center`}>
                  {category.icon}
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, index) => (
                    <span key={index} className={`px-3.5 py-1.5 ${category.bgColor} ${category.textColor} rounded-full text-sm font-medium shadow-sm`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsRecommender;
