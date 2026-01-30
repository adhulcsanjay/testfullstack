
"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9F9F9]">
      <div className=" flex items-center justify-between px-20 py-6 mx-10 border-b-2 border-[#EDEDED]">
        <div className="flex items-center gap-2">
          <Image 
            src="/images/Logo.png" 
            alt="Reppoo Logo" 
            className="w-[130px] h-full"
            width={1000}
            height={1000}
          />
        </div>

     
        <button className="px-7 py-3 mr-12 text-[1.2rem] font-bold rounded-full bg-white text-gray-800 hover:bg-gray-200 transition">
          Admin login
        </button>

      </div>
    </header>
  );
}
