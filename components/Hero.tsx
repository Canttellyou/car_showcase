"use client";
import Image from "next/image";
import { CustomButton } from ".";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find details about any car — quickly and easily.
        </h1>

        <p className="hero__subtitle">
          Streamline your car search experience process.
        </p>

        <CustomButton
          title={"Explore Cars"}
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
          btnType="button"
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src={"/hero.png"} alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay"></div>
      </div>
    </div>
  );
};

export default Hero;
