import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import nookies from "nookies";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";

import { MdAdd, MdOutlineCrop, MdDoneOutline } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TiCancel } from "react-icons/ti";

const Profile = () => {
  //-----------------Router Handling---------------------
  const router = useRouter();
  //---------------------Error Handling---------------------
  const [error, setError] = useState("");

  //---------------------User Authentication---------------------
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("/api/profile")
        .then((response) => {
          setIsUser(true);
          setUser(response.data);
          setImage(response.data.image.url);
          setPosition(response.data.image.position);
        })
        .catch((err) => {
          localStorage.removeItem("authentication");
          localStorage.removeItem("user");
        });
    };
    fetchUser();
  }, []);
  
  //---------------------Image Treating---------------------
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState((user && user.image.position) || { left: 50, top: 50 });
  const [edit, setEdit] = useState(false);

  const onCropComplete = useCallback(
    (croppedArea) => {
      const widthScale = 100 - croppedArea.width;
      const left = widthScale === 0 ? 0 : (croppedArea.x / widthScale) * 100;
      const heightScale = 100 - croppedArea.height;
      const top = heightScale === 0 ? 0 : (croppedArea.y / heightScale) * 100;
      setPosition({ left, top });
    },
    []
  );

  //---------------------Handle Uploading the Image---------------------
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState();

  // ----------------------------Functions----------------------------------
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

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (file.type.split('/')[0] === 'image') {

      // Cloud
      const formData = new FormData();
      formData.append("image", file);

      // Local
      const base64 = await convertToBase64(file);

      var stringLength = base64.length - "data:image/png;base64,".length;

      var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;

      if (sizeInBytes >= 5000000) {
        // MAX 30MB, here 5MB 😏
        alert("Image too Large! Maximum size is 5MB");
      } else {
        setImage(base64);
        setProfile(formData);
        setEdit(true);
      }
      e.target.value = "";
    } else {
      alert('Please drag an image');
    }
  };

  const editProfileImage = async () => {
    setLoading(true);
    if (image && image.length > 0) {
      if (profile) {
        await axios
          .post("https://encouraging-gold-gabardine.cyclic.app/api/upload", profile)
          // .post("http://localhost:5000/api/upload", profile)
          .then(async (response) => {
            const imageData = {
              url: response.data.display_url,
              delete: response.data.delete_url,
              position,
            };
            await axios
              .put("/api/profile", { email: user.email, image: imageData })
              .then((response) => {
                setUser({
                  ...user,
                  image: {
                    ...user.image,
                    url: response.data.display_url,
                    position,
                  },
                });
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    ...user,
                    image: {
                      ...user.image,
                      url: response.data.display_url,
                      position,
                    },
                  })
                );
              })
              .catch((err) => {
                setError(err.response.data.message);
              });
            router.reload();
          });
      } else {
        const imageData = {
          position,
        };
        await axios
          .put("/api/profile", { email: user.email, image: imageData })
          .then((response) => {
            setUser({ ...user, image: { ...user.image, position } });
            localStorage.setItem(
              "user",
              JSON.stringify({ ...user, image: { ...user.image, position } })
            );
            router.reload();
          })
          .catch((err) => {
            setError(err.response.data.message);
          });
      }
    } else {
      const imageData = {
        url: "",
        delete: "",
        position: {
          left: 50,
          top: 50,
        },
      };
      await axios
        .put("/api/profile", { email: user.email, image: imageData })
        .then((response) => {
          setUser({ ...user, image: {} });
          localStorage.setItem("user", JSON.stringify({ ...user, image: {} }));
          router.reload();
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
    setLoading(false);
  };

  function restoreSession() {
    router.reload();
  }

  const onDrop = useCallback(async acceptedFiles => {
    if (acceptedFiles[0].type.split('/')[0] === 'image') {
      const file = acceptedFiles[0];

      // Cloud
      const formData = new FormData();
      formData.append("image", file);

      // Local
      const base64 = await convertToBase64(file);

      var stringLength = base64.length - "data:image/png;base64,".length;

      var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;

      if (sizeInBytes >= 5000000) {
        // MAX 30MB, here 5MB 😏
        alert("Image too Large! Maximum size is 5MB");
      } else {
        setImage(base64);
        setProfile(formData);
        setEdit(true);
      }
    } else {
      alert('Please drag an image');
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  // -------------------------------------------------------------------------------------------------------------------
  
  return (
    isUser && (
      <div className="flex flex-col justify-center items-center w-full">
        <div
          className={
            "flex flex-col justify-center items-center max-w-sm " +
            (error && "blur-lg")
          }
        >
          <div className="relative rounded-full mobile:w-72 mobile:h-72 cursor-pointer transition duration-300 group hover:opacity-75">
            {image !== "" ? (
              edit ? (
                <Cropper
                  className="w-20"
                  image={image}
                  crop={crop}
                  aspect={6 / 6}
                  onCropChange={setCrop}
                  onCropComplete={(croppedArea, croppedAreaPixels) =>
                    onCropComplete(croppedArea, croppedAreaPixels, 1)
                  }
                  showGrid={false}
                />
              ) : (
                <div className="relative rounded-full mobile:w-72 mobile:h-72 cursor-pointer transition duration-300 group" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!isDragActive 
                    ? <img
                      className="block object-cover w-full h-full rounded-full bg-gray-500"
                      style={
                        position && {
                          objectPosition:
                            position.left + "% " + position.top + "%",
                        }
                      }
                      src={image}
                    />
                    : 
                    <div className="relative object-cover w-full h-full rounded-full bg-gray-500 border-dashed border-2 border-white">
                      <img
                        className="block object-cover w-full h-full rounded-full blur-sm"
                        style={
                          position && {
                            objectPosition:
                              position.left + "% " + position.top + "%",
                          }
                        }
                        src={image}
                      />
                      
                      <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                          <div className="top-1/2 w-full text-center text-black font-bold font-display css-stroke-white">Drag here to overwrite the image</div>
                      </div>
                    </div>
                  }
                </div>
              )
            ) : (
              <div className={"z-50 block object-cover w-full h-full rounded-full bg-gray-500 "+(isDragActive && 'border-dashed border-2 border-white')} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-100 group-hover:scale-x-[0.25] transition duration-100">
                    {!isDragActive 
                      ? <p className="font-title font-bold text-white text-base text-center">
                            Empty
                          </p>
                      : <div className="top-1/2 w-full text-center text-black font-bold font-display css-stroke-white">Drag here to overwrite the image</div>
                    }
                  </div>
              </div>
            )}

            <div className="absolute inset-y-2/4 w-full h-6 bg-black scale-x-0 group-hover:scale-x-100 transition duration-200">
              <div className="flex justify-center items-center h-full w-full">
                {!image ? (
                  <label htmlFor="upload">
                    <MdAdd size={30} color="white" />
                    <input
                      onChange={(e) => error === "" && handleUpload(e)}
                      type="file"
                      id="upload"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </label>
                ) : (
                  <div className="flex justify-center items-center space-x-8">
                    {!edit && (
                      <label htmlFor="reupload">
                        <RiImageEditLine size={25} color="white" />
                        <input
                          onChange={(e) => error === "" && handleUpload(e)}
                          type="file"
                          id="reupload"
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                      </label>
                    )}
                    {!edit ? (
                      <MdOutlineCrop
                        onClick={() => error === "" && setEdit(true)}
                        size={25}
                        color="white"
                      />
                    ) : (
                      <MdDoneOutline
                        onClick={() => error === "" && setEdit(false)}
                        size={25}
                        color="white"
                      />
                    )}

                    {!edit && (
                      <TiCancel
                        onClick={() => error === "" && setImage("")}
                        size={25}
                        color="white"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isDragActive && <div className="flex justify-start items-center my-2">
            <HiOutlineExclamationCircle size={20} />
            <p className="ml-2">You can Drag & Drop your image from your local.</p>
          </div>}

          <div className="flex justify-center items-center my-4">
            <button
              onClick={editProfileImage}
              className={
                "h-12 w-44 text-center bg-my-purple rounded-3xl " +
                (edit || error ? "cursor-not-allowed" : "cursor-pointer")
              }
              disabled={edit || error}
            >
              {!loading ? (
                <p className="font-display text-white text-xl">Edit</p>
              ) : (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-black"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
        <div
          className={
            "fixed top-1/3 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 transition duration-300  " +
            (error !== "" ? "visible scale-150" : "invisible scale-0")
          }
          role="alert"
        >
          <div className="h-full flex flex-col justify-center">
            <p className="font-bold">{"error"}</p>
            <p>Your token is lost. Please : </p>
          </div>
          <div className="flex justify-center items-center my-4">
            <button
              onClick={restoreSession}
              className="h-8 w-32 font-bold text-center border-2 border-my-purple  hover:bg-my-purple rounded-3xl text-my-purple hover:text-white"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  var redirection = false;
  const session = await getSession(context);
  const nookie = nookies.get(context);
  const token = nookie.authentication;

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

  if (redirection) {
    return {
      redirect: {
        destination: '/signin?from=profile#form',
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
