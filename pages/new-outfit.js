import Head from "next/head";

import empty from "../public/images/empty.jpg";

import styles from "../styles/Home.module.css";

const newOutfit = () => {
  return (
    <>
      <Head>
        <title>rankmyOutfit - Post new Outfits</title>
        <meta name="description" content="Make sure you look your Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-8 w-full">
        <div className="lg:col-start-2 col-span-8 lg:col-span-6 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center rounded-3xl bg-soft-pink w-full z-10">
            <div
              className={
                "flex flex-col justify-center items-center rounded px-4 my-4 fold:w-full mobile:w-10/12 " +
                styles.boxshadow
              }
            >
              <h3 className="font-title font-bold text-4xl drop-shadow-lg text-black    my-4">
                Add a New
              </h3>
              <h3 className="font-title font-bold text-4xl drop-shadow-lg text-my-pink2 mb-4">
                Outfit
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4">
                <div className="relative rounded-3xl mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 transition duration-200">
                  {/* <img
                    className="block object-cover w-full h-full rounded-3xl"
                    src={empty.src}
                    alt=""
                  /> */}
                  <div className="block object-cover w-full h-full rounded-3xl bg-gray-500"></div>
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
                    <div className="flex justify-center items-center ">
                      <p className="font-title font-bold text-white text-base">Empty</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative rounded-3xl mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 transition duration-200">
                  {/* <img
                    className="block object-cover w-full h-full rounded-3xl"
                    src={empty.src}
                    alt=""
                  /> */}
                  <div className="block object-cover w-full h-full rounded-3xl bg-gray-500"></div>
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
                    <div className="flex justify-center items-center ">
                      <p className="font-title font-bold text-white text-base">Empty</p>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-3xl mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 transition duration-200">
                  {/* <img
                    className="block object-cover w-full h-full rounded-3xl"
                    src={empty.src}
                    alt=""
                  /> */}
                  <div className="block object-cover w-full h-full rounded-3xl bg-gray-500"></div>
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
                    <div className="flex justify-center items-center ">
                      <p className="font-title font-bold text-white text-base">Empty</p>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-3xl mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 transition duration-200">
                  {/* <img
                    className="block object-cover w-full h-full rounded-3xl"
                    src={empty.src}
                    alt=""
                  /> */}
                  <div className="block object-cover w-full h-full rounded-3xl bg-gray-500"></div>
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
                    <div className="flex justify-center items-center ">
                      <p className="font-title font-bold text-white text-base">Empty</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex justify-center items-center my-4">
                <button className="h-12 w-44 text-center bg-my-purple rounded-3xl">
                  <p className="font-display text-white text-xl">Add</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default newOutfit;
