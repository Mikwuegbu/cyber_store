"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { HiOutlineCamera, HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { IoIosLaptop } from "react-icons/io";
import { IoGameControllerOutline, IoWatchOutline } from "react-icons/io5";
import { LiaHeadphonesSolid } from "react-icons/lia";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Categories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 6;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="py-20 px-40 grid justify-center gap-6">
      <div className="flex justify-between">
        <h2 className="font-medium text-2xl">Browse by category</h2>
        <div className="gap-6 flex">
          <button
            onClick={() => scroll("left")}
            className="hover:cursor-pointer"
          >
            <MdArrowBackIos size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hover:cursor-pointer"
          >
            <MdArrowForwardIos size={20} />
          </button>
        </div>
      </div>
      <section
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {[
          {
            icon: <HiOutlineDevicePhoneMobile className="text-2xl" />,
            label: "Phones",
            link: "/phones",
          },
          {
            icon: <IoWatchOutline size={32} />,
            label: "Smart Watches",
            link: "/smartwatches",
          },
          {
            icon: <HiOutlineCamera size={32} />,
            label: "Cameras",
            link: "/cameras",
          },
          {
            icon: <LiaHeadphonesSolid size={32} />,
            label: "Headphones",
            link: "/headphones",
          },
          {
            icon: <IoIosLaptop size={32} />,
            label: "Computers",
            link: "/computers",
          },

          {
            icon: <IoGameControllerOutline size={32} />,
            label: "Gaming",
            link: "/gaming",
          },
          {
            icon: <HiOutlineCamera size={32} />,
            label: "Cameras",
            link: "/cameras",
          },
          {
            icon: <HiOutlineDevicePhoneMobile className="text-2xl" />,
            label: "Phones",
            link: "/phones",
          },
          {
            icon: <IoWatchOutline size={32} />,
            label: "Smart Watches",
            link: "/smartwatches",
          },
          {
            icon: <LiaHeadphonesSolid size={32} />,
            label: "Headphones",
            link: "/headphones",
          },
          {
            icon: <IoIosLaptop size={32} />,
            label: "Computers",
            link: "/computers",
          },

          {
            icon: <IoGameControllerOutline size={32} />,
            label: "Gaming",
            link: "/gaming",
          },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="w-[16.66%] flex-shrink-0 h-32 bg-gray-100 rounded-lg p-4 grid place-items-center hover:bg-gray-200 transition-colors"
          >
            {item.icon}
            <p className="text-center font-medium text-xs opacity-80 mt-2">
              {item.label}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Categories;
