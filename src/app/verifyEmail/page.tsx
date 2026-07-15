"use client"

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    } else {
      setError(true);
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Verify Email</h1>
      
      {!verified && !error && (
        <h2 className="p-2 bg-orange-500 text-black rounded">Verifying...</h2>
      )}
      
      {verified && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl mb-4 text-green-500">Email Verified Successfully!</h2>
          <button 
            onClick={() => router.push("/login")} 
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      )}
      
      {error && (
        <div>
          <h2 className="text-2xl p-2 bg-red-500 text-black rounded">Error: Invalid or Missing Token</h2>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}