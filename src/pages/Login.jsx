import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { auth } from "../auth/firebaseConfig"; 
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // Login with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get ID token
      const idToken = await user.getIdToken();

      // Send ID token to backend for verification
      const res = await fetch("https://iteventsbackend.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${idToken}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("adminUser", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        const errorText = await res.text();
        setErrorMsg(errorText || "Acceso denegado");
      }
    } catch (err) {
      console.error("Login error", err);
      setErrorMsg("Email o contraseña incorrectos");
    }
  };

  const resetPassword = () => {

    sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success("Email de reseteo enviado");
    })
    .catch((error) => {
      console.log(error)
      toast.error("Error al enviar el correo");
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#242424] text-white px-4">
        <div className="w-full max-w-md bg-[#101010] border border-[#646cff] rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-6">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="customLabel">Correo electrónico</label>
              <input
                type="email"
                placeholder="admin@itevents.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-[#1e1e1e] border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="customLabel">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-[#1e1e1e] border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {errorMsg && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 rounded-md font-semibold"
            >
              Entrar
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            ¿Olvidaste tu contraseña?{" "}
          <span
            onClick={resetPassword}
            className="text-violet-400 hover:underline cursor-pointer"
        >
            Recupérala aquí
          </span>
         </p>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
