from flask import Flask , request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #allow request from frontend

@app.route("/")

def home():
	return "Welcome to the Password Strength Checker!"

@app.route("/check-password", methods = ["POST"])

def check_password() :
	data = request.get_json()
	password = data.get("password","")

	#dummy logic for now
	if len(password) < 6 :
		feedback  = "Too Short ! add more characters."
	else :
		feedback = "Looks okay, will improve this."

	return jsonify({"feedback":feedback})

@app.route("/ping")
def ping():
        return "pong"


if __name__ == "__main__":
	app.run(debug = True)
