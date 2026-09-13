import unittest
import json
from app import app

class FlaskAppTests(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_1_home(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['message'], "Cardiovascular Disease Prediction API is running")

    def test_2_valid_prediction(self):
        payload = {
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
        response = self.app.post('/predict', json=payload)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertIn('prediction', data)
        self.assertIn('result', data)
        self.assertIn('probability', data)

    def test_3_missing_field(self):
        payload = {
            "active": 1,
            "gender": 2,
            "height": 170,
            "weight": 70,
            "ap_hi": 120,
            "ap_lo": 80,
            "cholesterol": 1,
            "gluc": 1,
            "smoke": 0,
            "alco": 0
            # missing age
        }
        response = self.app.post('/predict', json=payload)
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['error'], "Missing field: age")

    def test_4_invalid_categorical_value(self):
        payload = {
            "active": 1,
            "gender": 5, # invalid
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
        response = self.app.post('/predict', json=payload)
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertIn("Invalid value for gender", data['error'])

    def test_5_invalid_age(self):
        payload = {
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
            "age": -10 # invalid
        }
        response = self.app.post('/predict', json=payload)
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertIn("Invalid value for age", data['error'])

if __name__ == '__main__':
    unittest.main()
