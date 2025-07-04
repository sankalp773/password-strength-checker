# Password Strength Checker

A full-stack web App that checks the strength of password in real time  and provides feedback for improvement.

## Features
- Instant feedback as you type every key.
- Strength meter from 0 to 4 wirh colors indicating the strength of the password.
- Suggestions to increase the strength of the password.
- Built with React(forntend) + Flask(backend)

## Tech Stack
- FrontEnd : React + CSS
- Backend : Python (Flask)
- Password Evaluation : zxcvbn

## Run Locally

### Backend: 
``` 
cd backend
venv\Scripts\activate # Windows
pip install -r requirements.txt
python app.py
```

### Frontend:
```
cd frontend
npm install
npm start
```

## Future Features:
- Custom Password strength logic
- Password History tracker
- Save reports to localStorage or DB
- Timed password check instead of checking after every click.
- Using API to get common used passwords or passwords that appeared in a data leak.