import React, { useState } from "react";
import axios from "axios";

export default function ForwardForm() {
  const [fromChat, setFromChat] = useState("");
  const [toChat, setToChat] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleForward = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://your-railway-app-url.up.railway.app/forward", {
        from_chat: fromChat,
        to_chat: toChat,
        message: message
      });
      setStatus(res.data.message);
    } catch (err) {
      setStatus("❌ Error forwarding message");
    }
  };

  return (
    <form onSubmit={handleForward}>
      <input
        type="text"
        placeholder="From Chat ID"
        value={fromChat}
        onChange={(e) => setFromChat(e.target.value)}
      />
      <input
        type="text"
        placeholder="To Chat ID"
        value={toChat}
        onChange={(e) => setToChat(e.target.value)}
      />
      <textarea
        placeholder="Message to forward"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Forward</button>
      <p>{status}</p>
    </form>
  );
        }
