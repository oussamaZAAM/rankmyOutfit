import Head from "next/head";
import styles from "../styles/Home.module.css";

const Ranker = () => {
  return (
    <>
      <Head>
        <title>rankmyOutfit - AI Ranker</title>
        <meta name="description" content="Make sure you look your Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-8 w-full">
        <div className="md:col-start-2 col-span-8 md:col-span-6 flex flex-col justify-center items-center shadow-md background-image rounded">
          <h3 className="font-title font-black text-4xl drop-shadow-lg text-black drop-shadow mt-8 mb-4 tracking-wide">
            Rate your
          </h3>

          <h3 className="font-title font-black text-5xl drop-shadow-lg text-white drop-shadow mb-8 tracking-wide">
            Outfit
          </h3>

          <div
            className={
              "flex flex-col justify-center items-center shadow-lg rounded-full mx-2 px-8 sm:px-16 py-4 mb-8 cursor-pointer hover:bg-my-pink1 group " +
              styles.boxshadow
            }
          >
            <b className="font-display font-medium text-lg mobile:text-xl text-white group-hover:text-black sm:group-hover:font-bold">
              Upload your Images
            </b>
            <p className="text-xs text-white font-medium font-display group-hover:text-black sm:group-hover:font-bold">
              You can add up to 4 images. Only .png .jpg, jpeg files
            </p>
          </div>

          <div className="flex justify-start items-center w-full max-w-sm sm:max-w-md mx-2 mb-8">
            <li className="text-white text-xs font-medium font-display">
              To protect your privacy, the images are processed in your browser
              side, so the operation may take some while.
            </li>
          </div>

          <button className="h-12 w-44 text-center bg-black rounded-3xl mb-8">
            <p className="font-display text-white text-xl">Process</p>
          </button>

          <div className="flex justify-start items-center w-full max-w-sm sm:max-w-md mx-2 mb-8">
            <li className="text-white text-xs font-medium font-display">
              While waiting, you can vote other people’s outfits.
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranker;
