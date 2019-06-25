from flask import Flask, jsonify, render_template
import json
import pandas as pd 

app = Flask(__name__, template_folder="templates")

file = "static/data/historical_data_final.csv"
historical_df = pd.read_csv(file)

currency_list = {
        "XRP" : 1,
        "ETH" : 2, 
        "LTC" : 3, 
        "BCC" : 4, 
        "EOS" : 5, 
        "BNC" : 6
        }   

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/explore")
def explore():
    return render_template('explore.html')
    
@app.route("/history")
def history():
    return render_template('history.html')

@app.route("/comparison")
def comparison():
    return render_template('comparison.html')

@app.route("/BTC")
def names():
    """Return a list of CURRENCY names."""
    return (jsonify(list(currency_list)))
    
@app.route("/historical_data/<correctedCurrency>")
def historical_data(correctedCurrency):
    currency_data = historical_df.loc[historical_df["correctedCurrency"] == correctedCurrency]

    data = {
        "Date": currency_data["Date"].tolist(),
        "Close": currency_data["Close"].tolist(),
    }

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
