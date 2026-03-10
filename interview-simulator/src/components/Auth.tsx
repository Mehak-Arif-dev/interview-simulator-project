import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful ✅");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful ✅");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    alert("Logged out ✅");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-800 text-white rounded-md w-80 mx-auto mt-10">
      <h2 className="text-xl font-bold">Interview Simulator Auth</h2>

      {user ? (
        <>
          <p>Logged in as <span className="font-semibold">{user.email}</span></p>
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full"
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            className="p-2 rounded text-black w-full"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-2 rounded text-black w-full"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full"
            onClick={signup}
          >
            Sign Up
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full"
            onClick={login}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}
