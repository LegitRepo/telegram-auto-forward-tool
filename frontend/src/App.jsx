import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import ForwardForm from "./components/ForwardForm";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚀 Telegram Forward Tool</h1>
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <ForwardForm />
      )}
    </div>
  );
}
