import React from "react";
import Image, { StaticImageData } from "next/image";

type Productcardprops = {
  price: number;
  description: string;
  image: StaticImageData;
};
const Productcard = ({ description, price, image }: Productcardprops) => {
  return (
    <section className="bg-gray-100 p-4 rounded-lg gap-4 grid place-items-center min-w-52 w-72">
      {/* react icon */}
      <Image
        src={image}
        alt="iphone"
        width={160}
        height={160}
        className="w-40 h-40"
      />
      <div className="text-center space-y-4">
        <p className="font-medium text-lg leading-7"> {description}</p>
        <p className="font-semibold text-2xl leading-6">$ {price}</p>
      </div>
      <button className="font-medium text-sm leading-6 text-white bg-black py-3 px-16 rounded-xl">
        Buy now
      </button>
    </section>
  );
};
export default Productcard;
