"use client";

import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="bg-[#FCFCFD] pt-12 md:pt-16 lg:pt-20">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24">


        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-16">

          <div>
            <div className="flex items-center gap-2">
              <Image src="/images/Logo.png"
               alt="Reppoo" 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/early-access">Early Access</Link></li>
              <li><Link href="/404">404</Link></li>
            </ul>
          </div>

         
          <div>
            <h4 className="font-bold text-gray-900 mb-4">App</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/">Download For IOS</Link></li>
              <li><Link href="/">Download For Android</Link></li>
            </ul>
          </div>

    
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal Pages</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        </div>

     
        <div className="border-t border-gray-200 my-6 md:my-8"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pb-6 md:pb-8">

          <p className="text-gray-700 text-sm">
            © Copyright Reppoo
          </p>

 
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
