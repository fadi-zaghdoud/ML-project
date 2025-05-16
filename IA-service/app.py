from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import pandas as pd
import os
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure NLTK data path
nltk_data_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'nltk_data')
nltk.data.path.append(nltk_data_dir)

# Load models
print("Loading models...")
salary_model = joblib.load("model/pipeline.pkl")

# Load candidate recommendation models if they exist
candidate_model = None
candidate_vectorizer = None
candidate_scaler = None

try:
    if os.path.exists("model/candidate_model.pkl"):
        candidate_model = joblib.load("model/candidate_model.pkl")
        candidate_vectorizer = joblib.load("model/candidate_vectorizer.pkl")
        candidate_scaler = joblib.load("model/candidate_scaler.pkl")
        print("Candidate recommendation models loaded successfully")
except Exception as e:
    print(f"Error loading candidate recommendation models: {str(e)}")


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        features = [
            data['annees_experience'],
            data['projets_realises'],
            len(data['competences'].split(',')),
            len(data['langues'].split(',')),
            int(all([data.get('specialité'), data.get('competences'), data.get('diplome'), data.get('langues')]))
        ]

        prediction = salary_model.predict([features])[0]
        return jsonify({'salaire_pred': round(prediction, 2)})
    
    except KeyError as e:
        return jsonify({'error': f'Missing key: {str(e)}'}), 400

@app.route('/evaluate_candidate', methods=['POST'])
def evaluate_candidate():
    data = request.get_json()
    
    try:
        # Get candidate and job offer details
        candidat = data.get('candidat', {})
        offre = data.get('offre', {})
        
        if not candidat or not offre:
            return jsonify({'error': 'Missing candidate or job offer data'}), 400
        
        # Evaluate strengths and weaknesses
        points_forts = []
        points_faibles = []
        
        # Check experience
        if candidat['annees_experience'] >= offre['annees_experience']:
            points_forts.append("Expérience")
        else:
            points_faibles.append("Expérience")
            
        # Check projects completed
        if candidat['projets_realises'] >= offre['projets_realises']:
            points_forts.append("Projets réalisés")
        else:
            points_faibles.append("Projets réalisés")
            
        # Check skills match
        competences_offre = set(offre['competences'].lower().replace(',', '').split())
        competences_candidat = set(candidat['competences'].lower().replace(',', '').split())
        
        # Check if at least 50% of required skills are matched
        skill_match_ratio = len(competences_offre.intersection(competences_candidat)) / max(len(competences_offre), 1)
        if skill_match_ratio >= 0.5:
            points_forts.append("Compétences")
        else:
            points_faibles.append("Compétences")
            
        # Calculate score based on these factors:
        # 1. Experience (30%)
        # 2. Projects (20%)
        # 3. Skills matching (50%)
        experience_score = min(candidat['annees_experience'] / max(offre['annees_experience'], 1), 1.5) * 30
        projects_score = min(candidat['projets_realises'] / max(offre['projets_realises'], 1), 1.5) * 20
        skills_score = skill_match_ratio * 50
        
        # Calculate total score (0-100)
        score = experience_score + projects_score + skills_score
        
        # Normalize score to be between 0 and 100
        score = min(max(round(score, 1), 0), 100)
        
        # Determine recommendation based on score threshold
        recommende = score >= 50
        
        # Build response
        result = {
            "points_forts": ", ".join(points_forts),
            "points_faibles": ", ".join(points_faibles),
            "score": score,
            "recommende": recommende
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': f'Error evaluating candidate: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
