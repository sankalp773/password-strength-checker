from flask import Flask , request, jsonify
from flask_cors import CORS
from zxcvbn import zxcvbn

app = Flask(__name__)
CORS(app) #allow request from frontend

@app.route("/")

def home():
	return "Welcome to the Password Strength Checker!"

@app.route("/check-password", methods = ["POST"])

def check_password() :
	data = request.get_json()
	password = data.get("password","")

	#using zxcvbn to check password strength
	result = zxcvbn(password)

	score = result["score"] #0 to 4, where 0 is very weak and 4 is very strong
	feedback = result['feedback']
	suggestions = feedback.get("suggestions", [])
	Warning = feedback.get("warning", "")
	'''if score == 0:
		feedback = "Very Weak Password. " + Warning + " " + "Suggestions: " + ", ".join(suggestions)
	elif score == 1:
		feedback = "Weak Password. " + Warning + " " + "Suggestions: " + ", ".join(suggestions)
	elif score == 2:
		feedback = "Fair Password. " + Warning + " " + "Suggestions: " + ", ".join(suggestions)
	elif score == 3:
		feedback = "Good Password. " + Warning + " " + "Suggestions: " + ", ".join(suggestions)
	else:
		feedback = "Strong Password! No suggestions needed." '''
	
	return jsonify({"score":score,
				"warning": Warning,
				"suggestions": suggestions
	})


if __name__ == "__main__":
	app.run(debug = True)
