// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import InputField from "../../../components/Input";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token to localStorage or cookie if needed
      localStorage.setItem("token", data.token);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Login</h2>
        {error && <ErrorMessage message={error} />}
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" text="Login" />
        <p className="text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-[#102E50] hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
