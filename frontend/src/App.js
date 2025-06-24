import React, {useState} from 'react';


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
    <div style={{padding: "2rem",fontFamily: "sans-serif"}}>
      <h1>Password Strength Checker </h1>
      
        <input 
        type='password' 
        placeholder='Enter Your Password' 
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          checkPasswordLive(e.target.value);
        }}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          width:"300px",
          marginRight: "1rem",
        }}
        />

      <div style={{marginTop: "1rem",fontWeight: "bold"}}>
        {feedback && (
          <div style={{marginTop: "1rem",fontWeight: "bold"}}>
            <div style={{
                height: "10px",
                width: `${(score+1)*20}%`,
                backgroundColor: getColor(score),
                transition: "width 0.5s ease",
                borderRadius: "5px",
              }}
              ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;