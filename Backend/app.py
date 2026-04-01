from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
import pickle
import os

app = Flask(__name__)

model = pickle.load(open("model/rf_model.pkl","rb"))
df = pd.read_csv("cardio_train_clean.csv")
if 'age_years' not in df.columns:
    df['age_years'] = (df['age'] / 365).round(1)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict")
def predict():
    return render_template("predict.html")

@app.route("/graphs")
def graphs():
    return render_template("graphs.html")

@app.route("/api/graph_data")
def graph_data():
    # Round Age to nearest integer for chart
    df['age_round'] = df['age_years'].round().astype(int)
    age_crosstab = pd.crosstab(df['age_round'], df['cardio'])
    age_group = {str(age): {str(cardio): int(count) for cardio, count in row.items()} 
                 for age, row in age_crosstab.iterrows()}

    # Gender
    gender_crosstab = pd.crosstab(df['gender'], df['cardio'])
    gender_group = {str(gender): {str(cardio): int(count) for cardio, count in row.items()} 
                    for gender, row in gender_crosstab.iterrows()}

    # Round BP to nearest 5
    df['ap_hi_round'] = (df['ap_hi'] / 5).round() * 5
    df['ap_lo_round'] = (df['ap_lo'] / 5).round() * 5
    
    ap_hi_crosstab = pd.crosstab(df['ap_hi_round'], df['cardio'])
    ap_hi_group = {str(int(bp)): {str(cardio): int(count) for cardio, count in row.items()} 
                   for bp, row in ap_hi_crosstab.iterrows()}
    
    ap_lo_crosstab = pd.crosstab(df['ap_lo_round'], df['cardio'])
    ap_lo_group = {str(int(bp)): {str(cardio): int(count) for cardio, count in row.items()} 
                   for bp, row in ap_lo_crosstab.iterrows()}

    return jsonify({
        "age": age_group,
        "gender": gender_group,
        "ap_hi": ap_hi_group,
        "ap_lo": ap_lo_group,
    })


@app.route("/api/predict", methods=["POST"])
def api_predict():
    data = request.get_json()
    vals = [
        int(data['gender']),
        float(data['height']),
        float(data['weight']),
        float(data['ap_hi']),
        float(data['ap_lo']),
        int(data['cholesterol']),
        int(data['gluc']),
        int(data['smoke']),
        int(data['alco']),
        int(data['active']),
        int(data['age_years']),
        float(data['bmi'])
    ]
    input_data = np.array([vals])
    pred = model.predict(input_data)[0]
    prob = model.predict_proba(input_data)[0][1]
    return jsonify({"prediction":int(pred), "probability":float(prob)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)