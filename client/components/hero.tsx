"use client";

import React from "react";
import { assets } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useMobileScreen } from "@/hooks/use-mobile-screen";
const Hero = () => {
  const isMobile = useMobileScreen();

  return (
    <main>
      {/* Main Hero Section */}
      <section className="bg-black md:flex md:justify-around items-center pt-6 md:px-40 px-4 ">
        <div className="text-white md:min-w-md p-2 m-4 gap-4 grid md:justify-start place-items-center md:place-items-start">
          <p className="text-2xl text-center md:text-justify font-semibold opacity-40 leading-8">
            Pro.Beyond.
          </p>
          <p className="md:text-8xl text-7xl text-center md:text-justify font-[100]">
            IPhone 14{" "}
            <span className="font-semibold">
              <br className="block md:hidden" /> Pro
            </span>
          </p>
          <p className="text-lg font-medium leading-6 text-center md:text-justify opacity-60 mb:0 mb-4">
            Created to change everything for the better. For everyone
          </p>
          <Link
            href="/"
            className="border w-fit text-center rounded-md p-4 md:px-10 px-14 border-white font-medium text-base leading-6"
          >
            shop now
          </Link>
        </div>
        <div className="px-4 md:px-0">
          <Image
            src={assets.hero}
            alt="iphone"
            width={400}
            height={600}
            className="w-96 h-full"
          />
        </div>
      </section>
      {/* CTO */}
      <section className="grid md:grid-cols-2">
        <div className="bg-black grid grid-col-2">
          <div className="bg-white md:flex items-center">
            <Image
              src={isMobile ? assets.playstation_mobile : assets.playstation}
              alt="playstation"
              height={343}
              width={360}
              className="w-96 h-full"
            />
            <div className="max-w-96 w-80 space-y-4">
              <p className="font-medium text-5xl leading-10">Playstation 5</p>
              <p className="font-medium text-sm opacity-70 leading-6 pr-4">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>
          <div className="grid md:grid-flow-col">
            <div className="bg-gray-200 md:flex items-center">
              <Image
                src={assets.airpod}
                alt="airpod"
                height={272}
                width={104}
                className="w-28 h-full"
              />
              <div className="w-40 h-32 pl-4">
                <p className="font-light text-3xl leading-10">
                  Apple AirPods <span className="font-medium">Max</span>
                </p>
                <p className="font-medium text-sm opacity-70 leading-6 pr-4">
                  Computational audio. Listen, it's powerful
                </p>
              </div>
            </div>
            <div className="bg-gray-black md:flex items-center">
              <Image
                src={assets.applevission}
                alt="airpod"
                height={190}
                width={136}
                className="w-36 h-48"
              />
              <div className="w-40 h-20 text-white pl-4">
                <p className="font-light text-3xl leading-10">
                  Apple Vision <span className="font-medium">Pro</span>
                </p>
                <p className="font-medium text-sm opacity-50 leading-6">
                  An immersive way to experience entertainment
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 flex items-center justify-center">
          <div className="grid gap-4 w-96 max-w-80">
            <p className="font-[100] text-6xl leading-10">
              Macbook <span className="font-medium">Air</span>
            </p>
            <p className="font-medium text-sm opacity-70 leading-6">
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <Link
              href="/"
              className="border w-fit rounded-md p-4 px-10 font-medium text-base leading-6"
            >
              shop now
            </Link>
          </div>
          <Image
            src={assets.macbook}
            alt="macbook"
            height={502}
            width={292}
            className="w-72 h-[502px]"
          />
        </div>
      </section>
    </main>
  );
};
export default Hero;
