"use client";

import { assets } from "@/public";
import { useAuthStore } from "@/store/auth_store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearch, IoCartOutline, IoMenu } from "react-icons/io5";
import { LiaUserCircleSolid } from "react-icons/lia";

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
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    push("/?login=true");
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    push("/?signup=true");
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!toggleMenu) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggleMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleMenu]);

  return (
    <header className="py-4 bg-white md:px-40 px-4 border-b-2 border-gray-200">
      <nav className="flex justify-between gap-6 md:gap-0 items-center">
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
        <div className="hidden md:flex gap-12">
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
              <button
                onClick={handleLoginClick}
                className="hover:border-b-2 hidden md:block"
              >
                Login
              </button>
              <button
                onClick={handleRegisterClick}
                className="hover:border-b-2 hidden md:block"
              >
                Register
              </button>
              <button onClick={handleMenuToggle} className="md:hidden">
                {toggleMenu ? (
                  <IoMdClose size={24} className="cursor-pointer" />
                ) : (
                  <IoMenu size={24} className="cursor-pointer" />
                )}
              </button>
            </div>
          )}
        </div>
        {toggleMenu && (
          <div
            ref={menuRef}
            className="absolute top-16 right-4 bg-white shadow-lg rounded-lg px-4 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.link}
                    className={`block px-4 py-2 ${pathName !== link.link ? "text-gray-500" : "font-semibold"}`}
                    onClick={() => setToggleMenu(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {!isAuthenticated && (
                <div className="border-t border-gray-200 my-2 z-10">
                  <button
                    onClick={handleLoginClick}
                    className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition-colors font-medium text-gray-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="w-full text-left px-4 py-2 rounded hover:bg-blue-100 transition-colors font-medium text-blue-700"
                  >
                    Register
                  </button>
                </div>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
