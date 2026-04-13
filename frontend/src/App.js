import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://cloud-notes-api-qeyj.onrender.com/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("NOTES" , data);
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("https://cloud-notes-api-qeyj.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login success 🔥");
        console.log("TOKEN:", data.token);

        // เก็บ token
        localStorage.setItem("token", data.token);
        
        fetchNotes();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>

        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <b>{note.title}</b> - {note.content}
            </li>
          ))}
        </ul>

    </div>
  );

  
}

export default App;