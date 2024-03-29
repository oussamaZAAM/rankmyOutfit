import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { MdOutlineAddCircle, MdOutlineArrowDropDown } from "react-icons/md";
import { HiOutlineStar, HiStar } from "react-icons/hi";

import styles from "../styles/Home.module.css";
import axios from "axios";
import { getSession } from "next-auth/react";

const Outfits = ({ outfitsData, session }) => {
  const [user, setUser] = useState({
    id: "",
  });

  const [rate, setRate] = useState(false);
  const [sort, setSort] = useState({
    state: false,
    type: "recent",
  });
  const [filter, setFilter] = useState({
    state: false,
    type: "both",
  });
  const [rankingType, setRankingType] = useState("basic");
  const [outfitsList, setOutfitsList] = useState(outfitsData);
  // Functions
  const setOutfitsBest = (outfitIndex, imageIndex) => {
    setOutfitsList((prevList) => {
      const prevOutfit = prevList[outfitIndex];
      
      if (user?.id !== '' && user?.name && user?.email && user?.image) {
        var isExist = false;
        for (let i = 0; i < prevOutfit.raters.length; i++) {
          if (prevOutfit.raters[i]._id === user.id) {
            prevOutfit.raters[i].best = imageIndex;
            isExist = true;
          }
        }
        !isExist && prevOutfit.raters.push({ _id: user.id, best: imageIndex });
      }
      
      if (session?.user?.email && session?.user?.image && session?.user?.name) {
        var isExist = false;
        for (let i = 0; i < prevOutfit.raters.length; i++) {
          if (prevOutfit.raters[i].email === session.user.email) {
            prevOutfit.raters[i].best = imageIndex;
            isExist = true;
          }
        }
        !isExist && prevOutfit.raters.push({ email: session.user.email, best: imageIndex });
      }
      prevList[outfitIndex] = prevOutfit;
      return [...prevList];
    });
  };

  const setOutfitRating = (outfitIndex, rate) => {
    setOutfitsList((prevList) => {
      const prevOutfit = prevList[outfitIndex];

      if (user?.id !== '' && user?.name && user?.email && user?.image) {
        var isExist = false;
        for (let i = 0; i < prevOutfit.raters.length; i++) {
          if (prevOutfit.raters[i]._id === user.id) {
            prevOutfit.raters[i].rating = rate;
            isExist = true;
          }
        }
        !isExist && prevOutfit.raters.push({ _id: user.id, rating: rate });
      }
      
      if (session?.user?.email && session?.user?.image && session?.user?.name) {
        var isExist = false;
        for (let i = 0; i < prevOutfit.raters.length; i++) {
          if (prevOutfit.raters[i].email === session.user.email) {
            prevOutfit.raters[i].rating = rate;
            isExist = true;
          }
        }
        !isExist && prevOutfit.raters.push({ email: session.user.email, rating: rate });
      }
        
      prevList[outfitIndex] = prevOutfit;
      return [...prevList];
    });
  };

  //Calculate the average of the ratings
  const calculateAvgRate = (outfit) => {
    const ratings = outfit.raters.map((rater) => rater.rating);
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    if (ratings.length > 0) {
      return average(ratings);
    }
    return 0;
  };
  
  // Submit the Best Outfit to DB
  const submitBest = async (outfit) => {
    setOutfitsList((prevList) => {
      for (let i = 0; i < prevList.length; i++) {
        if (prevList[i] === outfit) {
          prevList[i].loading = true;
        }
      }
      return [...prevList]
    })

    if (user.id !== "") {
      const myBest = outfit.raters.find((rater) => rater._id === user.id);
      const data = {
        _id: outfit._id,
        myBest,
      };
      myBest && await axios
        .put("/api/outfits/rating", data)
        .catch((err) => {
          alert(err.response.data.message);
          window.location.reload();
        });
    } else {
      if (session) {
        const myBest = outfit.raters.find((rater) => rater.email === session?.user?.email);
        const data = {
          _id: outfit._id,
          myBest,
        };
        myBest && await axios
          .put("/api/outfits/rating", data)
          .catch((err) => {
            alert(err.response.data.message);
            window.location.reload();
          });
      } else {
        alert("Please sign in to rate");
      }
    }

    setOutfitsList((prevList) => {
      for (let i = 0; i < prevList.length; i++) {
        if (prevList[i] === outfit) {
          prevList[i].loading = false;
        }
      }
      return [...prevList]
    })
  }

  //Sumbit Rating to DB
  const submitRate = async (outfit) => {
    setOutfitsList((prevList) => {
      for (let i = 0; i < prevList.length; i++) {
        if (prevList[i] === outfit) {
          prevList[i].loading = true;
        }
      }
      return [...prevList]
    })

    if (user.id !== "") {
      const myRating = outfit.raters.find((rater) => rater._id === user.id);
      const data = {
        _id: outfit._id,
        myRating,
      };
      myRating && await axios
        .put("/api/outfits/rating", data)
        .catch((err) => {
          alert(err.response.data.message);
          window.location.reload();
        });
    } else {
      if (session) {
        const myRating = outfit.raters.find((rater) => rater.email === session?.user?.email);
        const data = {
          _id: outfit._id,
          myRating,
        };
        myRating && await axios
          .put("/api/outfits/rating", data)
          .catch((err) => {
            alert(err.response.data.message);
            window.location.reload();
          });
      } else {
        alert("Please sign in to rate");
      }
    }

    setOutfitsList((prevList) => {
      for (let i = 0; i < prevList.length; i++) {
        if (prevList[i] === outfit) {
          prevList[i].loading = false;
        }
      }
      return [...prevList]
    })
  };

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("/api/profile")
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {});
    };

    fetchUser();
  }, []);

  // Outfits List
  const outfits =
    outfitsList.length !== 0 &&
    outfitsList.map((outfit, outfitIndex) => {
      if (outfit.type === "multi") {
        var rated;
        for (let i = 0; i < outfit.raters.length; i++) {
          if (outfit.raters[i]._id === user.id) {
            rated = outfit.raters[i].best;
          }
          
          if (outfit.raters[i].email && session?.user?.email && outfit.raters[i].email === session?.user?.email) {
            rated = outfit.raters[i].best;
          }
        }
        const images = outfit.image.map((image, imageIndex) => {
          return (
            <div
              key={image._id}
              onClick={() => setOutfitsBest(outfitIndex, imageIndex, user.id)}
              className="relative rounded-3xl w-64 h-80 mobile:w-72 mobile:h-96 cursor-pointer transition duration-300 hover:opacity-75"
            >
              <Image
                width={1200}
                height={1200}
                alt="outfit"
                className="block object-cover w-full h-full rounded-3xl"
                src={image.url}
                style={
                  image.position && {
                    objectPosition:
                      image.position.left + "% " + image.position.top + "%",
                  }
                }
              />
              <Image
                width={1200}
                height={1200}
                alt="outfit"
                src="/badge.png"
                className={
                  "absolute h-8 w-8 transition duration-200 top-0 right-0 m-2 " +
                  (imageIndex === rated
                    ? "opacity-100 scale-[2.5]"
                    : " scale-0")
                }
              />
            </div>
          );
        });
        return (
          <div
            key={outfit._id}
            className={
              "flex flex-col justify-center items-center rounded px-4 my-4 fold:w-full mobile:w-10/12 " +
              styles.boxshadow
            }
          >
            <h3 className="font-title font-bold text-4xl drop-shadow-lg text-black    my-4">
              Choose the best
            </h3>
            <h3 className="font-title font-bold text-4xl drop-shadow-lg text-my-pink2 mb-4">
              Outfit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4">
              {images}
            </div>
            <div className="flex justify-center items-center my-4">
              <button onClick={() => submitBest(outfit)} className="h-12 w-44 text-center bg-my-purple rounded-3xl">
                {outfit.loading
                  ? <div className="text-center cursor-not-allowed">
                        <div className="flex justify-center items-center" role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="font-display text-white text-xl">Rating ...</span>
                        </div>
                    </div>
                  : <p className="font-display text-white text-xl">Rate</p>}
              </button>
            </div>
          </div>
        );
      } else {
        var userRating;
        var isExist = false;
        for (let i = 0; i < outfit.raters.length; i++) {
          if (outfit.raters[i]._id === user.id) {
            userRating = outfit.raters[i].rating;
            isExist = true;
          }
          if (outfit.raters[i].email && session?.user?.email && outfit.raters[i].email === session?.user?.email) {
            userRating = outfit.raters[i].rating;
            isExist = true;
          }
        }
        !isExist && (userRating = 0);
        return (
          <div
            key={outfit._id}
            className={
              "flex flex-col justify-center items-center rounded px-4 my-4 fold:w-full mobile:w-10/12 " +
              styles.boxshadow
            }
          >
            <h3 className="font-title font-bold text-4xl drop-shadow-lg text-black my-4">
              Rate this
            </h3>
            <h3 className="font-title font-bold text-4xl drop-shadow-lg text-my-pink2 mb-4">
              Outfit
            </h3>
            <div className="flex justify-center items-center">
              <div className="relative rounded-3xl w-64 h-80 mobile:w-72 mobile:h-96 cursor-pointer group">
                <Image
                  width={1200}
                  height={1200}
                  alt="outfit"
                  className="block object-cover w-full h-full rounded-3xl group-hover:opacity-75 transition duration-300"
                  src={outfit.image[0].url}
                  style={
                    outfit.image[0].position && {
                      objectPosition:
                        outfit.image[0].position.left +
                        "% " +
                        outfit.image[0].position.top +
                        "%",
                    }
                  }
                />
                <div className="absolute justify-center items-center lg:hidden top-0 right-0 m-1 p-0.5 bg-gray-100 rounded-full">
                  <HiStar
                    onClick={() => setRate((prev) => !prev)}
                    size={25}
                    className="fill-my-pink1"
                  />
                </div>
                <div
                  className={
                    "absolute inset-y-2/4 w-full lg:opacity-0 lg:group-hover:opacity-100 transition duration-300 " +
                    (rate ? "opacity-100" : "opacity-0")
                  }
                >
                  <div className="flex justify-center items-center">
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 1)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 transition duration-100 ` +
                        (userRating >= 1 ? "fill-black" : "fill-transparent")
                      }
                    />
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 2)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 ` +
                        (userRating >= 2
                          ? "transition duration-150 fill-black"
                          : "transition duration-300 fill-transparent")
                      }
                    />
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 3)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 transition duration-200 ` +
                        (userRating >= 3 ? "fill-black" : "fill-transparent")
                      }
                    />
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 4)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 ` +
                        (userRating >= 4
                          ? "transition duration-300 fill-black"
                          : "transition duration-150 fill-transparent")
                      }
                    />
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 5)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 ` +
                        (userRating === 5
                          ? "transition duration-500 fill-black"
                          : "transition duration-100 fill-transparent")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <p>{calculateAvgRate(outfit)}</p>
            <div className="flex justify-center items-center my-4">
              <button
                onClick={() => submitRate(outfit)}
                className="h-12 w-44 text-center bg-my-purple rounded-3xl"
              >
                {outfit.loading
                ? <div className="text-center cursor-not-allowed">
                      <div className="flex justify-center items-center" role="status">
                          <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>
                          <span className="font-display text-white text-xl">Rating ...</span>
                      </div>
                  </div>
                : <p className="font-display text-white text-xl">Rate</p>}
                
              </button>
            </div>
          </div>
        );
      }
    });

  // ---------------------------------------------| Render |--------------------------------------------------
  return (
    <>
      <Head>
        <title>rankmyOutfit - Outfits</title>
        <meta name="description" content="Make sure you look your Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-8 w-full">
        <div className="lg:col-start-2 col-span-8 lg:col-span-6 flex flex-col justify-center items-center">
          {/*-------------------------------------------| Adding a new Outfit |------------------------------------------ */}

          <div
            className="
                                flex justify-around items-center w-full h-32
                                border-2 border-black rounded-t-3xl"
          >
            <div className="flex flex-col sm:flex-row justify-around sm:justify-evenly items-center w-full h-full">
              <div
                className="flex flex-col justify-start items-center h-11 w-full"
                style={{ maxWidth: "150px" }}
              >
                <div
                  className={
                    `
                                            flex justify-around items-center w-10/12
                                            cursor-pointer drop-shadow-md rounded-t-3xl
                                            py-1 sm:px-3 z-50
                                            transition duration-300
                                            group hover:bg-my-pink1 ` +
                    (sort.state && "bg-my-pink1")
                  }
                  onClick={() => setSort({ ...sort, state: !sort.state })}
                >
                  <p
                    className={
                      `
                                            text-xl sm:text-2xl mx-1 font-display 
                                            group-hover:text-white ` +
                      (sort.state ? "text-white" : "text-my-pink1")
                    }
                  >
                    Sort
                  </p>
                  <MdOutlineArrowDropDown
                    className={
                      `
                                            h-6 w-6
                                            group-hover:fill-white ` +
                      (sort.state ? "fill-white" : "fill-my-pink1")
                    }
                  />
                </div>
                <div
                  className={
                    "flex flex-col justify-center items-center w-10/12 z-40 -mt-8 " +
                    (sort.state
                      ? "transition duration-200 translate-y-8 opacity-100"
                      : "transition duration-200 opacity-0")
                  }
                >
                  <div
                    className={
                      `flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-pink1
                                                cursor-pointer transition duration-300 ` +
                      (sort.type === "recent"
                        ? "bg-my-pink1 text-white"
                        : "bg-white hover:bg-gray-100")
                    }
                    onClick={() => setSort({ ...sort, type: "recent" })}
                  >
                    Recent
                  </div>
                  <div
                    className={
                      `flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-pink1
                                                cursor-pointer transition duration-300 ` +
                      (sort.type === "rank"
                        ? "bg-my-pink1 text-white"
                        : "bg-white hover:bg-gray-100")
                    }
                    onClick={() => setSort({ ...sort, type: "rank" })}
                  >
                    Rank
                  </div>
                  <div
                    className={
                      `flex justify-start items-center w-full
                                indent-1 text-base font-body
                                border-b-2 border-x-2 border-my-pink1
                                cursor-pointer transition duration-300 ` +
                      (sort.type === "popularity"
                        ? "bg-my-pink1 text-white"
                        : "bg-white hover:bg-gray-100")
                    }
                    onClick={() => setSort({ ...sort, type: "popularity" })}
                  >
                    Popularity
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col justify-start items-center h-11 w-full"
                style={{ maxWidth: "150px" }}
              >
                <div
                  className={
                    `flex justify-around items-center w-10/12
                            cursor-pointer drop-shadow-md rounded-t-3xl
                            py-1 sm:px-3 z-30
                            transition duration-300
                            group hover:bg-my-purple ` +
                    (filter.state && "bg-my-purple")
                  }
                  onClick={() => setFilter({ ...filter, state: !filter.state })}
                >
                  <p
                    className={
                      `text-xl sm:text-2xl mx-1 font-display 
                                group-hover:text-white ` +
                      (filter.state ? "text-white" : "text-my-purple")
                    }
                  >
                    Filter
                  </p>
                  <MdOutlineArrowDropDown
                    className={
                      `h-6 w-6
                                group-hover:fill-white ` +
                      (filter.state ? "fill-white" : "fill-my-purple")
                    }
                  />
                </div>
                <div
                  className={
                    "flex flex-col justify-center items-center w-10/12 z-20 -mt-8 " +
                    (filter.state
                      ? "transition duration-200 translate-y-8 opacity-100"
                      : "transition duration-200 opacity-0")
                  }
                >
                  <div
                    className={
                      `flex justify-start items-center w-full
                                indent-1 text-base font-body
                                border-b-2 border-x-2 border-my-purple
                                cursor-pointer transition duration-300 ` +
                      (filter.type === "both"
                        ? "bg-my-purple text-white"
                        : "bg-white hover:bg-gray-100")
                    }
                    onClick={() => setFilter({ ...filter, type: "both" })}
                  >
                    Both
                  </div>
                  <div
                    className={
                      `flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-purple
                                                cursor-pointer transition duration-300 ` +
                      (filter.type === "multi"
                        ? "bg-my-purple text-white"
                        : "bg-white hover:bg-gray-100")
                    }
                    onClick={() => setFilter({ ...filter, type: "multi" })}
                  >
                    Multi
                  </div>
                  <div
                    className={
                      `flex justify-start items-center w-full
                                                indent-1 text-base font-body
                                                border-b-2 border-x-2 border-my-purple
                                                cursor-pointer transition duration-300 ` +
                      (filter.type === "single"
                        ? "bg-my-purple text-white"
                        : "bg-white hover:bg-gray-100")
                    }
                    onClick={() => setFilter({ ...filter, type: "single" })}
                  >
                    Single
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/new-outfit"
              className="flex sm:mx-8 md:mx-14 lg:mx-20 justify-center items-center"
            >
              <MdOutlineAddCircle className="fill-my-pink1 w-20 sm:w-24 h-20 sm:h-24 cursor-pointer" />
            </Link>

            <div className="flex flex-col-reverse sm:flex-row justify-around items-center w-full h-full">
              <button
                className="w-full py-1 sm:px-4 rounded-3xl bg-my-purple"
                style={{ maxWidth: "150px" }}
                onClick={() =>
                  setRankingType((prev) => {
                    if (prev === "advanced") {
                      return "basic";
                    } else {
                      return "advanced";
                    }
                  })
                }
              >
                <p className="text-md md:text-xl font-display text-white text-center">
                  {rankingType === "basic" ? "Advanced" : "Basic"}
                </p>
              </button>
              <button
                className="w-full py-1 sm:w-12 rounded-3xl bg-my-pink1"
                style={{ maxWidth: "150px" }}
              >
                <p className="text-md md:text-xl font-display text-white text-center">
                  AI
                </p>
              </button>
            </div>
          </div>

          {/* --------------------------------------| List of Outfits |------------------------------------------------  */}
          <div className="flex flex-col justify-center items-center rounded-b-3xl bg-soft-pink w-full z-10">
            {outfits}
          </div>
        </div>
      </div>
    </>
  );
};

export default Outfits;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  const url =
    process.env.VERCEL_ENV === "production"
      ? "https://rankmyoutfit.vercel.app/api/outfits"
      : "http://localhost:3000/api/outfits";

  const res = await axios.get(url);
  const outfitsData = await res.data;

  return {
    props: {
      outfitsData,
      session,
    },
  };
};
