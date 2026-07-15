"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onLogin = async (e: any) => {
    e.preventDefault(); // Prevents the page from refreshing on form submission
    
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users/login",
        user
      );

      console.log(response.data);

      router.push("/profile");
    } catch (error: any) {
      console.log(error.response?.data);
      alert(
        error.response?.data?.error ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      {/* Wrapped in an HTML form to support native submit behaviors like pressing Enter */}
      <form onSubmit={onLogin} className="flex flex-col gap-4 border p-8 rounded-lg w-[400px]">
        <h1 className="text-3xl font-bold text-center">
          {loading ? "Processing..." : "Login"}
        </h1>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            className="border p-2 rounded"
          />
          {/* Forgot Password Link positioned cleanly beneath the password input */}
          <div className="text-right">
            <Link 
              href="/forgotpassword" 
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          Login
        </button>

        <Link
          href="/signup"
          className="text-blue-500 text-center hover:underline"
        >
          Don't have an account? Signup
        </Link>
      </form>
    </div>
  );
}