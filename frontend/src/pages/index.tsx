import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Dashboard</h1>
      <div className="flex gap-4">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/employee">Employee</Link>
      </div>
    </div>
  );
}
