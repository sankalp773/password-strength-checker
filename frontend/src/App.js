import React, {useState} from 'react';

function App(){
  const [password,setPassword] = useState("");
  const [feedback,setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

//Send POST request to Flask Backend.

    try {
      const response = await fetch ("http://localhost:5000/check-password", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({password}),
      });

      const data  = await response.json();
      const { score,Warning,suggestions } = data;
      let result = `Password Strength Score: ${score}/4\n`;
      if (Warning) result += `Warning: ${Warning}\n`;
      if (suggestions.length)  result += `Suggestions:\n- ${suggestions.join("\n - ")}`;
      setFeedback(result);
    } catch(error) {
      console.error("Error:", error);
      setFeedback("Server error . please try again. "); 
      }
  };

  return(
    <div style={{padding: "2rem",fontFamily: "sans-serif"}}>
      <h1>Password Strength Checker </h1>
      <form onSubmit={handleSubmit}>
        <input 
        type='password' 
        placeholder='Enter Your Password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          width:"300px",
          marginRight: "1rem",
        }}
        />
        <button type='submit' style={{padding: " 0.5rem  1rem "}}>
          Check
        </button>
      </form>
      <div style={{marginTop: "1rem",fontWeight: "bold"}}>
        {feedback &&<pre>{feedback}</pre>}
      </div>
    </div>
  );
}

export default App;