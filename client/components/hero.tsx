"use client";

import React from "react";
import { assets } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { useMobileScreen } from "@/hooks/use-mobile-screen";
const Hero = () => {
  const isMobile = useMobileScreen();

  return (
    <main className="overflow-hidden">
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
            className="border w-fit text-center rounded-md p-3 md:p-4 md:px-10 px-14 border-white font-medium text-base leading-6"
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
      <section className="md:flex w-full md:h-[600px]">
        <div className="bg-black h-full w-full flex flex-col basis-1/2">
          <div className="bg-white flex md:flex-row flex-col w-full h-1/2 py-10 md:py-0 items-center justify-center md:justify-around">
            <Image
              src={isMobile ? assets.playstation_mobile : assets.playstation}
              alt="playstation"
              height={300}
              width={300}
              className="w-1/2 h-full"
            />
            <div className="space-y-4 text-center md:text-justify px-4 md:px-8 py-6 md:py-0">
              <p className="font-medium text-5xl leading-10">Playstation 5</p>
              <p className="font-medium text-sm opacity-70 leading-6">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>
          <div className="md:flex w-full md:h-1/2 md:justify-around justify-center">
            <div className="bg-gray-200 flex md:flex-row flex-col py-10 md:py-0 items-center justify-center md:justify-around md:basis-1/2 gap-4">
              <Image
                // src={assets.airpod}
                src={isMobile ? assets.airpods_mobile : assets.airpod}
                alt="airpod"
                height={300}
                width={300}
                className="md:w-1/3 w-1/2"
              />
              <div className="space-y-2 px-2 text-center md:text-justify">
                <p className="font-light text-3xl leading-10">
                  Apple <br className="hidden md:block" /> AirPods{" "}
                  <br className="hidden md:block" />{" "}
                  <span className="font-medium">Max</span>
                </p>
                <p className="font-medium text-sm opacity-70 leading-6 pr-4">
                  Computational audio. Listen, it's powerful
                </p>
              </div>
            </div>
            <div className="bg-gray-black flex md:flex-row flex-col md:justify-around justify-center py-10 md:py-0 items-center md:basis-1/2 gap-4 ">
              <Image
                // src={assets.applevission}
                src={isMobile ? assets.googles_mobile : assets.applevission}
                alt="airpod"
                height={300}
                width={300}
                className="md:w-1/3"
              />
              <div className="text-white px-2 text-center md:text-justify space-y-2">
                <p className="font-light text-3xl leading-10">
                  Apple <br className="hidden md:block" />
                  Vision <span className="font-medium">Pro</span>
                </p>
                <p className="font-medium text-sm opacity-50 leading-6">
                  An immersive way to experience entertainment
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 flex flex-col py-10 md:py-0 md:flex-row w-full h-full items-center gap-2 justify-center md:justify-between md:basis-1/2">
          <div className="grid gap-4 md:px-14 px-4 order-2 md:order-1 text-center md:text-justify">
            <p className="font-[100] md:text-6xl text-3xl">
              Macbook <br className="hidden md:block" />
              <span className="font-medium">Air</span>
            </p>
            <p className="font-medium text-sm opacity-70 leading-6">
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <Link
              href="/"
              className="border border-black md:w-fit rounded-md p-3 md:p-4 px-10 font-medium text-base leading-6"
            >
              shop now
            </Link>
          </div>
          <Image
            // src={assets.macbook}
            src={isMobile ? assets.macbook_mobile : assets.macbook}
            alt="macbook"
            height={500}
            width={300}
            className="w-3/4 order-1 md:order-2"
          />
        </div>
      </section>
    </main>
  );
};
export default Hero;
