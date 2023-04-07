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
  const editOutfitsRate = (outfitIndex, imageIndex, user) => {
    setOutfitsList((prevList) => {
      const prevOutfit = prevList[outfitIndex];
      var isExist = false;
      for (let i = 0; i < prevOutfit.raters.length; i++) {
        if (prevOutfit.raters[i].id === user) {
          prevOutfit.raters[i].best = imageIndex;
          isExist = true;
        }
      }
      !isExist && prevOutfit.raters.push({ id: user, best: imageIndex });
      prevList[outfitIndex] = prevOutfit;
      return [...prevList];
    });
  };

  const setOutfitRating = (outfitIndex, rate, user) => {
    setOutfitsList((prevList) => {
      const prevOutfit = prevList[outfitIndex];

      // // --------------------------------| Backend or onClick on 'Rate' |--------------------------------
      // const newRate = ((prevOutfit.rate * prevOutfit.raters.length) + rate) / (prevOutfit.raters.length + 1);
      // prevOutfit.rate = prevOutfit.rate ? newRate : rate;

      var isExist = false;
      for (let i = 0; i < prevOutfit.raters.length; i++) {
        if (prevOutfit.raters[i]._id === user) {
          prevOutfit.raters[i].rating = rate;
          isExist = true;
        }
      }
      !isExist && prevOutfit.raters.push({ _id: user, rating: rate });

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

  //Sumbit Rating to DB
  const submitRate = async (outfit) => {
    if (user.id !== "") {
      const myRating = outfit.raters.find((rater) => rater._id === user.id);
      const data = {
        _id: outfit._id,
        myRating,
      };
      await axios
        .put("/api/outfits/rating", data)
        .catch((err) => {
          alert(err.response.data.message);
          window.location.reload();
        });
    } else {
      if (session) {
        // Treatment of ratings for session users
        
      } else {
        alert("Please sign in to rate");
      }
    }
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
        }
        const images = outfit.image.map((image, imageIndex) => {
          return (
            <div
              key={image._id}
              onClick={() => editOutfitsRate(outfitIndex, imageIndex, user.id)}
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
              <button className="h-12 w-44 text-center bg-my-purple rounded-3xl">
                <p className="font-display text-white text-xl">Rate</p>
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
                      onClick={() => setOutfitRating(outfitIndex, 1, user.id)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 transition duration-100 ` +
                        (userRating >= 1 ? "fill-black" : "fill-transparent")
                      }
                    />
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 2, user.id)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 ` +
                        (userRating >= 2
                          ? "transition duration-150 fill-black"
                          : "transition duration-300 fill-transparent")
                      }
                    />
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 3, user.id)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 transition duration-200 ` +
                        (userRating >= 3 ? "fill-black" : "fill-transparent")
                      }
                    />
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 4, user.id)}
                      color="black"
                      className={
                        `m-1 h-6 w-6 ` +
                        (userRating >= 4
                          ? "transition duration-300 fill-black"
                          : "transition duration-150 fill-transparent")
                      }
                    />
                    <HiOutlineStar
                      onClick={() => setOutfitRating(outfitIndex, 5, user.id)}
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
                <p className="font-display text-white text-xl">Rate</p>
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
