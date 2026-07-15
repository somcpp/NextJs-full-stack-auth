"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      // Hits the API endpoint to initiate the reset sequence
      const response = await axios.post("/api/users/forgotpassword", { email });

      if (response.data.success) {
        setMessage("A password reset link has been sent to your email address.");
        setEmail(""); // Clear the input field
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 p-8 rounded-lg w-full max-w-[400px] bg-white dark:bg-gray-800 shadow-md"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-2">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && (
          <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium">
            {message}
          </div>
        )}
        
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors font-medium mt-2"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="text-center mt-2">
          <Link
            href="/login"
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}