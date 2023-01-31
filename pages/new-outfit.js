import Head from "next/head";
import { useState } from "react";

import { MdAdd } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";

import styles from "../styles/Home.module.css";

const newOutfit = () => {
  const [images, setImages] = useState(["", "", "", ""]);

  //Functions
  const handleChange = async (e, index) => {
    const file = e.target.files[0];
    console.log(index);
    const base64 = await convertToBase64(file);
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = base64;
      return newImages;
    });
    e.target.value = "";
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        alert("Please pick an image");
      } else {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      }
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const deleteImage = (e, index) => {
    e.preventDefault();
    setImages((prevImages) => {
      // const newImages = prevImages.filter(
      //   (image) => prevImages.indexOf(image) !== index
      // );
      var newImages = [...prevImages];
      newImages[index] = '';
      return newImages;
    });
  };

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
                {/* Image 1  */}
                <div className="relative rounded-3xl mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 transition duration-200">
                  {images[0] ? (
                    <img
                      className="block object-cover w-full h-full rounded-3xl bg-gray-500"
                      src={images[0]}
                    />
                  ) : (
                    <div className="block object-cover w-full h-full rounded-3xl bg-gray-500">
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                        {/* <div className="flex justify-center items-center h-full w-full"> */}
                        <p className="font-title font-bold text-white text-base text-center">
                          Empty
                        </p>
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
                    <div className="flex justify-center items-center h-full w-full">
                      {!images[0] ? (
                        <label htmlFor="upload0">
                          <MdAdd size={30} color="white" />
                          <input
                            onChange={(e) => handleChange(e, 0)}
                            type="file"
                            id="upload0"
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </label>
                      ) : (
                        <div className="flex justify-center items-center space-x-8">
                          <label htmlFor="reupload0">
                            <RiImageEditLine size={25} color="white" />
                            <input
                              onChange={(e) => handleChange(e, 0)}
                              type="file"
                              id="reupload0"
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </label>
                          <TiCancel
                            onClick={(e) => deleteImage(e, 0)}
                            size={25}
                            color="white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image 2 */}
                <div className="relative rounded-3xl mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 transition duration-200">
                  {images[1] ? (
                    <img
                      className="block object-cover w-full h-full rounded-3xl bg-gray-500"
                      src={images[1]}
                    />
                  ) : (
                    <div className="block object-cover w-full h-full rounded-3xl bg-gray-500">
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                        {/* <div className="flex justify-center items-center h-full w-full"> */}
                        <p className="font-title font-bold text-white text-base text-center">
                          Empty
                        </p>
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
                    <div className="flex justify-center items-center h-full w-full">
                      {!images[1] ? (
                        <label htmlFor="upload1">
                          <MdAdd size={30} color="white" />
                          <input
                            onChange={(e) => handleChange(e, 1)}
                            type="file"
                            id="upload1"
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </label>
                      ) : (
                        <div className="flex justify-center items-center space-x-8">
                          <label htmlFor="reupload1">
                            <RiImageEditLine size={25} color="white" />
                            <input
                              onChange={(e) => handleChange(e, 1)}
                              type="file"
                              id="reupload1"
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </label>
                          <TiCancel
                            onClick={(e) => deleteImage(e, 1)}
                            size={25}
                            color="white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image 3 */}
                <div className="relative rounded-3xl mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 transition duration-200">
                  {images[2] ? (
                    <img
                      className="block object-cover w-full h-full rounded-3xl bg-gray-500"
                      src={images[2]}
                    />
                  ) : (
                    <div className="block object-cover w-full h-full rounded-3xl bg-gray-500">
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                        {/* <div className="flex justify-center items-center h-full w-full"> */}
                        <p className="font-title font-bold text-white text-base text-center">
                          Empty
                        </p>
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
                    <div className="flex justify-center items-center h-full w-full">
                      {!images[2] ? (
                        <label htmlFor="upload2">
                          <MdAdd size={30} color="white" />
                          <input
                            onChange={(e) => handleChange(e, 2)}
                            type="file"
                            id="upload2"
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </label>
                      ) : (
                        <div className="flex justify-center items-center space-x-8">
                          <label htmlFor="reupload2">
                            <RiImageEditLine size={25} color="white" />
                            <input
                              onChange={(e) => handleChange(e, 2)}
                              type="file"
                              id="reupload2"
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </label>
                          <TiCancel
                            onClick={(e) => deleteImage(e, 2)}
                            size={25}
                            color="white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image 4 */}
                <div className="relative rounded-3xl mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 transition duration-200">
                  {images[3] ? (
                    <img
                      className="block object-cover w-full h-full rounded-3xl bg-gray-500"
                      src={images[3]}
                    />
                  ) : (
                    <div className="block object-cover w-full h-full rounded-3xl bg-gray-500">
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                        {/* <div className="flex justify-center items-center h-full w-full"> */}
                        <p className="font-title font-bold text-white text-base text-center">
                          Empty
                        </p>
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
                    <div className="flex justify-center items-center h-full w-full">
                      {!images[3] ? (
                        <label htmlFor="upload3">
                          <MdAdd size={30} color="white" />
                          <input
                            onChange={(e) => handleChange(e, 3)}
                            type="file"
                            id="upload3"
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </label>
                      ) : (
                        <div className="flex justify-center items-center space-x-8">
                          <label htmlFor="reupload3">
                            <RiImageEditLine size={25} color="white" />
                            <input
                              onChange={(e) => handleChange(e, 3)}
                              type="file"
                              id="reupload3"
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </label>
                          <TiCancel
                            onClick={(e) => deleteImage(e, 3)}
                            size={25}
                            color="white"
                          />
                        </div>
                      )}
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
