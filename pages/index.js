import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { MdOutlineDoubleArrow } from "react-icons/md";

import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>rankmyOutfit</title>
        <meta name="description" content="Make sure you look your Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center items-center | w-full">
        {/* Home Page Welcome Section */}
        <div
          className={[
            "flex flex-col justify-center items-center | w-full",
            styles.background,
            // set CSS for the background
          ].join(" ")}
        >
          <div className="flex justify-center items-center | w-1/2 md:w-1/4 h-full">
            <h1 className="font-bold font-title | text-white text-6xl text-center leading-normal | w-80 | drop-shadow-md">
              Make sure you look your
              <br />
              <span
                className="font-bold font-title text-8xl text-center | py-4"
                style={{ color: "#DB76DC" }}
              >
                Best
              </span>
            </h1>
          </div>
          <Link href='/outfits' className="flex justify-center items-center | w-48 sm:w-64 h-12 my-4 rounded-3xl bg-neutral-800">
            <button className="flex justify-evenly items-center | w-8/12 h-full">
              <b className="text-white">Get Started</b>
              <MdOutlineDoubleArrow color="white" size={35} />
            </button>
          </Link>
        </div>

        {/* Brief Description of the Applicaiton */}
        <div className="grid grid-cols-8 w-full">
          {/* Grid to let a margin */}
          <div className="col-start-2 col-span-6 | flex flex-col justify-start items-center | bg-white min-h-60 rounded -mt-12 drop-shadow-md">
            <b className="font-subtitle font-medium text-4xl text-center my-4">
              What do we do
            </b>
            <p className="font-body font-normal text-xl indent-2 my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
              Nullam blandit cursus elit, quis aliquam quam tristique vitae.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Phasellus blandit placerat mauris
              vel pharetra, lobortis mollis fermentum. In eu arcu risus. Nullam
              blandit cursus
            </p>
          </div>
        </div>

        {/* Separator 1 */}
        <Image
          width={500}
          height={500}
          alt="Background"
          className="h-48 w-full object-cover -mt-12"
          src='/images/sub-background1.png'
        />

        {/* The Services of the Application */}
        <div className="mobile:grid grid-cols-8 w-full">
          {/* Grid to let a margin */}
          <div className="col-start-2 col-span-6 | flex flex-col justify-start items-center | bg-white min-h-60 rounded -mt-12 drop-shadow-md w-full">
            <b className="font-subtitle font-medium text-4xl text-center my-4">
              What are{" "}
              <span className="font-bold" style={{ color: "#6F1AB6" }}>
                rankmyOutfit
              </span>
              &apos;s Services
            </b>

            <div
              className="
                        flex flex-col justify-center items-center justify-items-center
                        md:grid md:grid-cols-12 w-full"
            >
              {/* Service 1 */}
              <div
                className="
                          flex md:flex-col justify-center items-center
                          md:w-40 my-4 mx-4
                          md:col-start-3 md:col-span-3
                          rounded-t-full rounded-bl-full drop-shadow-md"
                style={{ backgroundColor: "#FFF4FF" }}
              >
                <Image
                  width={160}
                  height={160}
                  alt="loading"
                  src="/images/loading.png"
                  className="
                            hidden xs:block
                            h-24 sm:h-40
                            object-cover rounded-full border-2"
                />
                <p className="
                              font-body font-normal text-center sm:text-base indent-2
                              my-4 w-10/12 md:w-9/12">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="
                                flex justify-center items-center
                                sm:h-12 sm:w-24 my-4
                                rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>

              {/* Service 2 */}
              <div
                className="
                          flex md:flex-col justify-center items-center
                          md:w-40 my-4 mx-4
                          md:col-start-8 md:col-span-3
                          rounded-b-full rounded-tl-full  md:rounded-t-full md:rounded-br-full md:rounded-bl-none drop-shadow-md"
                style={{ backgroundColor: "#FFF4FF" }}
              >
                <Image
                  width={160}
                  height={160}
                  alt="loading"
                  src="/images/loading.png"
                  className="
                            hidden xs:block
                            h-24 sm:h-40 
                            object-cover rounded-full border-2"
                />
                <p className="
                              font-body font-normal text-center sm:text-base indent-2
                              my-4 w-10/12 md:w-9/12">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="
                                flex justify-center items-center
                                sm:h-12 sm:w-24 my-4
                                rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Separator 2 */}
        <Image
          width={100}
          height={100}
          alt="Background"
          className="h-48 w-full object-cover -mt-12"
          src='/images/sub-background2.png'
        />

        <div className="mobile:grid grid-cols-8 w-full">
          {/* Grid to let a margin */}
          <div className="col-start-2 col-span-6 | flex flex-col justify-start items-center | bg-white min-h-60 rounded -mt-12 drop-shadow-md">
            <b
              className="font-subtitle font-medium text-4xl text-center my-4"
              style={{ maxWidth: "430px" }}
            >
              <span className="font-bold" style={{ color: "#DB76DC" }}>
                rankmyOutfit
              </span>{" "}
              helps you choose your best outfit
            </b>

            <b className="font-display text-center font-semibold text-2xl mt-4">
              Let the <span style={{ color: "#DB76DC" }}>AI</span> help you
            </b>

            {/* AI Cards */}
            <div className="flex flex-col md:flex-row justify-center items-center my-4">
              <div
                className="mx-4 p-4 md:px-16 rounded flex flex-col justify-center items-start"
                style={{ backgroundColor: "#FFF4FF", maxWidth: "248px" }}
              >
                <MdOutlineDoubleArrow />
                <p className="font-body">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos hi
                </p>
              </div>
              <div
                className="my-4 mx-4 p-4 md:px-16 rounded flex flex-col justify-center items-start"
                style={{ backgroundColor: "#FFF4FF", maxWidth: "248px" }}
              >
                <MdOutlineDoubleArrow />
                <p className="font-body">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos hi
                </p>
              </div>
            </div>

            <b className="font-display text-center font-semibold text-2xl mt-4">
              Let other <span style={{ color: "#DB76DC" }}>People</span> help
              you
            </b>

            {/* People Cards */}
            <div className="flex flex-col md:flex-row justify-center items-center my-4">
              <div
                className="my-4 mx-4 p-4 md:px-16 rounded flex flex-col justify-center items-start"
                style={{ backgroundColor: "#FFF4FF", maxWidth: "248px" }}
              >
                <MdOutlineDoubleArrow />
                <p className="font-body">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos hi
                </p>
              </div>
              <div
                className="mx-4 p-4 md:px-16 rounded flex flex-col justify-center items-start"
                style={{ backgroundColor: "#FFF4FF", maxWidth: "248px" }}
              >
                <MdOutlineDoubleArrow />
                <p className="font-body">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos hi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Separator 3 */}
        <Image
          width={500}
          height={500}
          alt="Background"
          className="h-48 w-full object-cover -mt-12"
          src='/images/sub-background1.png'
        />

        {/* Goals  */}
        <div className="mobile:grid grid-cols-8 w-full">
          {/* Grid to let a margin */}
          <div className="
                          flex flex-col justify-start items-center
                          col-start-2 col-span-6
                          bg-white min-h-60 rounded -mt-12 drop-shadow-md w-full">
            <b className="font-subtitle font-medium text-4xl text-center my-4">
              <span className="font-bold" style={{ color: "#6F1AB6" }}>
                rankmyOutfit
              </span>
              &apos;s Goals
            </b>
            <div className="
                            flex flex-col justify-aroun items-center
                            md:grid md:grid-cols-16 justify-items-center
                            w-full">
              {/* Goal 1 */}
              <div
                className="
                          flex md:flex-col justify-center items-center
                          md:w-40 my-4 mx-4 | md:col-start-1 md:col-span-4
                          rounded-b-full rounded-tl-full md:rounded-t-full md:rounded-bl-none md:rounded-br-full drop-shadow-md"
                style={{ backgroundColor: "#FFF4FF" }}
              >
                <Image
                  width={160}
                  height={160}
                  alt="loading"
                  src="/images/loading.png"
                  className="
                            hidden xs:block
                            h-24 sm:h-40 
                            object-cover rounded-full border-2"
                />
                <p className="
                              font-body font-normal text-center sm:text-base indent-2
                              my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="
                                flex justify-center items-center
                                sm:h-12 sm:w-24 my-4
                                rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>

              {/* Goal 2 */}
              <div
                className="
                          flex md:flex-col justify-center items-center
                          md:w-40 my-4 mx-4 | md:col-start-6 md:col-span-5
                          rounded-b-full rounded-t-full drop-shadow-md"
                style={{ backgroundColor: "#FFF4FF" }}
              >
                <Image
                  width={160}
                  height={160}
                  alt="loading"
                  src="/images/loading.png"
                  className="
                            hidden xs:block
                            h-24 sm:h-40 
                            object-cover rounded-full border-2"
                />
                <p className="
                              font-body font-normal text-center sm:text-base indent-2
                              my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="
                                flex justify-center items-center
                                sm:h-12 sm:w-24 my-4
                                rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>

              {/* Goal 3 */}
              <div
                className="
                          flex md:flex-col justify-center items-center
                          md:w-40 my-4 mx-4 | md:col-start-12 md:col-span-4
                          rounded-bl-full rounded-t-full drop-shadow-md"
                style={{ backgroundColor: "#FFF4FF" }}
              >
                <Image
                  width={160}
                  height={160}
                  alt="loading"
                  src="/images/loading.png"
                  className="
                            hidden xs:block
                            h-24
                            sm:h-40
                            object-cover rounded-full border-2"
                />
                <p className="
                              font-body font-normal text-center sm:text-base indent-2
                              my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="
                                flex justify-center items-center
                                sm:h-12 sm:w-24 my-4
                                rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>

            </div>
            {/* End Goal Cards  */}
          </div>
        </div>
        {/* End Goals  */}
      </div>
    </>
  );
}
