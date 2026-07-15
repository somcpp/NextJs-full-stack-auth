"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  useEffect,
  useState,
} from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const logout = async () => {
    try {
      await axios.get(
        "/api/users/logout"
      );

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails =
    async () => {
      try {
        const res =
          await axios.get(
            "/api/users/profile"
          );

        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-5 border p-8 rounded-lg">

        <h1 className="text-4xl font-bold">
          Profile Page
        </h1>

        <h2>
          Username:
          {user?.username}
        </h2>

        <h2>
          Email:
          {user?.email}
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}