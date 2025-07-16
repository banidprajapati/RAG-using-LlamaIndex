// src/App.jsx
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/rag/ask", {
        user_question: input,
      });
      // Check if response is received and log it
      if (res) {
        console.log("API response:", res);
      } else {
        console.warn("No response received from backend.");
      }
      // Extract the answer from your backend response structure
      const botMsg = {
        role: "bot",
        text: res.data.answer,
        sources: res.data.sources || [],
        num_sources: res.data.num_sources || 0,
      };

      setMessages((prev) => [...prev, botMsg]);
      setInput("");
    } catch (error) {
      console.error("API error:", error);

      let errorMessage = "⚠️ Failed to fetch response.";
      if (error.response) {
        errorMessage = `⚠️ Error ${error.response.status}: ${
          error.response.data.detail || "Server error"
        }`;
      } else if (error.request) {
        errorMessage =
          "⚠️ No response from server. Check if backend is running.";
      }

      setMessages((prev) => [...prev, { role: "bot", text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">🧠 Shakespeare Sonnets RAG</h1>
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-4 space-y-2 overflow-y-auto h-[60vh]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg w-fit max-w-[80%] ${
              msg.role === "user"
                ? "ml-auto bg-blue-100"
                : "mr-auto bg-gray-200"
            }`}>
            <div>{msg.text}</div>
            {msg.sources && msg.sources.length > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                Sources: {msg.num_sources} sonnets found
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="mr-auto bg-gray-200 p-2 rounded-lg w-fit">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <span>Searching sonnets...</span>
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-w-xl mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about Shakespeare's sonnets..."
          className="flex-1 p-2 rounded border border-gray-300"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
