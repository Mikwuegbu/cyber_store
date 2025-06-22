"use client";

import { assets } from "@/public";
import { useAuthStore } from "@/store/auth_store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { LiaUserCircleSolid } from "react-icons/lia";
import { LuCircleUserRound } from "react-icons/lu";

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
  const { push } = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    push("/?login=true");
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    push("/?signup=true");
  };

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
          {isAuthenticated ? (
            <LiaUserCircleSolid size={24} className="cursor-pointer" />
          ) : (
            <div className="flex gap-4 items-center">
              <button onClick={handleLoginClick} className="hover:border-b-2">
                Login
              </button>
              <button
                onClick={handleRegisterClick}
                className="hover:border-b-2"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
