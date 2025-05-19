"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-fuchsia-100 py-6">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Book Library Management System. All
          rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-black transition-colors">
            Terms of Service
          </Link>
          <Link href="/" className="hover:text-black transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
