# Cardiovascular Disease Prediction API

This is a production-style Flask backend API for a Cardiovascular Disease Prediction model. It wraps a pre-trained scikit-learn ML model and provides endpoints for health checks and predictions. 

## Installation

1. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
venv\Scripts\activate
```

2. Install the required dependencies:
```bash
pip install -r requirements.txt
```

## Run

Start the development server:
```bash
python app.py
```

## Server

The API runs locally on:
`http://localhost:5000`

## Endpoints

### `GET /`
Health check endpoint to verify the API is running.

**Response:**
```json
{
    "success": true,
    "message": "Cardiovascular Disease Prediction API is running"
}
```

### `POST /predict`
Endpoint to make cardiovascular disease predictions. It expects a JSON payload containing the following 11 features in exactly this order:

1. `active` (0 = No, 1 = Yes)
2. `gender` (1 = Female, 2 = Male)
3. `height` (in cm)
4. `weight` (in kg)
5. `ap_hi` (Systolic blood pressure)
6. `ap_lo` (Diastolic blood pressure)
7. `cholesterol` (1 = Normal, 2 = Above normal, 3 = Well above normal)
8. `gluc` (1 = Normal, 2 = Above normal, 3 = Well above normal)
9. `smoke` (0 = No, 1 = Yes)
10. `alco` (0 = No, 1 = Yes)
11. `age` (in years)

**Example Request:**
```json
{
    "active": 1,
    "gender": 2,
    "height": 170,
    "weight": 70,
    "ap_hi": 120,
    "ap_lo": 80,
    "cholesterol": 1,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "age": 50
}
```

**Example Response (Prediction 1):**
```json
{
    "success": true,
    "prediction": 1,
    "result": "Cardiovascular disease detected",
    "probability": 73.42
}
```

**Example Response (Prediction 0):**
```json
{
    "success": true,
    "prediction": 0,
    "result": "No cardiovascular disease detected",
    "probability": 26.58
}
```

## Model Compatibility Note
The provided `model.pkl` was inspected and verified. It is a **scikit-learn Pipeline** that already includes a `Scaling` step followed by the classifier. This means you do **not** need to manually scale or preprocess the input data before sending it to the API—the pipeline handles it internally! The model expects exactly 11 features and correctly supports both `.predict()` and `.predict_proba()`.
