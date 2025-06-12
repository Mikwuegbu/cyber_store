import { assets } from "@/app/assets";
import Image from "next/image";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="py-26 px-40 flex flex-col justify-center bg-black text-white">
      <div className="items-start flex justify-center gap-24">
        <div className="space-y-4 max-w-sm">
          <Image
            src={assets.logo_white}
            width={100}
            height={100}
            alt="logo"
            className="cursor-pointer w-16 h-8"
          />
          <p className="text-sm">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </p>
          <div className="flex space-x-4">
            <FaFacebookF />
            <FaInstagram />
            <IoLogoTwitter />
            <FaTiktok />
          </div>
        </div>
        <div className="flex gap-24 items-center">
          <div className="space-y-4">
            <h1 className="font-semibold text-xl">Services</h1>
            <div className="space-y-2 text-sm flex flex-col">
              {[
                {
                  title: "Bonus program",
                  link: "/",
                },
                {
                  title: "Gift cards",
                  link: "/",
                },
                {
                  title: "Credit Payment",
                  link: "/",
                },
                {
                  title: "Service contracts",
                  link: "/",
                },
                {
                  title: "Non-cash account",
                  link: "/",
                },
                {
                  title: "Payment",
                  link: "/",
                },
              ].map((service) => (
                <a href={service.link} key={service.title}>
                  {service.title}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-semibold text-xl">Assistance to the buyer</h1>
            <div className="space-y-2 text-sm flex flex-col">
              {[
                {
                  title: "Find an order",
                  link: "/",
                },
                {
                  title: "Terms of delivery",
                  link: "/",
                },
                {
                  title: "Exchange and return of goods",
                  link: "/",
                },
                {
                  title: "Guarantee",
                  link: "/",
                },
                {
                  title: "Frequently asked questions",
                  link: "/",
                },
                {
                  title: "Terms of use of the site",
                  link: "/",
                },
              ].map((service) => (
                <a href={service.link} key={service.title}>
                  {service.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
