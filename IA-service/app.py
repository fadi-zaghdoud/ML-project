from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Charger le modèle une fois
model = joblib.load("model/pipeline.pkl")

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

        prediction = model.predict([features])[0]
        return jsonify({'salaire_pred': round(prediction, 2)})
    
    except KeyError as e:
        return jsonify({'error': f'Missing key: {str(e)}'}), 400

if __name__ == '__main__':
    app.run(debug=True)
