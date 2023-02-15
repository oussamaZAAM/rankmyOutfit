import Head from "next/head";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { useFormik } from 'formik';

import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import styles from "/styles/Home.module.css";

const Signup = () => {
  //Sign up Validation Form
  const validate = values => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length < 6) {
      errors.username = 'Username must have at least 6 characters';
    } else if (values.username.includes(" ")) {
      errors.username = 'Invalid Username';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
      errors.password = 'Must be greater than 8 and less than 20 characters';
    } else if (values.password.includes(" ")) {
      errors.password = 'Invalid Password';
    }

    if (!values.repassword) {
      errors.repassword = 'Required';
    } else if (values.password !== values.repassword) {
      errors.repassword = 'Passwords do not match';
    } else if (values.repassword.includes(" ")) {
      errors.repassword = 'Invalid Password';
    }
    
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repassword: ''
    },
    validate,
    onSubmit
  });
  async function onSubmit(values) {
    console.log(values)
  };
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
              alt="Logo"
            />
            <span className="font-display font-black text-4xl text-my-pink1">
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
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    {...formik.getFieldProps('username')}
                    id="username"
                    className={"bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "+(formik.errors.username && formik.touched.username ? " border-red-500" : " border-gray-300")}
                    placeholder="Enter your username"
                    required
                  />
                  {formik.errors.username && formik.touched.username && <span className="text-sm text-red-500">{formik.errors.username}</span>}
                </div>
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
                    className={"bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "+(formik.errors.email && formik.touched.email ? " border-red-500" : " border-gray-300")}
                    placeholder="Enter your email address"
                    required
                  />
                  {formik.errors.email && formik.touched.email && <span className="text-sm text-red-500">{formik.errors.email}</span>}
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
                    className={"bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "+(formik.errors.password && formik.touched.password ? " border-red-500" : " border-gray-300")}
                    required
                  />
                  {formik.errors.password && formik.touched.password && <span className="text-sm text-red-500">{formik.errors.password}</span>}
                </div>
                <div>
                  <label
                    htmlFor="repassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="repassword"
                    {...formik.getFieldProps('repassword')}
                    id="repassword"
                    placeholder="••••••••"
                    className={"bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "+(formik.errors.repassword && formik.touched.repassword ? " border-red-500" : " border-gray-300")}
                    required
                  />
                  {formik.errors.repassword && formik.touched.repassword && <span className="text-sm text-red-500">{formik.errors.repassword}</span>}
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
                        htmlFor="terms"
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
                              focus:outline-none
                              dark:bg-gray-700 dark:text-white dark:hover:bg-primary-700"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  already signed up?{" "}
                  <Link
                    href="/signin#form" 
                    className="font-medium text-my-purple underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;

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