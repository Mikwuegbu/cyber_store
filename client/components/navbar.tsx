"use client";

import { assets } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch, IoCartOutline } from "react-icons/io5";

const navLinks = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
  {
    label: "Blog",
    link: "/blog",
  },
];

const NavBar = () => {
  const pathName = usePathname();

  return (
    <header className="py-4 px-40">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={assets.logo}
            width={100}
            height={100}
            alt="logo"
            className="cursor-pointer w-16 h-8"
          />
        </Link>
        <div className="bg-gray-100 h-10 rounded-lg relative flex items-center px-3 gap-4">
          <IoSearch className="text-gray-400" />
          <input
            className="bg-transparent border-none outline-none w-full placeholder:text-gray-400 placeholder:text-sm"
            placeholder="Search"
          />
        </div>
        <div className="flex gap-12">
          {navLinks.map((link) => (
            <Link
              href={link.link}
              key={link.label}
              className={`cursor-pointer ${pathName !== link.link ? "text-gray-500" : "font-semibold"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/cart">
            <IoCartOutline size={24} className="cursor-pointer" />
          </Link>
          <Link href="/login" className="hover:border-b-2">
            Login
          </Link>
          <Link href="/register" className="hover:border-b-2">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
