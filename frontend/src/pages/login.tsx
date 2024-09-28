import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users = await response.json();

      const user = users.find(
        (u: { username: string; password: string }) =>
          u.username === userName && u.password === password
      );

      if (!user) {
        setError("Invalid username or password");
        return;
      }

      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "employee") {
        router.push("/employee");
      } else {
        setError("Invalid role");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-3/4 max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Sign In */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mb-4 text-[#2899a9]">Đăng Nhập</h1>
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
          <input
            type="text"
            placeholder="Tài Khoản"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 text-[#000000]"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 text-[#020202]"
          />
          <div className="flex justify-between items-center w-full mb-4">
            <label className="flex items-center text-[#050505]">
              <input type="checkbox" className="mr-2" />
              Lưu đăng nhập
            </label>
            <a href="#" className="text-[#2899a9]">
              Quên mật khẩu?
            </a>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#2899a9] text-white p-3 rounded-[15px] border"
          >
            Đăng Nhập
          </button>
        </div>

        {/* Right Side - Sign Up */}
        <div className="w-1/2 bg-[#2899a9] text-white flex flex-col justify-center items-center p-8">
          <Image
            src="/images/logoHR_System.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="mb-4 rounded-[30px] border border-[#2899a9]"
          />{" "}
          <h1 className="text-4xl font-bold mb-4">Xin Chào</h1>
          <p className="mb-4">Chào mừng đến với trang web</p>
          <Link href="/register">
            <button className="bg-white text-[#2899a9] p-3 rounded-[15px] border">
              Đăng Ký
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
