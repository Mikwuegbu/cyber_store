import React from "react";
import { assets } from "@/public";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <main>
      <section className="bg-black flex justify-around items-center px-40 ">
        <div className="text-white max-w-md p-2 m-4 gap-3 grid justify-start">
          <p>pro beyounf</p>
          <p>pro beyound me coming home</p> <p>pro beyounf</p>
          <Link href="/">shop now</Link>
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
      <section></section>
    </main>
  );
};
export default Hero;
