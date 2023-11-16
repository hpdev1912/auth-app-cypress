"use client";
import { useRouter } from "next/navigation";
import NavBar from "./components/NavBar";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("access-token");
    router.push("/auth/login");
  };

  return (
    <main className="min-h-screen">
      <div>Home Page</div>
      <button
        className="inline-block w-1/3 rounded-lg border border-solid border-gray-600 bg-gray-400 p-1"
        onClick={handleLogout}
      >
        Log out
      </button>
    </main>
  );
}
