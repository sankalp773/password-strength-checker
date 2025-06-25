import React, {useState} from 'react';
import "./App.css";


function getColor(score) {
  switch (score) {
    case 0: return "#e53935"; // red
    case 1: return "#fb8c00"; // orange
    case 2: return "#fdd835"; // yellow
    case 3: return "#43a047"; // green
    case 4: return "#2e7d32"; // dark green
    default: return "#ccc";   // fallback gray
  }
}

function App(){
  const [password,setPassword] = useState("");
  const [feedback,setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const checkPasswordLive = async (pwd) => {
    if (pwd.length === 0) {
      setFeedback("Please enter a password.");
      setScore(0);
      return;
    }
//Send POST request to Flask Backend.

    try {
      const response = await fetch ("http://localhost:5000/check-password", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({password: pwd }),
      });

      const data  = await response.json();
      const { score,Warning,suggestions } = data;

      let result = `Password Strength Score: ${score}/4\n`;
      if (Warning) result += `Warning: ${Warning}\n`;
      if (suggestions.length)  result += `Suggestions:\n- ${suggestions.join("\n - ")}`;
      setFeedback(result);
      setScore(score);
    } catch(error) {
      console.error("Error:", error);
      setFeedback("Server error . please try again. "); 
      }
  };



  return(
    <div className='app-container'>
      <h1>Password Strength Checker </h1>
      
        <input 
        type='password' 
        placeholder='Enter Your Password' 
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          checkPasswordLive(e.target.value);
        }}
        className='password-input'
        />

      <div style={{marginTop: "1rem",fontWeight: "bold"}}>
        {feedback && (
          <div className= "feedback-box">
            <pre>{feedback}</pre>
            <div className="strength-bar"
              style={{
                width: `${(score+1)*20}%`,
                backgroundColor: getColor(score),
              }}
              ></div>
          </div>
        )}
      </div>
      <img src="/logo.png"className='logo' alt="Logo" style={{ width: "150px" }} />

    </div>
  );
}

export default App;