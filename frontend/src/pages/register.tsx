"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role: "employee",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-3/4 max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Register */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mb-4 text-[#2899a9]">Đăng Ký</h1>
          <div className="flex space-x-4 mb-4">
            <button className="p-2 rounded-full border border-gray-300">
              f
            </button>
            <button className="p-2 rounded-full border border-gray-300">
              in
            </button>
            <button className="p-2 rounded-full border border-gray-300">
              G
            </button>
          </div>
          <p className="text-gray-500 mb-4">sử dụng tài khoản có sẵn</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-4">
              <input
                type="text"
                value={username}
                placeholder="Tài Khoản"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 text-[#020202]"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                placeholder="Mật Khẩu"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 text-[#020202]"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Nhập Lại Mật Khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 text-[#020202]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2899a9] text-white p-3 rounded-[15px] border"
            >
              Đăng Ký
            </button>
          </form>
        </div>

        {/* Right Side - Welcome */}
        <div className="w-1/2 bg-[#2899a9] text-white flex flex-col justify-center items-center p-8">
          <Image
            src="/images/logoHR_System.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="mb-4 rounded-[15px] border border-[#2899a9]"
          />
          <h1 className="text-4xl font-bold mb-4">Xin Chào</h1>
          <p className="mb-4">Chào mừng đến với trang web</p>
          <Link href="/login">
            <button className="bg-white text-[#2899a9] p-3 rounded-[15px] border">
              Đăng Nhập
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
