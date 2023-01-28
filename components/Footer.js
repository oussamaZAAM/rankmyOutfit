import React from "react";
import subBackground2 from "../public/images/sub-background2.png";
import {
  AiFillGoogleCircle,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <img
        className="h-64 sm:h-48 w-screen object-cover -mt-12 -mb-48 sm:-mb-32"
        src={subBackground2.src}
      />

      <div className="flex w-full">
          <div className="flex flex-col justify-center items-center w-full">

            {/* md: flex-row  */}
            <div className="flex flex-col sm:flex-row justify-around items-center w-full">
              {/* Left Part  */}
              <div className="flex flex-col justify-center items-center space-y-4 my-4">
                <div className="grid grid-cols-6 w-48 cursor-pointer">
                  <div className="flex justify-center items-center col-span-2">
                    <img src="/favicon.ico" alt="" width={30} />
                  </div>
                  <div className="flex justify-center items-center col-start-3 col-span-4">
                    <span
                      className="text-xl font-black font-display"
                      style={{ color: "#DB76DC" }}
                    >
                      rankmyOutfit
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-6 w-48">
                  <div className="col-span-2 hidden"></div>
                  <div className="flex justify-center items-center col-start-3 | cursor-pointer | hover:scale-125 duration-200 ease-out">
                    <AiFillGoogleCircle color="#EE88EE" />
                  </div>
                  <div className="flex justify-center items-center col-start-4 | cursor-pointer | hover:scale-125 duration-200 ease-out">
                    <AiFillGithub color="#EE88EE" />
                  </div>
                  <div className="flex justify-center items-center col-start-5 | cursor-pointer | hover:scale-125 duration-200 ease-out">
                    <AiFillInstagram color="#EE88EE" />
                  </div>
                  <div className="flex justify-center items-center col-start-6 | cursor-pointer | hover:scale-125 duration-200 ease-out">
                    <AiFillTwitterCircle color="#EE88EE" />
                  </div>
                </div>
              </div>
              {/* Right Part  */}
              <div className="flex sm:flex-col justify-center items-center sm:items-start | font-display text-md | space-x-4 sm:space-x-0 sm:space-y-4 my-4">
                <p className="cursor-pointer | hover:scale-110 duration-150 ease-out">
                  Terms of use
                </p>
                <p className="cursor-pointer | hover:scale-110 duration-150 ease-out">
                  Privacy Policy
                </p>
              </div>
            </div>
            <small>2023 © All Rights reserved</small>
          </div>
      </div>
    </div>
  );
};

export default Footer;
