import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useFormik } from 'formik';

import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import styles from "/styles/Home.module.css"

const Signin = () => {
  const {data: session} = useSession();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit
  });
  async function onSubmit(values) {
    console.log(values)
  };

  return ( 
    <>
      <Head>
        <title>rankmyOutfit - Sign in</title>
        <meta name="description" content="Make sure you look your Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-[url('/images/sun-tornado1.png')] dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
          <div className="flex flex-col justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white my-4">
            <Image
              width={100}
              height={100}
              src="/images/logo-purple.png"
              className="w-16 h-16 mr-2"
              alt="Logo"
            />
            <span className="font-display font-black text-4xl text-my-purple">
              rateMyOutfit
            </span>
          </div>
          <div id="form" className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 my-4">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...formik.getFieldProps('email')}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...formik.getFieldProps('password')}
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
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-my-pink1 underline text-right"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="
                              w-full text-center
                              text-black hover:text-white text-xl font-bold
                              bg-white hover:bg-my-pink1
                              rounded-lg px-5 py-2.5 border-2 border-black duration-300 transition
                              focus:ring-4 focus:outline-none focus:ring-my-pink1
                              dark:bg-gray-700 dark:text-white dark:focus:ring-my-pink2"
                >
                  Sign in
                </button>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  new user?{" "}
                  <Link href="/signup#form" className="font-medium text-my-pink1 underline">
                    Sign up
                  </Link>
                </div>
              </form>
              <div className="flex items-center justify-between">
                  <div className="w-5/12 border-b border-black"></div>
                  <div className="w-2/12 text-center">or</div>
                  <div className="w-5/12 border-b border-black"></div>
              </div>
              <div className="flex items-center justify-between">
                  <div className={"flex items-center justify-center mobile:w-20 mobile:h-20 rounded-2xl drop-shadow-xl border border-my-pink1 cursor-pointer group "+styles.boxshadow}>
                      <FcGoogle onClick={()=>signIn("google")} className="w-12 mobile:w-14 h-12 mobile:h-14 group-hover:animate-wiggle" />
                  </div>
                  <div className={"flex items-center justify-center mobile:w-20 mobile:h-20 rounded-2xl drop-shadow-xl border border-my-pink1 cursor-pointer group "+styles.boxshadow}>
                      <FaFacebook onClick={()=>signIn("facebook")} color='#1877F2' className="w-12 mobile:w-14 h-12 mobile:h-14 group-hover:animate-wiggle" />
                  </div>
                  <div className={"flex items-center justify-center mobile:w-20 mobile:h-20 rounded-2xl drop-shadow-xl border border-my-pink1 cursor-pointer group "+styles.boxshadow}>
                      <FaTwitter color='#55ACEE' className="w-12 mobile:w-14 h-12 mobile:h-14 group-hover:animate-wiggle" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
      return {
          redirect: {
              destination: '/outfits'
          }
      }
  }

  return {
      props: {
          session
      }
  }
}