import axios from "axios";
import nookies from 'nookies';
import { getSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";

import FormData from 'form-data';
import Cropper from 'react-easy-crop'

import { MdAdd, MdOutlineCrop, MdDoneOutline } from "react-icons/md";
import { RiImageEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const NewOutfit = () => {
  const [loading, setLoading] = useState(false)
  const [upLoading, setUpLoading] = useState(false)

  const [images, setImages] = useState([{}, {}, {}, {}]);
  const [savedImages, setSavedImages] = useState([]);

  const [outfitState, setOutfitState] = useState('none');
  
  // ----------------------------Functions----------------------------------
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels, index) => {
    const widthScale = 100 - croppedArea.width;
    const left = widthScale === 0 ? 0 : (croppedArea.x / widthScale) * 100;
    const heightScale = 100 - croppedArea.height;
    const top = heightScale === 0 ? 0 : (croppedArea.y / heightScale) * 100;
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = {...newImages[index], position: {left: left, top: top}};
      return newImages;
    });
  }, [])
  
  // Preview images and fill images state
  const handleChange = async (e, index) => {
    const file = e.target.files[0];

    // Cloud
    const formData = new FormData();
    formData.append('image', file)

    // Local
    const base64 = await convertToBase64(file);

    var stringLength = base64.length - 'data:image/png;base64,'.length;

    var sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;

    if (sizeInBytes >= 5000000){ // MAX 30MB, here 5MB 😏
      alert("Image too Large! Maximum size is 5MB")
    } else {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = {local: base64, formData: formData, isCropped: true, crop: {x: 0, y: 0}};
        return newImages;
      });
    }
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

  // Delete images from images state
  const deleteImage = (e, index) => {
    e.preventDefault();
    setImages((prevImages) => {
      var newImages = [...prevImages];
      newImages[index] = {};
      return newImages;
    });
  };

  // Handle isCropped state
  const enableCropImage = (index, boolean) => {
    setImages(prevList => {
      const newList = [...prevList]
      newList[index] = {...newList[index], isCropped: boolean}
      return newList;
    })
  }

  // Handle Drag and Drop Images
  const onDrop = async (acceptedFiles) => {
    acceptedFiles.some(file => {
      if (file.type.split('/')[0] !== 'image') {
        alert('Please drag only images!');
      }
    })
    const acceptedImages = acceptedFiles.filter((file) => file.type.split('/')[0] === 'image');
    const emptyImagesCells = images.filter((image) => Object.keys(image).length === 0);
    if (acceptedImages.length <= 4) {
      if (emptyImagesCells.length < acceptedImages.length) {
        if (confirm('Do you want to overwrite the uploaded images ?')) {
          void(0);
        } else {
          return 0;
        }
      }
    } else {
      alert(acceptedImages.length + ' detected, only 4 will be accepted')
    }
    
    for (let i=0; i<acceptedImages.length; i++) {
      if ((acceptedImages[i].type.split('/')[0] === 'image') && (i < 4)) {
        // Cloud
        const formData = new FormData();
        formData.append('image', acceptedImages[i])

        // Local
        const base64 = await convertToBase64(acceptedImages[i]);

        var stringLength = base64.length - 'data:image/png;base64,'.length;

        var sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;

        if (sizeInBytes >= 5000000){ // MAX 30MB, here 5MB 😏
          alert("Image too Large! Maximum size is 5MB")
        } else {
          setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.push({local: base64, formData: formData, isCropped: true, crop: {x: 0, y: 0}});
            return newImages;
          });
        }
      }
    };
    setImages((prevImages) => {
      const newImages = [...prevImages];
      var filteredImages = newImages.filter(image =>Object.keys(image).length !== 0);
      if (filteredImages.length < 4) {
        const length = filteredImages.length;
        for (let i=4 ; i>length ; i--) {
          filteredImages.push({});
        }
      }
      if (filteredImages.length > 4) {
        filteredImages = filteredImages.slice(-4);
      }
      return filteredImages;
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const addOutfit = async () => {
    // Run conditions on the images
    const filteredImages = images.filter((image) => image.local && image.formData && image.position);
    if (filteredImages.length === 0) {
      alert('Please import at least one image')
      } else {
      filteredImages.forEach((image) => {
        if (image.isCropped){
          setImages(prevList => {
            const newList = [...prevList]
            const index = prevList.indexOf(image)
            newList[index] = {...newList[index], error: true}
            return newList;
          })
        }
      })
      if (filteredImages.every((image) => image.error === false)){
          for (let i=0; i<filteredImages.length; i++) {
              // Upload to IMGBB
              setUpLoading(true);
              await axios.post('https://encouraging-gold-gabardine.cyclic.app/api/upload', filteredImages[i].formData)
              // await axios.post('http://localhost:5000/api/upload', filteredImages[i].formData)
                .then((response) => {
                  if (filteredImages.length > 1) {
                    setSavedImages((prevList) => {
                      const newList = prevList;
                      newList.push({
                        url: response.data.url,
                        delete: response.data.delete_url,
                        position: filteredImages[i].position
                      });
                      return newList;
                    });
                  } else {
                    // Upload the images' URLs to the DB
                    const data = [{
                      url: response.data.url,
                      delete: response.data.delete_url,
                      position: filteredImages[i].position
                    }]
                    const sendOutfit = async () => {
                        const toSentData = {
                          image: data,
                        };
                        await axios.post("/api/outfits", JSON.stringify(toSentData), {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        });
                    };
                    setLoading(true);
                    sendOutfit();
                    setLoading(false);
                    setSavedImages([]);
                    setOutfitState('posted');
                  }
                })
                .catch((error) => alert(error.message))
              setUpLoading(false);
          }
          if (filteredImages.length > 1){
              // Upload the images' URLs to the DB
              const sendOutfit = async() => {
                  const toSentData = {
                    image: savedImages,
                  }
                  await axios.post('/api/outfits', JSON.stringify(toSentData), {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
              }
              setLoading(true);
              sendOutfit();
              setLoading(false);
              setSavedImages([]);
              setOutfitState('posted');
          }
      } else {
        alert('Please crop your images!')
      }
    }
  } 

  const router = useRouter();

  useEffect(() => {
    if (outfitState === 'posted') router.push('/outfits');
  }, [outfitState, router])

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
              <h3 className="font-title font-bold text-4xl drop-shadow-lg text-black my-4">
                Add a New
              </h3>
              <h3 className="font-title font-bold text-4xl drop-shadow-lg text-my-pink2 mb-4">
                Outfit
              </h3>
              
              <div 
                className={`
                          flex flex-col justify-center items-center xs:p-4 bg-purple-100 cursor-pointer
                          w-full h-32 max-w-xs sm:max-w-sm md:max-w-lg
                          `+(isDragActive ? "border-dashed-animate" : "border-dashed border-2 border-black")}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="relative flex justify-center items-center w-full">
                    <Image
                      height={100}
                      width={100}
                      className="w-16 h-16 block object-cover z-0 "
                      src="/images/animations/folder1.png"
                      alt=""
                    />

                    <div className={`
                                    absolute bottom-0 bg-black border-2 border-white rounded-t-md rounded-br-md translate-x-1 -translate-y-1.5 origin-bottom-left block z-20 transition duration-500 w-16 h-8 `+
                                    (isDragActive ? '-skew-x-[30deg] scale-y-75' : '-skew-x-6')
                                  }
                    ></div>

                    <Image
                      height={50}
                      width={50}
                      className={`
                                  absolute w-6 h-6 block object-cover transition duration-300 z-[14] `+
                                  (isDragActive ? 'translate-x-8 -translate-y-3 rotate-[30deg]' : 'translate-x-3 translate-y-0.5 rotate-[15deg]')
                      }
                      src="/images/animations/png.png"
                      alt=""
                    />

                    <Image
                      height={50}
                      width={50}
                      className={`
                                  absolute w-6 h-6 block object-cover transition duration-300 z-[13] `+
                                  (isDragActive ? 'translate-x-4 -translate-y-5 rotate-[10deg]' : 'translate-x-2 translate-y-px rotate-[5deg]')
                      }
                      src="/images/animations/jpg.png"
                      alt=""
                    />

                    <Image
                      height={50}
                      width={50}
                      className={`
                                  absolute w-6 h-6 block object-cover transitin duration-300 z-[12] `+
                                  (isDragActive ? '-translate-x-0 -translate-y-5 -rotate-[10deg]' : 'translate-x-0 translate-y-0 -rotate-[5deg]')
                      }
                      src="/images/animations/svg.png"
                      alt=""
                    />

                    <Image
                      height={50}
                      width={50}
                      className={`
                                  absolute w-6 h-6 block object-cover transition duration-300 z-[11] `+
                                  (isDragActive ? '-translate-x-4 -translate-y-3 -rotate-[30deg]' : '-translate-x-2 translate-y-px -rotate-[15deg]')
                      }
                      src="/images/animations/tif.png"
                      alt=""
                    />
                </div>
                <p className="font-display font-bold text-sm xs:text-md text-center text-black">Drag & Drop your images simultaniously here</p>
                <p className="font-display font-medium text-xs xs:text-sm text-center text-black">(4 images Maximum)</p>
              </div>

              <div 
                className="w-full max-w-xs max-h-20 sm:max-w-sm md:max-w-xl my-4
                          flex justify-end items-center 
                          "
                onClick={()=>setImages([{}, {}, {}, {}])}
              >
                  <div className="flex hover:cursor-pointer group">
                    <p className="font-title text-sm text-black group-hover:text-red-500 transition duration-150 text-center mx-2">Delete all images</p>
                    <RiDeleteBin6Line className="group-hover:fill-red-500 transition duration-150" />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4">
                {/* Image 1  */}
                <div className={"relative w-56 mobile:w-72 h-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75 flex justify-center items-center " + (images[0].error && 'border-red-500 border-4')}>
                  {images[0].local 
                  ? (
                    images[0].isCropped
                    ? <Cropper
                        image={images[0].local}
                        crop={images[0].crop}
                        aspect={4.5 / 6}
                        onCropChange={(e)=>{
                          setImages(prevList => {
                            const newList = [...prevList]
                            newList[0] = {...newList[0],  crop: e};
                            return newList;
                          })
                        }}
                        onCropComplete={(croppedArea, croppedAreaPixels)=>onCropComplete(croppedArea, croppedAreaPixels,  0)}
                        showGrid={false}
                      />
                    : <Image
                        width={1000}
                        height={1000}
                        alt="outfit"
                        className="block object-cover w-full h-full rounded-3xl bg-gray-500"
                        style={images[0].position && {
                          objectPosition: (images[0].position.left)+'% '+ (images[0].position.top)+'%',
                        }}
                        src={images[0].local}
                      />
                  ) : (
                    <div className="block object-cover w-full h-full rounded-3xl bg-gray-500">
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 lg:scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                        <p className="font-title font-bold text-white text-base text-center">
                          Empty
                        </p>
                      </div>
                    </div>
                  )}
                  {images[0].local && !images[0].isCropped
                  && <div className={"absolute top-0 right-0 lg:hidden p-2 rounded-full flex justify-center itens-center bg-gray-500 "+(images[0].overview ? 'opacity-50' : 'opacity-100')}>
                    <button onClick={()=>{
                      setImages(prevList => {
                        const newList = [...prevList]
                        newList[0] = {...newList[0], overview: !newList[0].overview}
                        return newList;
                      })
                    }}>
                      {images[0].overview ? <BsEyeSlash size={20} fill="white" /> : <BsEye size={20} fill="white" />}
                    </button>
                  </div>}
                  <div className={`
                                  absolute inset-y-2/4 w-full h-6 bg-black 
                                  lg:scale-x-0 lg:group-hover:scale-x-100 transition duration-200 `+(images[0].overview ? 'scale-x-0' : 'scale-x-100')}
                  >
                    <div className="flex justify-center items-center h-full w-full">
                      {!images[0].local ? (
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
                          {!images[0].isCropped && 
                            <label htmlFor="reupload0">
                              <RiImageEditLine size={25} color="white" />
                              <input
                                onChange={(e) => handleChange(e, 0)}
                                type="file"
                                id="reupload0"
                                accept="image/*"
                                style={{ display: "none" }}
                              />
                            </label>}
                          {!images[0].isCropped 
                            ? <MdOutlineCrop
                              onClick={() => enableCropImage(0, true)}
                              size={25}
                              color="white"
                            />
                            : <MdDoneOutline
                              onClick={() => {
                                enableCropImage(0, false)
                                setImages(prevList => {
                                  const newList = [...prevList]
                                  newList[0] = {...newList[0], error: false}
                                  return newList;
                                })
                              }}
                              size={25}
                              color="white"
                            />
                          }

                          {!images[0].isCropped && <TiCancel
                            onClick={(e) => deleteImage(e, 0)}
                            size={25}
                            color="white"
                          />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image 2 */}
                <div className="relative rounded-3xl w-56 mobile:w-72 h-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75">
                  {images[1].local 
                  ? (
                    images[1].isCropped
                    ? <Cropper
                        image={images[1].local}
                        crop={images[1].crop}
                        aspect={4.5 / 6}
                        onCropChange={(e)=>{
                          setImages(prevList => {
                            const newList = [...prevList]
                            newList[1] = {...newList[1],  crop: e};
                            return newList;
                          })
                        }}
                        onCropComplete={(croppedArea, croppedAreaPixels)=>onCropComplete(croppedArea, croppedAreaPixels,  1)}
                        showGrid={false}
                      />
                    : <Image
                        width={1000}
                        height={1000}
                        alt="outfit"
                        className="block object-cover w-full h-full rounded-3xl bg-gray-500"
                        style={images[1].position && {
                          objectPosition: (images[1].position.left)+'% '+ (images[1].position.top)+'%',
                        }}
                        src={images[1].local}
                      />
                  ) : (
                    <div className="block object-cover w-full h-full rounded-3xl bg-gray-500">
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                        <p className="font-title font-bold text-white text-base text-center">
                          Empty
                        </p>
                      </div>
                    </div>
                  )}
                  {images[1].local && !images[1].isCropped
                  && <div className={"absolute top-0 right-0 lg:hidden p-2 rounded-full flex justify-center itens-center bg-gray-500 "+(images[1].overview ? 'opacity-50' : 'opacity-100')}>
                    <button onClick={()=>{
                      setImages(prevList => {
                        const newList = [...prevList]
                        newList[1] = {...newList[1], overview: !newList[1].overview}
                        return newList;
                      })
                    }}>
                      {images[1].overview ? <BsEyeSlash size={20} fill="white" /> : <BsEye size={20} fill="white" />}
                    </button>
                  </div>}
                  <div className={`
                                  absolute inset-y-2/4 w-full h-6 bg-black 
                                  lg:scale-x-0 lg:group-hover:scale-x-100 transition duration-200 `+(images[1].overview ? 'scale-x-0' : 'scale-x-100')}
                  >
                    <div className="flex justify-center items-center h-full w-full">
                      {!images[1].local ? (
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
                          {!images[1].isCropped && 
                            <label htmlFor="reupload1">
                              <RiImageEditLine size={25} color="white" />
                              <input
                                onChange={(e) => handleChange(e, 1)}
                                type="file"
                                id="reupload1"
                                accept="image/*"
                                style={{ display: "none" }}
                              />
                            </label>}
                            {!images[1].isCropped 
                            ? <MdOutlineCrop
                              onClick={() => enableCropImage(1, true)}
                              size={25}
                              color="white"
                            />
                            : <MdDoneOutline
                              onClick={() => {
                                enableCropImage(1, false)
                                setImages(prevList => {
                                  const newList = [...prevList]
                                  newList[1] = {...newList[1], error: false}
                                  return newList;
                                })
                              }}
                              size={25}
                              color="white"
                            />
                            }

                          {!images[1].isCropped && <TiCancel
                            onClick={(e) => deleteImage(e, 1)}
                            size={25}
                            color="white"
                          />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image 3 */}
                <div className="relative rounded-3xl w-56 mobile:w-72 h-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75">
                  {images[2].local 
                  ? (
                    images[2].isCropped
                    ? <Cropper
                        image={images[2].local}
                        crop={images[2].crop}
                        aspect={4.5 / 6}
                        onCropChange={(e)=>{
                          setImages(prevList => {
                            const newList = [...prevList]
                            newList[2] = {...newList[2],  crop: e};
                            return newList;
                          })
                        }}
                        onCropComplete={(croppedArea, croppedAreaPixels)=>onCropComplete(croppedArea, croppedAreaPixels,  2)}
                        showGrid={false}
                      />
                    : <Image
                        width={1000}
                        height={1000}
                        alt="outfit"
                        className="block object-cover w-full h-full rounded-3xl bg-gray-500"
                        style={images[2].position && {
                          objectPosition: (images[2].position.left)+'% '+ (images[2].position.top)+'%',
                        }}
                        src={images[2].local}
                      />
                  ) : (
                    <div className="block object-cover w-full h-full rounded-3xl bg-gray-500">
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                        <p className="font-title font-bold text-white text-base text-center">
                          Empty
                        </p>
                      </div>
                    </div>
                  )}
                  {images[2].local && !images[2].isCropped
                  && <div className={"absolute top-0 right-0 lg:hidden p-2 rounded-full flex justify-center itens-center bg-gray-500 "+(images[2].overview ? 'opacity-50' : 'opacity-100')}>
                    <button onClick={()=>{
                      setImages(prevList => {
                        const newList = [...prevList]
                        newList[2] = {...newList[2], overview: !newList[2].overview}
                        return newList;
                      })
                    }}>
                      {images[2].overview ? <BsEyeSlash size={20} fill="white" /> : <BsEye size={20} fill="white" />}
                    </button>
                  </div>}
                  <div className={`
                                  absolute inset-y-2/4 w-full h-6 bg-black 
                                  lg:scale-x-0 lg:group-hover:scale-x-100 transition duration-200 `+(images[2].overview ? 'scale-x-0' : 'scale-x-100')}
                  >
                    <div className="flex justify-center items-center h-full w-full">
                      {!images[2].local ? (
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
                          {!images[2].isCropped && 
                            <label htmlFor="reupload2">
                              <RiImageEditLine size={25} color="white" />
                              <input
                                onChange={(e) => handleChange(e, 2)}
                                type="file"
                                id="reupload2"
                                accept="image/*"
                                style={{ display: "none" }}
                              />
                            </label>}
                          {!images[2].isCropped 
                            ? <MdOutlineCrop
                              onClick={() => enableCropImage(2, true)}
                              size={25}
                              color="white"
                            />
                            : <MdDoneOutline
                              onClick={() => {
                                enableCropImage(2, false)
                                setImages(prevList => {
                                  const newList = [...prevList]
                                  newList[2] = {...newList[2], error: false}
                                  return newList;
                                })
                              }}
                              size={25}
                              color="white"
                            />
                            }

                          {!images[2].isCropped && <TiCancel
                            onClick={(e) => deleteImage(e, 2)}
                            size={25}
                            color="white"
                          />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image 4 */}
                <div className="relative rounded-3xl w-56 mobile:w-72 h-72 mobile:h-96 cursor-pointer transition duration-300 group hover:opacity-75">
                  {images[3].local 
                  ? (
                    images[3].isCropped
                    ? <Cropper
                        image={images[3].local}
                        crop={images[3].crop}
                        aspect={4.5 / 6}
                        onCropChange={(e)=>{
                          setImages(prevList => {
                            const newList = [...prevList]
                            newList[3] = {...newList[3],  crop: e};
                            return newList;
                          })
                        }}
                        onCropComplete={(croppedArea, croppedAreaPixels)=>onCropComplete(croppedArea, croppedAreaPixels,  3)}
                        showGrid={false}
                      />
                    : <Image
                        width={1000}
                        height={1000}
                        alt="outfit"
                        className="block object-cover w-full h-full rounded-3xl bg-gray-500"
                        style={images[3].position && {
                          objectPosition: (images[3].position.left)+'% '+ (images[3].position.top)+'%',
                        }}
                        src={images[3].local}
                      />
                  ) : (
                    <div className="block object-cover w-full h-full rounded-3xl bg-gray-500">
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                        <p className="font-title font-bold text-white text-base text-center">
                          Empty
                        </p>
                      </div>
                    </div>
                  )}
                  {images[3].local && !images[3].isCropped
                  && <div className={"absolute top-0 right-0 lg:hidden p-2 rounded-full flex justify-center itens-center bg-gray-500 "+(images[3].overview ? 'opacity-50' : 'opacity-100')}>
                    <button onClick={()=>{
                      setImages(prevList => {
                        const newList = [...prevList]
                        newList[3] = {...newList[3], overview: !newList[3].overview}
                        return newList;
                      })
                    }}>
                      {images[3].overview ? <BsEyeSlash size={20} fill="white" /> : <BsEye size={20} fill="white" />}
                    </button>
                  </div>}
                  <div className={`
                                  absolute inset-y-2/4 w-full h-6 bg-black 
                                  lg:scale-x-0 lg:group-hover:scale-x-100 transition duration-200 `+(images[3].overview ? 'scale-x-0' : 'scale-x-100')}
                  >
                    <div className="flex justify-center items-center h-full w-full">
                      {!images[3].local ? (
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
                          {!images[3].isCropped && 
                            <label htmlFor="reupload3">
                              <RiImageEditLine size={25} color="white" />
                              <input
                                onChange={(e) => handleChange(e, 3)}
                                type="file"
                                id="reupload3"
                                accept="image/*"
                                style={{ display: "none" }}
                              />
                            </label>}
                          {!images[3].isCropped 
                            ? <MdOutlineCrop
                              onClick={() => enableCropImage(3, true)}
                              size={25}
                              color="white"
                            />
                            : <MdDoneOutline
                              onClick={() => {
                                enableCropImage(3, false)
                                setImages(prevList => {
                                  const newList = [...prevList]
                                  newList[3] = {...newList[3], error: false}
                                  return newList;
                                })
                              }}
                              size={25}
                              color="white"
                            />
                          }

                          {!images[3].isCropped && <TiCancel
                            onClick={(e) => deleteImage(e, 3)}
                            size={25}
                            color="white"
                          />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center my-4">
                <button onClick={(outfitState === 'none') ? addOutfit : void(0)} className={"h-12 w-44 text-center rounded-3xl "+(outfitState === 'posted' ? 'bg-green-500 cursor-not-allowed ' : 'bg-my-purple ')}>
                {/* <button onClick={uploadOutfit} className={"h-12 w-44 text-center rounded-3xl"}> */}
                  {!(loading || upLoading)
                  ? <p className="font-display text-white text-xl">{(outfitState === 'none') ? 'Upload' : ((outfitState === 'uploaded') ? 'Add' : 'Added')}</p>
                  : 
                  <div className="text-center">
                      <div className="flex justify-center items-center" role="status">
                          <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>
                          {upLoading && <span className="font-display text-white text-xl">Uploading ...</span>}
                          {loading && <span className="font-display text-white text-xl">Loading ...</span>}
                      </div>
                  </div>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewOutfit;

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   const isUser = nookies.get(context);

//   if (!(session || (isUser.authentication && isUser.authentication!==""))) {
//       return {
//           redirect: {
//               destination: `/signin?from=new-outfit#form`
//           }
//       }
//   }

//   return {
//       props: {
//           session
//       }
//   }
// }
export const getServerSideProps = async (context) => {
  var redirection;
  const session = await getSession(context);
  const nookie = nookies.get(context);
  const token = nookie.authentication;

  if (!session) {
    await fetch(`${process.env.NEXTAUTH_URL}/api/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        redirection = true;
      });
  }

  if ((!session) && redirection) {
    return {
      redirect: {
        destination: `/signin?from=new-outfit#form`,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};