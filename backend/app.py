from flask import Flask , request, jsonify,render_template
from flask_cors import CORS
from zxcvbn import zxcvbn

app = Flask(__name__)
CORS(app) #allow request from frontend

@app.route("/")
def home():
	#this is the home page
	button = "<button onclick=\"window.location.href='/check-password'\">Check Password Strength</button>"
	return f"<b><center>Welcome to the Password Strength Checker! You are looking at beckend<center></b>"+ button 

@app.route("/new-page")
@app.route("/new-page/<name>") #optional parameter
def new_page(name = None):
	return render_template("check_password.html",person = name)


@app.route("/check-password", methods = ["POST","GET"])
def check_password() :
	if request.method == "GET":
		data = request.args
		password = data.get("password","")	
		return render_template("check_password.html", password=password)
	data = request.get_json()
	password = data.get("password","")

	#using zxcvbn to check password strength
	result = zxcvbn(password)

	score = result["score"] #0 to 4, where 0 is very weak and 4 is very strong
	feedback = result['feedback']
	suggestions = feedback.get("suggestions", [])
	Warning = feedback.get("warning", "")
	guess_count = result["guesses"]
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
				"suggestions": suggestions,
				"guess_count": guess_count
	})


if __name__ == "__main__":
	app.run(debug = True)
