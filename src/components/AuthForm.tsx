"use client";
import { useState } from "react";

type AuthMode = "login" | "register";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    if (mode === "login") {
      alert(`Login con: ${email} / ${password}`);
    } else {
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre: name, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          alert("Usuario registrado correctamente");
          setName("");
          setEmail("");
          setPassword("");
          setMode("login");
        } else {
          setMensaje(data.error || "Error al registrar usuario");
        }
      } catch (error) {
        console.error("Error al crear usuario:", error);
        alert("Error de red o servidor");
        setMensaje("Error de red o servidor");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-colors">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300">
        {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === "register" && (
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Nombre:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Contraseña:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          {mode === "login" ? "Entrar" : "Registrarse"}
        </button>
      </form>
      <button
        className="mt-4 w-full text-blue-600 dark:text-blue-300 hover:underline"
        type="button"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login"
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
      {mensaje && (
        <div className="text-center mt-2 text-sm text-red-500">{mensaje}</div>
      )}
    </div>
  );
};

export default AuthForm;
