import React, { useState } from "react";

function Login({ onLogin }: { onLogin: (user: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem("user", username);
      onLogin(username);
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full border p-2 mb-3 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
