import React from "react";
import Image, { StaticImageData } from "next/image";
import { GoHeart } from "react-icons/go";
import { useMobileScreen } from "@/hooks/use-mobile-screen";

type Productcardprops = {
  price: number;
  description: string;
  image: StaticImageData;
};
const Productcard = ({ description, price, image }: Productcardprops) => {
  const isMobile = useMobileScreen();

  return (
    <section className="bg-gray-100 p-4 relative rounded-lg pt-12 gap-4 justify-center grid place-items-center">
      {/* react icon */}
      <GoHeart size={24} className="absolute top-4 right-4 text-gray-600" />
      <Image
        src={image}
        alt="iphone"
        width={160}
        height={160}
        className="size-24 md:size-40"
      />
      <div className="text-center md:space-y-4">
        {isMobile && description.length > 24
          ? description.slice(0, 24) + "..."
          : description}
        <p className="font-semibold text-2xl l</span>eading-6">$ {price}</p>
      </div>
      <button className="font-medium text-sm leading-6 text-nowrap text-white bg-black py-3 md:px-16 px-10 rounded-lg">
        Buy now
      </button>
    </section>
  );
};
export default Productcard;
