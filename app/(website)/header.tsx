"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9F9F9]">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 py-4 md:py-6 border-b-2 border-[#EDEDED]">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image 
            src="/images/Logo.png" 
            alt="Reppoo Logo" 
            width={1000}
            height={1000}
            className="w-[100px] sm:w-[120px] md:w-[130px] h-auto"
          />
        </div>

        {/* Admin Login Button */}
        <button className="px-4 sm:px-6 py-2 sm:py-3 text-[0.9rem] sm:text-[1.1rem] md:text-[1.2rem] font-bold rounded-full bg-white text-gray-800 hover:bg-gray-200 transition">
          Admin login
        </button>

      </div>
    </header>
  );
}
