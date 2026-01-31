"use client";

import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="bg-[#FCFCFD] pt-20">
      <div className=" px-24">

        {/* Top Grid */}
        <div className="flex justify-between gap-16">

          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2">
              {/* Replace later with your logo */}
              <Image src="/images/Logo.png" alt="Reppoo" 
            width={1000}
            height={1000}
            className="w-[100px] sm:w-[120px] md:w-[130px] h-auto"/>
            </div>

            <p className="text-gray-600 mt-4 max-w-[30rem] leading-relaxed">
              innovative health assistant app that leverages artificial
              intelligence to provide personalized wellness recommendations.
            </p>

            <p className="text-gray-700 mt-4">hello@reppoo.com</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/early-access">Early Access</Link></li>
              <li><Link href="/404">404</Link></li>
            </ul>
          </div>

          {/* App */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">App</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/">Download For IOS</Link></li>
              <li><Link href="/">Download For Android</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal Pages</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">

          <p className="text-gray-700 text-sm">
            © Copyright Reppoo
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {[
              { icon: <FacebookIcon />, link: "#" },
              { icon: <TwitterIcon />, link: "#" },
              { icon: <InstagramIcon />, link: "#" },
              { icon: <LinkedInIcon />, link: "#" },
            ].map((s, i) => (
              <Link
                key={i}
                href={s.link}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                {s.icon}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
