from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "asteroid_risk_model.joblib")

artifact = joblib.load(MODEL_PATH)
model = artifact["model"]

FEATURES = list(model.feature_names_in_)

app = Flask(__name__)

def decide_risk(p_low, p_med, p_high, pha, sentry, miss_au):
    """
    Hybrid logic:
    1. Safety overrides (NASA-style)
    2. Otherwise ML argmax
    """

    if sentry == 1:
        return "HIGH"

    if pha == 1 and miss_au < 0.05:
        return "HIGH"

    probs = {
        "LOW": p_low,
        "MEDIUM": p_med,
        "HIGH": p_high
    }
    return max(probs, key=probs.get)

# @app.route("/")
# def home():
#     return render_template("index.html")

@app.route("/", methods=["POST"])
def predict():
    data = request.json

    if "speed_kmph" in data and "velocity_kms" not in data:
        data["velocity_kms"] = data["speed_kmph"] / 3600

    if "miss_distance_km" in data and "miss_distance_au" not in data:
        data["miss_distance_au"] = data["miss_distance_km"] / 149_597_870

    data.setdefault("absolute_magnitude", 22.0)
    data.setdefault("pha", 0)
    data.setdefault("sentry", 0)

    try:
        df = pd.DataFrame([[data[f] for f in FEATURES]], columns=FEATURES)
    except KeyError as e:
        return jsonify({
            "error": f"Missing required feature: {str(e)}",
            "required_features": FEATURES
        }), 400

    probs = model.predict_proba(df)[0]

    risk = decide_risk(
        probs[0],
        probs[1],
        probs[2],
        int(data["pha"]),
        int(data["sentry"]),
        float(data["miss_distance_au"])
    )

    return jsonify({
        "risk": risk,
        "probabilities": {
            "LOW": round(float(probs[0]), 3),
            "MEDIUM": round(float(probs[1]), 3),
            "HIGH": round(float(probs[2]), 3)
        },
        "explanation": {
            "diameter": "Large" if data["diameter_km"] > 0.1 else "Small",
            "miss_distance": "Very close" if data["miss_distance_au"] < 0.05 else "Safe",
            "pha": int(data["pha"]),
            "sentry": int(data["sentry"]),
            "decision_type": "Hybrid (Safety Override + ML)"
        }
    })

@app.route("/api/asteroids")
def asteroids():
    return jsonify({
        "asteroids": [
            {
                "name": "Apophis",
                "date": "2029-04-13",
                "diameter_km": 0.37,
                "speed_kmph": 30800,
                "miss_distance_km": 38000
            }
        ]
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)