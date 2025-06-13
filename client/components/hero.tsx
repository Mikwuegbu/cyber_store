import React from "react";
import { assets } from "@/public";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <main>
      <section className="bg-black flex justify-around items-center px-40 ">
        <div className="text-white min-w-md p-2 m-4 gap-3 grid justify-start">
          <p className="text-2xl font-semibold opacity-40 leading-8">
            Pro.Beyond.
          </p>
          <p className="text-8xl font-[100]">
            IPhone 14 <span className="font-semibold"> Pro</span>
          </p>
          <p className="text-lg font-medium leading-6 text-black opacity-60">
            Created to change everything for the better. For everyone
          </p>
          <Link
            href="/"
            className="border w-fit rounded-md p-4 px-10 border-white font-medium text-base leading-6"
          >
            shop now
          </Link>
        </div>
        <div>
          <Image
            src={assets.hero}
            alt="iphone"
            width={400}
            height={600}
            className="w-96 h-full"
          />
        </div>
      </section>
      <section className="grid grid-cols-2">
        <div className="bg-black grid grid-col-2">
          <div className="bg-white flex items-center">
            <Image
              src={assets.playstation}
              alt="playstation"
              height={343}
              width={360}
              className="w-96 h-full"
            />
            <div className="max-w-96 w-80 space-y-4">
              <p className="font-medium text-5xl text-black leading-10">
                Playstation 5
              </p>
              <p className="font-medium text-sm opacity-60 leading-6 pr-4">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>
          <div className="grid grid-flow-col">
            <div className="bg-gray-200 flex items-center">
              <Image
                src={assets.airpod}
                alt="airpod"
                height={272}
                width={104}
                className="w-28 h-full"
              />
              <div className="max-w-96 w-80 space-y-4">
                <p className="font-light text-3xl text-black leading-10">
                  Apple AirPods <span className="font-medium">Max</span>
                </p>
                <p className="font-medium text-sm opacity-60 leading-6 pr-4">
                  Computational audio. Listen, it's powerful
                </p>
              </div>
            </div>
            <div className="bg-gray-black flex items-center">
              <Image
                src={assets.applevission}
                alt="airpod"
                height={272}
                width={104}
                className="w-28 h-full"
              />
              <div className="max-w-96 w-80 space-y-4 text-white">
                <p className="font-light text-3xl text-black leading-10">
                  Apple AirPods <span className="font-medium">Max</span>
                </p>
                <p className="font-medium text-sm opacity-60 leading-6 pr-4">
                  Computational audio. Listen, it's powerful
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-200">2</div>
      </section>
    </main>
  );
};
export default Hero;
