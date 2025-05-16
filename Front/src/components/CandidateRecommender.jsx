import { useState } from 'react';
import axios from 'axios';

// In Vite, environment variables are exposed on import.meta.env, not process.env
const apiUrl = 'http://localhost:5000' || import.meta.env.VITE_PUBLIC_API_URL ;

function CandidateRecommender() {
  const [offerData, setOfferData] = useState({
    specialité: '',
    competences: '',
    annees_experience: 3,
    projets_realises: 4
  });
  
  const [candidateData, setCandidateData] = useState({
    specialité: '',
    competences: '',
    annees_experience: 0,
    projets_realises: 0
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setOfferData({
      ...offerData,
      [name]: name === 'annees_experience' || name === 'projets_realises' ? parseInt(value) || 0 : value
    });
  };
  
  const handleCandidateChange = (e) => {
    const { name, value } = e.target;
    setCandidateData({
      ...candidateData,
      [name]: name === 'annees_experience' || name === 'projets_realises' ? parseInt(value) || 0 : value
    });
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Send both candidate and offer data
      const requestData = {
        candidat: candidateData,
        offre: offerData
      };
      
      const response = await axios.post(`${apiUrl}/evaluate_candidate`, requestData);
      setResult(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during candidate evaluation');
      console.error('Error:', err);
      setLoading(false);
      
      // Fallback to mock data if API is not available
      if (!err.response) {
        setTimeout(() => {
          const mockResult = {
            points_forts: "Expérience, Projets réalisés",
            points_faibles: "Compétences",
            score: 78.5,
            recommende: true
          };
          setResult(mockResult);
          setLoading(false);
          setError("API connection failed. Showing sample data.");
        }, 1000);
      }
    }
  };
    return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 md:p-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">AI Candidate Evaluator</h2>
        <p className="mt-3 text-md text-gray-600">Evaluate a candidate against a job offer</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Job Offer Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Offer Details</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <div>
              <label htmlFor="offer_specialité" className="block text-sm font-medium leading-6 text-gray-700">
                Job Specialization
              </label>
              <input
                type="text"
                name="specialité"
                id="offer_specialité"
                value={offerData.specialité}
                onChange={handleOfferChange}
                placeholder="Data Science, Web Development, etc."
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="offer_competences" className="block text-sm font-medium leading-6 text-gray-700">
                Required Skills (separated by commas)
              </label>
              <textarea
                name="competences"
                id="offer_competences"
                rows={2}
                value={offerData.competences}
                onChange={handleOfferChange}
                placeholder="Python, Machine Learning, SQL..."
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="offer_annees_experience" className="block text-sm font-medium leading-6 text-gray-700">
                Years of Experience Required
              </label>
              <input
                type="number"
                name="annees_experience"
                id="offer_annees_experience"
                min="0"
                max="15"
                value={offerData.annees_experience}
                onChange={handleOfferChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="offer_projets_realises" className="block text-sm font-medium leading-6 text-gray-700">
                Projects Required
              </label>
              <input
                type="number"
                name="projets_realises"
                id="offer_projets_realises"
                min="0"
                step="1"
                value={offerData.projets_realises}
                onChange={handleOfferChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Candidate Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Candidate Information</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <div>
              <label htmlFor="candidate_specialité" className="block text-sm font-medium leading-6 text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                name="specialité"
                id="candidate_specialité"
                value={candidateData.specialité}
                onChange={handleCandidateChange}
                placeholder="Data Science, Web Development, etc."
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="candidate_competences" className="block text-sm font-medium leading-6 text-gray-700">
                Skills (separated by commas)
              </label>
              <textarea
                name="competences"
                id="candidate_competences"
                rows={2}
                value={candidateData.competences}
                onChange={handleCandidateChange}
                placeholder="Python, Machine Learning, SQL..."
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="candidate_annees_experience" className="block text-sm font-medium leading-6 text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                name="annees_experience"
                id="candidate_annees_experience"
                min="0"
                max="15"
                value={candidateData.annees_experience}
                onChange={handleCandidateChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="candidate_projets_realises" className="block text-sm font-medium leading-6 text-gray-700">
                Projects Completed
              </label>
              <input
                type="number"
                name="projets_realises"
                id="candidate_projets_realises"
                min="0"
                step="1"
                value={candidateData.projets_realises}
                onChange={handleCandidateChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition duration-150 ease-in-out text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 disabled:opacity-70"
          >
            {loading ? 'Evaluating Candidate...' : 'Evaluate Candidate'}
          </button>
        </div>
      </form>      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="mt-2 text-sm text-gray-600">Evaluating candidate...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Evaluation Results</h3>
          
          <div className="bg-gray-50 rounded-lg p-5 border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Candidate Evaluation</h4>
              <div className={`py-1 px-3 rounded-full text-sm font-bold ${
                result.score >= 70 
                  ? 'bg-green-100 text-green-800' 
                  : result.score >= 50 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
              }`}>
                {result.score}% Match
              </div>
            </div>
            
            <div className="space-y-4">
              {result.points_forts && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm font-medium text-green-700 mb-1">Points forts</p>
                  <p className="text-sm text-green-900">{result.points_forts}</p>
                </div>
              )}
              
              {result.points_faibles && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-sm font-medium text-red-700 mb-1">Points faibles</p>
                  <p className="text-sm text-red-900">{result.points_faibles}</p>
                </div>
              )}
              
              <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-1">Recommendation</p>
                <p className={`text-sm font-semibold ${result.recommende ? 'text-green-600' : 'text-red-600'}`}>
                  {result.recommende ? 'Recommandé' : 'Non recommandé'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateRecommender;
