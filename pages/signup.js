import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import styles from "/styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";

const Signup = () => {
  return (
    <>
      <Head>
        <title>rankmyOutfit - Sign up</title>
        <meta name="description" content="Make sure you look your Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-[url('/images/sun-tornado2.png')] dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
          <div className="flex flex-col justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white my-4">
            <Image
              width={100}
              height={100}
              src="/images/logo.png"
              className="w-16 h-16 mr-2"
            />
            <span className="font-display font-black text-4xl text-my-pink1">
              rateMyOutfit
            </span>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 my-4">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        for="terms"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <Link
                          href="/signup"
                          className="font-medium text-my-purple underline"
                        >
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="
                              w-full text-center
                              text-black hover:text-white text-xl font-bold
                              bg-white hover:bg-my-purple
                              rounded-lg px-5 py-2.5 border-2 border-black duration-300 transition
                              focus:ring-4 focus:outline-none focus:ring-my-purple
                              dark:bg-gray-700 dark:text-white dark:hover:bg-primary-700 dark:focus:ring-my-pink2"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  already signed up?{" "}
                  <Link
                    href="/signin"
                    className="font-medium text-my-purple underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
              <div className="flex items-center justify-between">
                <div className="w-5/12 border-b border-black"></div>
                <div className="w-2/12 text-center">or</div>
                <div className="w-5/12 border-b border-black"></div>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className={
                    "flex items-center justify-center mobile:w-20 mobile:h-20 rounded-2xl drop-shadow-xl border border-my-purple cursor-pointer group " +
                    styles.boxshadow
                  }
                >
                  <FcGoogle className="w-12 mobile:w-14 h-12 mobile:h-14 group-hover:animate-wiggle" />
                </div>
                <div
                  className={
                    "flex items-center justify-center mobile:w-20 mobile:h-20 rounded-2xl drop-shadow-xl border border-my-purple cursor-pointer group " +
                    styles.boxshadow
                  }
                >
                  <FaFacebook
                    color="#1877F2"
                    className="w-12 mobile:w-14 h-12 mobile:h-14 group-hover:animate-wiggle"
                  />
                </div>
                <div
                  className={
                    "flex items-center justify-center mobile:w-20 mobile:h-20 rounded-2xl drop-shadow-xl border border-my-purple cursor-pointer group " +
                    styles.boxshadow
                  }
                >
                  <FaTwitter
                    color="#55ACEE"
                    className="w-12 mobile:w-14 h-12 mobile:h-14 group-hover:animate-wiggle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
