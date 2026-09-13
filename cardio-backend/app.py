from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the existing machine learning model
try:
    model = joblib.load("model.pkl")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "success": True,
        "message": "Cardiovascular Disease Prediction API is running"
    })

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({
            "success": False,
            "error": "Model not loaded on server."
        }), 500

    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "error": "Invalid JSON input"
            }), 400

        # 1. Required fields validation
        required_fields = [
            "active", "gender", "height", "weight", "ap_hi", 
            "ap_lo", "cholesterol", "gluc", "smoke", "alco", "age"
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "success": False,
                    "error": f"Missing field: {field}"
                }), 400

        # 2. Extract values and validate numeric types
        try:
            active = float(data["active"])
            gender = float(data["gender"])
            height = float(data["height"])
            weight = float(data["weight"])
            ap_hi = float(data["ap_hi"])
            ap_lo = float(data["ap_lo"])
            cholesterol = float(data["cholesterol"])
            gluc = float(data["gluc"])
            smoke = float(data["smoke"])
            alco = float(data["alco"])
            age = float(data["age"])
        except ValueError:
            return jsonify({
                "success": False,
                "error": "All fields must be numeric values"
            }), 400

        # 3. Validate ranges and categorical values
        if active not in [0, 1]:
            return jsonify({"success": False, "error": "Invalid value for active: must be 0 or 1"}), 400
        if gender not in [1, 2]:
            return jsonify({"success": False, "error": "Invalid value for gender: must be 1 or 2"}), 400
        if cholesterol not in [1, 2, 3]:
            return jsonify({"success": False, "error": "Invalid value for cholesterol: must be 1, 2, or 3"}), 400
        if gluc not in [1, 2, 3]:
            return jsonify({"success": False, "error": "Invalid value for gluc: must be 1, 2, or 3"}), 400
        if smoke not in [0, 1]:
            return jsonify({"success": False, "error": "Invalid value for smoke: must be 0 or 1"}), 400
        if alco not in [0, 1]:
            return jsonify({"success": False, "error": "Invalid value for alco: must be 0 or 1"}), 400
            
        if age <= 0:
            return jsonify({"success": False, "error": "Invalid value for age: must be > 0"}), 400
        if height <= 0:
            return jsonify({"success": False, "error": "Invalid value for height: must be > 0"}), 400
        if weight <= 0:
            return jsonify({"success": False, "error": "Invalid value for weight: must be > 0"}), 400
        if ap_hi <= 0:
            return jsonify({"success": False, "error": "Invalid value for ap_hi: must be > 0"}), 400
        if ap_lo <= 0:
            return jsonify({"success": False, "error": "Invalid value for ap_lo: must be > 0"}), 400

        # 4. Create features DataFrame with the EXACT order and names the model actually expects
        # The model was trained with specific feature names, so we use a DataFrame to match them perfectly.
        features = pd.DataFrame([{
            'gender': gender,
            'height': height,
            'weight': weight,
            'ap_hi': ap_hi,
            'ap_lo': ap_lo,
            'cholesterol': cholesterol,
            'gluc': gluc,
            'smoke': smoke,
            'alco': alco,
            'active': active,
            'age_years': age
        }])

        # 5. Make prediction
        prediction = int(model.predict(features)[0])
        
        probability = None
        if hasattr(model, "predict_proba"):
            # Probabilities are typically [prob_class_0, prob_class_1]
            prob_array = model.predict_proba(features)[0]
            probability = round(float(prob_array[1]) * 100, 2) if prediction == 1 else round(float(prob_array[0]) * 100, 2)

        # 6. Format result
        if prediction == 1:
            result_text = "Cardiovascular disease detected"
        else:
            result_text = "No cardiovascular disease detected"

        return jsonify({
            "success": True,
            "prediction": prediction,
            "result": result_text,
            "probability": probability
        }), 200

    except Exception as e:
        # Catch unexpected errors without leaking tracebacks
        return jsonify({
            "success": False,
            "error": "Server error processing prediction"
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
