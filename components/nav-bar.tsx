"use client";

import { Settings, Bell, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8">
            <svg
              viewBox="0 0 24 24"
              className="text-[#213cd1]"
              fill="currentColor"
            >
              <path d="M12 0L24 12L12 24L0 12L12 0Z" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-[#213cd1]">
            Moneyy.ai
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={
              pathname === "/" ? "text-[#213cd1] font-medium" : "text-[#323842]"
            }
          >
            Dashboard
          </Link>
          {/* <Link href="/metrics" className="text-[#323842]">
            Key Metrics
          </Link> */}
          <Link
            href="/Strategy-Report"
            className={
              pathname === "/Strategy-Report"
                ? "text-[#213cd1] font-medium"
                : "text-[#323842]"
            }
          >
            Strategy Report
          </Link>
          <Link
            href="/updates"
            className={
              pathname === "/updates"
                ? "text-[#213cd1] font-medium"
                : "text-[#323842]"
            }
          >
            Market Updates
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Search className="w-5 h-5 text-[#323842]" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-5 h-5 text-[#323842]" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5 text-[#323842]" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
