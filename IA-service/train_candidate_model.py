import pandas as pd
import numpy as np
import nltk
import joblib
import os
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.svm import SVC
from sklearn.metrics import classification_report, accuracy_score, f1_score
import random

# Télécharger stopwords français si nécessaire
nltk.download('stopwords')
try:
    stop_words_fr = stopwords.words('french')
except LookupError:
    nltk.download('stopwords')
    stop_words_fr = stopwords.words('french')

# 1. Charger les données
df = pd.read_csv("data/cvs_data.csv")

# 2. Créer un label binaire selon règles métiers (ajuster selon besoin)
df['label'] = ((df['annees_experience'] >= 3) & (df['projets_realises'] >= 4)).astype(int)

# 3. Ajouter du bruit dans les labels (par exemple 10% de bruit)
def ajouter_bruit_labels(labels, taux_bruit=0.1):
    labels_noisy = labels.copy()
    n_bruit = int(len(labels) * taux_bruit)
    indices_bruit = random.sample(range(len(labels)), n_bruit)
    for i in indices_bruit:
        labels_noisy.iat[i] = 1 - labels_noisy.iat[i]  # Inverser le label
    return labels_noisy

df['label_bruit'] = ajouter_bruit_labels(df['label'], taux_bruit=0.1)

# 4. Texte combiné (spécialité + compétences)
df['texte'] = df['specialité'] + ' ' + df['competences']

# 5. TF-IDF vectorisation (max 300 features, unigram+bigram, stopwords français)
vectorizer = TfidfVectorizer(max_features=300, stop_words=stop_words_fr, ngram_range=(1, 2))
X_text = vectorizer.fit_transform(df['texte']).toarray()

# 6. Normalisation des variables numériques
scaler = StandardScaler()
X_num = scaler.fit_transform(df[['annees_experience', 'projets_realises']])

# 7. Combine features textuelles et numériques
X = np.concatenate([X_text, X_num], axis=1)
y = df['label_bruit']

# 8. Séparation train/test stratifiée
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 9. Modèle SVM avec recherche hyperparamètres
svm = SVC(probability=True, random_state=42)

param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['linear', 'rbf'],
    'gamma': ['scale', 'auto']
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

grid_search = GridSearchCV(svm, param_grid, cv=cv, scoring='f1', n_jobs=-1)
grid_search.fit(X_train, y_train)

print("Meilleurs paramètres :", grid_search.best_params_)
print("Meilleur score F1 CV :", grid_search.best_score_)

# 10. Évaluation sur test
best_svm = grid_search.best_estimator_
y_pred = best_svm.predict(X_test)

print("\nClassification report test :\n", classification_report(y_test, y_pred))
print(f"Accuracy test : {accuracy_score(y_test, y_pred):.4f}")
print(f"F1 score test : {f1_score(y_test, y_pred):.4f}")

# 11. Calcul score recommandation sur tout le dataset
df['score'] = best_svm.predict_proba(X)[:, 1]

# 12. Sauvegarder le modèle, le vectorizer et le scaler pour utilisation dans l'API
model_dir = "model"
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

joblib.dump(best_svm, os.path.join(model_dir, "candidate_model.pkl"))
joblib.dump(vectorizer, os.path.join(model_dir, "candidate_vectorizer.pkl"))
joblib.dump(scaler, os.path.join(model_dir, "candidate_scaler.pkl"))

print("Modèles sauvegardés dans le répertoire 'model'")

# 13. Définition d'une offre exemple
offre = {
    "specialité": "Data Science",
    "competences": "Python, Machine Learning, Pandas, Scikit-learn",
    "annees_experience": 3,
    "projets_realises": 4
}

# 14. Fonction pour points forts/faibles
def evaluer_points(candidat, offre):
    points_forts = []
    points_faibles = []

    if candidat['annees_experience'] >= offre['annees_experience']:
        points_forts.append("Expérience")
    else:
        points_faibles.append("Expérience")

    if candidat['projets_realises'] >= offre['projets_realises']:
        points_forts.append("Projets réalisés")
    else:
        points_faibles.append("Projets réalisés")

    competences_offre = set(offre['competences'].lower().replace(',', '').split())
    competences_candidat = set(candidat['competences'].lower().replace(',', '').split())

    if len(competences_offre.intersection(competences_candidat)) / len(competences_offre) >= 0.7:
        points_forts.append("Compétences")
    else:
        points_faibles.append("Compétences")

    return pd.Series([', '.join(points_forts), ', '.join(points_faibles)])

# 15. Appliquer l'évaluation à l'exemple
df[['points_forts', 'points_faibles']] = df.apply(lambda x: evaluer_points(x, offre), axis=1)

# 16. Recommandation selon seuil 0.5
df['recommandé'] = df['score'] >= 0.5

# 17. Affichage top 5 candidats recommandés
top_candidats = df.sort_values(by='score', ascending=False).head(5)

print("\nExemple de recommandations avec l'offre test:")
for _, candidat in top_candidats.iterrows():
    print(f"Candidat : {candidat['nom']} - Spécialité : {candidat['specialité']}")
    print(f"Score : {candidat['score']:.2f}")
    print(f"Points forts : {candidat['points_forts']}")
    print(f"Points faibles : {candidat['points_faibles']}")
    print(f"Recommandé : {candidat['recommandé']}\n")