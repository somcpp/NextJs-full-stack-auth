"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup Success", response.data);
    } catch (error: any) {
      console.log("Signup Failed", error.response?.data);
      alert(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 border p-8 rounded-lg w-[400px]">
        <h1 className="text-3xl font-bold text-center">
          {loading ? "verification mail sent..." : "Signup"}
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          onClick={onSignup}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          Signup
        </button>

        <Link
          href="/login"
          className="text-blue-500 text-center"
        >
          Visit Login Page
        </Link>
      </div>
    </div>
  );
}