"use client";
import LoginForm from "@/app/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const access_token = localStorage.getItem("access-token");
    if (access_token) {
      router.push("/");
    }
  }, [router]);

  const handleInputChange = (key: string, value: string) => {
    setUserInfo((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const data = await response.json();
        // You can save the token to local storage or state for further use.

        localStorage.setItem("access-token", data.token);

        toast.success("Welcome");
        router.push("/dashboard");
      } else {
        // toast.error(response.statusText);
        toast.error("Invalid username or password.Please try again");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm handleInputChange={handleInputChange} handleLogin={handleLogin} />
    </div>
  );
}
