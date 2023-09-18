from flask import Flask, jsonify, request
import tensorflow as tf
import numpy as np

app = Flask(__name__)


# Prediction
@app.route("/predict", methods=["POST"])
def predict():
    """Payload format
    {"number": 1.357}
    """
    json_ = request.json
    latest_number = float(json_["number"])

    numbers.append([latest_number])  # store historical data for lookback in shape = (n, 1)
    n_lookback = 50  # time steps to look back at when predicting

    # Predict if enough historical data is present
    if len(numbers) >= n_lookback:
        # Prepare input data and predict
        inference_input = np.array([numbers[-n_lookback:]])  # shape = (1, n_lookback, 1)

        pred = model.predict(inference_input)
        pred = float(pred[0][0])

        # Trim earlier data beyond lookback
        # del numbers[: len(numbers) - n_lookback]

        return jsonify({"prediction": pred})
    else:
        return jsonify({"prediction": None})


if __name__ == "__main__":
    model = tf.keras.models.load_model("./model_2-sig.keras")

    # Historical data store
    numbers = []

    app.run()
