"use client";

import React from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function Hero() {
  return (
    <section className="w-full bg-[#F9FAFB] relative overflow-hidden">
      {/* Background Blur Circles */}
      <div className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#B3AAFF] rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute left-32 top-1/4 w-[400px] h-[400px] bg-[#70D9FF] rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute right-32 top-1/4 w-[400px] h-[300px] bg-[#FFE5AA] rounded-full blur-[120px] opacity-40"></div>

      {/* Hero Images Container */}
      <div className="relative flex justify-center pb-20 lg:pb-32">
        {/* Background Shape */}
        <div className="absolute inset-0 flex justify-center z-0">
          <Image
            src="/images/Collaboration Background Shape.png"
            alt="Hero Background"
            width={1920}
            height={500}
            className="object-cover w-full h-auto"
            priority
          />
        </div>

        {/* Left Card (Hidden on Mobile) */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 mt-16 hidden lg:block">
          <Image
            src="/images/Frame 1707482516.png"
            alt="Left Card"
            width={500}
            height={500}
            className="w-[500px] h-auto"
          />
        </div>

        {/* Main Phone */}
        <div className="relative z-20">
          <Image
            src="/images/Group 1171275467.png"
            alt="Main Phone"
            width={500}
            height={500}
            className="h-auto w-[260px] sm:w-[360px] md:w-[420px] lg:w-[500px] mt-8 lg:mt-8 rounded-2xl "
          />
        </div>

        {/* Right Card (Hidden on Mobile) */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 mt-16 hidden lg:block">
          <Image
            src="/images/Group 1171275392.png"
            alt="Right Card"
            width={500}
            height={500}
            className="w-[500px] h-auto"
          />
        </div>
      </div>

      {/* Bottom Section with Avatars, Heading, Text, Buttons */}
      <div className="w-full flex flex-col items-center pb-24 gap-4 relative px-4 sm:px-8">
        {/* Avatar Section */}
        <div className="flex items-center gap-3">
          <AvatarGroup
            max={3}
            sx={{
              "& .MuiAvatar-root": {
                width: 54,
                height: 54,
                border: "1px solid white",
              },
            }}
          >
            <Avatar src="/images/avatar (1).png" />
            <Avatar src="/images/avatar.png" />
            <Avatar src="/images/avatar (2).png" />
          </AvatarGroup>

          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <span className="text-2xl font-bold">59,182</span>
            <span className="text-gray-600 font-base">Happy Users</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] font-bold text-center mt-4">
          Your AI Health Coach
        </h2>

        {/* Subtext */}
        <p className="max-w-[35rem] mx-auto text-gray-500 text-base sm:text-[1.1rem] font-medium text-center mt-2">
          Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="flex items-center gap-3 px-6 py-3 bg-white rounded-full hover:bg-gray-200 transition">
            <Image
              src="/images/Logo (1).png"
              alt="App Store"
              width={25}
              height={25}
            />
            <div className="text-left leading-tight">
              <p className="text-[1rem] font-bold">App Store</p>
            </div>
          </button>

          <button className="flex items-center gap-3 px-6 py-3 bg-white rounded-full hover:bg-gray-200 transition">
            <Image
              src="/images/Logo (2).png"
              alt="Google Play"
              width={25}
              height={25}
            />
            <div className="text-left leading-tight">
              <p className="text-[1rem] font-bold">Google Play</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
