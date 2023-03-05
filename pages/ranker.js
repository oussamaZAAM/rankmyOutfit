import Head from "next/head";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../styles/Home.module.css";

const Ranker = () => {
  // Handle Drag and Drop Images
  const onDrop = useCallback(async acceptedFiles => {
    if (acceptedFiles[0].type.split('/')[0] === 'image') {
      // const file = acceptedFiles[0];

      // // Cloud
      // const formData = new FormData();
      // formData.append("image", file);

      // // Local
      // const base64 = await convertToBase64(file);

      // var stringLength = base64.length - "data:image/png;base64,".length;

      // var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;

      // if (sizeInBytes >= 5000000) {
      //   // MAX 30MB, here 5MB 😏
      //   alert("Image too Large! Maximum size is 5MB");
      // } else {
      //   setImage(base64);
      //   setProfile(formData);
      //   setEdit(true);
      // }
    } else {
      alert('Please drag an image');
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <>
      <Head>
        <title>rankmyOutfit - AI Ranker</title>
        <meta name="description" content="Make sure you look your Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-8 w-full">
        <div className="md:col-start-2 col-span-8 md:col-span-6 flex flex-col justify-center items-center shadow-md rounded bg-[url('/images/sunTornado1.png')]">
          <h3 className="font-title font-black text-4xl text-black drop-shadow mt-8 mb-4 tracking-wide">
            Rate your
          </h3>

          <h3 className="font-title font-black text-5xl text-white drop-shadow mb-8 tracking-wide">
            Outfit
          </h3>

          <div
            className={
              "flex flex-col justify-center items-center shadow-lg rounded-[36px] mx-2 px-8 sm:px-16 py-4 mb-8 cursor-pointer hover:bg-my-pink1 group " +
              styles.boxshadow
            }
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="relative flex flex-col justify-center items-center">
              <Image
                width={200}
                height={200}
                className={"w-16 h-16 block object-cover z-10 "+(isDragActive && 'animate-bouncing')}
                src="/images/animations/upload-arrow.png"
                alt="Upload"
              />
              <Image
                width={200}
                height={200}
                className="absolute w-16 h-16 block object-cover z-0"
                src="/images/animations/upload-base.png"
                alt="Upload"
              />
            </div>
            <b className="font-display font-medium text-lg mobile:text-xl text-white group-hover:text-black sm:group-hover:font-bold">
              Upload your Images
            </b>
            <p className="text-xs text-white font-medium font-display group-hover:text-black sm:group-hover:font-bold">
              You can add up to 4 images. Only .png .jpg, jpeg files
            </p>
          </div>

          <div className="flex justify-start items-center w-full max-w-sm sm:max-w-md px-2 mb-8">
            <li className="text-white text-xs font-medium font-display">
              To protect your privacy, the images are processed in your browser
              side, so the operation may take some while.
            </li>
          </div>

          <button className="h-12 w-44 text-center bg-black rounded-3xl mb-8">
            <p className="font-display text-white text-xl">Process</p>
          </button>

          <div className="flex justify-start items-center w-full max-w-sm sm:max-w-md px-2 mb-8">
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
