import { useState } from "react";

function App() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [gap, setGap] = useState(5);

  const login = async () => {
    await fetch("https://your-backend-url/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    alert("Check Telegram for OTP!");
  };

  const send = async () => {
    await fetch("https://your-backend-url/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, message, gap }),
    });
    alert("Message sending started!");
  };

  return (
    <div className="p-5">
      <h1>📢 Telegram Auto Forward Tool</h1>
      <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={login}>Login</button>

      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <input type="number" placeholder="Time gap (sec)" value={gap} onChange={(e) => setGap(e.target.value)} />
      <button onClick={send}>Start Sending</button>
    </div>
  );
}

export default App;
