import Link from "next/link";

import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isElementHovered, setIsElementHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    try {
      const fetchToken = async () => {
        await axios
          .get("/api/verify")
          .then((response) => console.log(response.data.message))
          .catch((err) => {
            const removeUser = async () => {
              await axios
                .get("/api/auth/logout")
                .then(async (response) => {
                  setIsUser(false);
                })
                .catch((error) => {
                  alert(error);
                });
            };
            removeUser();
          });
      };
      const fetchUser = async () => {
        await axios
          .get("/api/profile")
          .then((response) => {
            setIsUser(true);
            setUser(response.data);
          })
          .catch((err) => {
            const removeUser = async () => {
              await axios
                .get("/api/auth/logout")
                .then(async (response) => {
                  setIsUser(false);
                })
                .catch((error) => {
                  alert(error);
                });
            };
            removeUser();
          });
      };

      fetchToken();
      fetchUser();

    } catch (err) {
      const removeUser = async () => {
        await axios
          .get("/api/auth/logout")
          .then(async (response) => {
            setIsUser(false);
          })
          .catch((error) => {
            alert(error);
          });
      };
      removeUser();
    }
  }, [router.asPath]);

  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    //Sign out from the providers
    if (status === "authenticated") signOut();

    //Sign out from the jwt authentication
    if (isUser) {
      await axios
        .get("/api/auth/logout")
        .then(async (response) => {
          localStorage.removeItem("user");
          router.reload();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const [src, setSrc] = useState("/images/user.png");
  const [sessionSrc, setSessionSrc] = useState("/images/user.png");
  useEffect(() => {
    status === "authenticated" && setSessionSrc(session.user.image);
    isUser && setSrc(user.image.url);
  }, [status, isUser, session.user.image, user.image.url]);

  return (
    <div className="grid grid-cols-8 w-full h-16">
      <div className="grid grid-cols-8 justify-center items-center h-full col-start-0 col-span-8 lg:col-start-2 lg:col-span-6">
        <Link
          className="flex justify-center items-center | col-span-5 sm:col-span-4 md:col-span-2"
          href="/"
        >
          <Image
            width={30}
            height={30}
            className="mx-2 xs:mx-4"
            src="/favicon.ico"
            alt="logo"
          />
          <h1
            className="text-md xs:text-xl font-black font-display"
            style={{ color: "#DB76DC" }}
          >
            rankmyOutfit
          </h1>
        </Link>
        <div className="hidden md:flex col-span-2"></div>
        <div className="flex justify-evenly items-center | invisible sm:visible  | hidden sm:flex col-span-2">
          <h5
            className="text-sm font-bold font-display"
            style={{ color: "#DB76DC" }}
          >
            How it works
          </h5>
          <h5
            className="text-sm font-bold font-display"
            style={{ color: "#DB76DC" }}
          >
            Contact
          </h5>
        </div>
        <div className="flex justify-center items-center col-span-3 sm:col-span-2">
          {status !== "authenticated" ? (
            !isUser ? (
              <div
                className="rounded-full w-24 sm:w-32 h-10 flex justify-center items-center"
                style={{ backgroundColor: "#6F1AB6" }}
              >
                <Link href="/signin#form">
                  <h5 className="font-display font-bold text-white text-sm">
                    Sign in
                  </h5>
                </Link>
              </div>
            ) : (
              <div className="rounded-full w-24 sm:w-32 h-10 flex">
                <div className="relative z-50">
                  <button
                    onClick={toggleDropdown}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                    className="px-1 py-1 flex mx-3 text-sm b-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      height={100}
                      width={100}
                      className="w-8 h-8 rounded-full block object-cover bg-gray-500"
                      priority={true}
                      src={src}
                      onError={() => setSrc("/images/user.png")}
                      alt="user photo"
                      style={
                        user.image.position && {
                          objectPosition:
                            user.image.position.left +
                            "% " +
                            user.image.position.top +
                            "%",
                        }
                      }
                    />
                  </button>
                  <div
                    onMouseEnter={() => setIsElementHovered(true)}
                    onMouseLeave={() => {
                      setIsElementHovered(false)
                      setIsOpen(false);
                    }}
                    className={
                      "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 " +
                      ((isOpen && (isLogoHovered || isElementHovered)) ? "" : "hidden")
                    }
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>{user.name}</div>
                      <div className="font-medium truncate">{user.email}</div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownInformationButton"
                    >
                      <li>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                    </ul>
                    <div className="py-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="rounded-full w-24 sm:w-32 h-10 flex">
              <div className="relative z-50">
                <button
                  onClick={toggleDropdown}
                  className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  type="button"
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    height={100}
                    width={100}
                    className="w-8 h-8 rounded-full"
                    src={sessionSrc}
                    onError={() => setSessionSrc("/images/user.png")}
                    alt="user photo"
                  />
                </button>
                <div
                  className={
                    "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 " +
                    (isOpen ? "" : "hidden")
                  }
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{session.user.name}</div>
                    <div className="font-medium truncate">
                      {session.user.email}
                    </div>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
