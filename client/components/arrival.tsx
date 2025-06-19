import React from "react";
import Productcard from "./productcard";
import { assets } from "@/public";

const mockdata = [
  {
    id: 1,
    price: 900,
    description: "Apple iPhone 14 Pro Max 128GB Deep Purple ",
    image: assets.iphone14pro,
  },
  {
    id: 2,
    price: 2535,
    description: "Blackmagic Pocket Cinema Camera 6k ",
    image: assets.camera,
  },
  {
    id: 3,
    price: 399,
    description: "Apple Watch Series 9 GPS 41mm Starlight Aluminium ",
    image: assets.applewatch,
  },
  {
    id: 4,
    price: 549,
    description: "AirPods Max Silver Starlight Aluminium",
    image: assets.airpodmax,
  },
  {
    id: 5,
    price: 369,
    description: "Samsung Galaxy Watch6 Classic 47mm Black",
    image: assets.blackwatch,
  },
  {
    id: 6,
    price: 1799,
    description: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
    image: assets.galaxy,
  },
  {
    id: 7,
    price: 99.99,
    description: "Galaxy Buds FE Graphite",
    image: assets.buds,
  },
  {
    id: 8,
    price: 398,
    description: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    image: assets.ipad,
  },
];

export const Arrival = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {mockdata.map((item) => (
        <Productcard
          key={item.id}
          price={item.price}
          description={item.description}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default Arrival;
