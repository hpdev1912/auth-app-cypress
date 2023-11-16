"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const access_token = localStorage.getItem("access-token");
    if (!access_token) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    router.push("/auth/login");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex h-screen items-center justify-center">
        <div className="w-96 rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Welcome to Our Website</h1>
          <p className="mb-6 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button
            data-cy="logout-btn"
            className="focus:shadow-outline-blue rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
