import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-900 min-h-[600px] relative overflow-hidden">
      <div className="container mx-auto px-4 py-36 flex flex-col lg:flex-row flex-wrap items-center justify-between">
        <div className="w-full lg:w-1/2 text-white">Text</div>
        <div className="w-full lg:w-1/2">Image</div>
      </div>
    </div>
  );
};

export default Hero;
