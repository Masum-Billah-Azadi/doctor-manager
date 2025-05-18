"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold">
        🩺 DoctorApp
      </Link>

      <div className="flex gap-4">
        <Link
          href="/"
          className={`hover:underline ${pathname === "/" && "underline"}`}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className={`hover:underline ${pathname === "/dashboard" && "underline"}`}
        >
          Dashboard
        </Link>
        <Link
          href="/login"
          className={`hover:underline ${pathname === "/login" && "underline"}`}
        >
          Login
        </Link>
        <Link
          href="/signup"
          className={`hover:underline ${pathname === "/signup" && "underline"}`}
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}
