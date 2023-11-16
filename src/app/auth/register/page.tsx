"use client";
import RegisterForm from "@/app/components/auth/RegisterForm";
import { validatePassword } from "@/app/utils/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();

  const handleInputChange = (key: string, value: string) => {
    setUserData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    if (userData?.password !== userData?.confirm) {
      toast.error("Password and confirm password do not match!");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData?.email,
        password: userData?.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Register successful");
      router.push("/auth/login");
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <RegisterForm handleInputChange={handleInputChange} handleRegister={handleRegister} />
    </div>
  );
}
