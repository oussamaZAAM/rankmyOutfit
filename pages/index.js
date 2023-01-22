import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { MdOutlineDoubleArrow } from "react-icons/md";
import subBackground1 from "../public/images/sub-background1.png";
import subBackground2 from "../public/images/sub-background2.png";
import loading from "../public/images/loading.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>rankmyOutfit</title>
        <meta name="description" content="Make sure you look your Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Importing Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alumni+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alice&display=swap"
          rel="stylesheet"
        />
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
          <div className="flex justify-center items-center | w-48 sm:w-64 h-12 my-4 rounded-3xl bg-neutral-800">
            <button className="flex justify-evenly items-center | w-8/12 h-full">
              <b className="text-white">Get Started</b>
              <MdOutlineDoubleArrow color="white" size={35} />
            </button>
          </div>
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
        <img
          className="h-48 w-full object-cover -mt-12"
          src={subBackground1.src}
        />

        {/* The Services of the Application */}
        <div className="grid grid-cols-8 w-full">
          {/* Grid to let a margin */}
          <div className="col-start-2 col-span-6 | flex flex-col justify-start items-center | bg-white min-h-60 rounded -mt-12 drop-shadow-md">
            <b className="font-subtitle font-medium text-4xl text-center my-4">
              What are{" "}
              <span className="font-bold" style={{ color: "#6F1AB6" }}>
                rankmyOutfit
              </span>
              ‘s Services
            </b>

            <div className="grid grid-cols-12 my-4">

              {/* Service 1 */}
              <div
                className="flex flex-col justify-center items-center |  col-start-3 col-span-3 | rounded-t-full rounded-bl-full drop-shadow-md"
                style={{ backgroundColor: "#FFF4FF", maxWidth: '200px' }}
              >
                <img
                  src={loading.src}
                  className="w-full h-full object-cover rounded-full border-2"
                />
                <p className="font-body font-normal text-base indent-2 my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="flex justify-center items-center | w-16 sm:w-24 h-12 my-4 rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>

              {/* Service 2 */}
              <div
                className="flex flex-col justify-center items-center |  col-start-8 col-span-3 | rounded-t-full rounded-br-full drop-shadow-md"
                style={{ backgroundColor: "#FFF4FF", maxWidth: '200px' }}
              >
                <img
                  src={loading.src}
                  className="w-full h-full object-cover rounded-full border-2"
                />
                <p className="font-body font-normal text-base indent-2 my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="flex justify-center items-center | w-16 sm:w-24 h-12 my-4 rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Separator 2 */}
        <img
          className="h-48 w-full object-cover -mt-12"
          src={subBackground2.src}
        />

        <div className="grid grid-cols-8 w-full">
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

            <b className="font-display font-semibold text-2xl mt-4">
              Let the <span style={{ color: "#DB76DC" }}>AI</span> help you
            </b>

            {/* AI Cards */}
            <div className="flex justify-center items-center my-4">
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

            <b className="font-display font-semibold text-2xl mt-4">
              Let other <span style={{ color: "#DB76DC" }}>People</span> help
              you
            </b>

            {/* People Cards */}
            <div className="flex justify-center items-center my-4">
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
        <img
          className="h-48 w-full object-cover -mt-12"
          src={subBackground1.src}
        />

        {/* Goals  */}
        <div className="grid grid-cols-8 w-full">
          {/* Grid to let a margin */}
          <div className="col-start-2 col-span-6 | flex flex-col justify-start items-center | bg-white min-h-60 rounded -mt-12 drop-shadow-md">
            <b className="font-subtitle font-medium text-4xl text-center my-4">
              <span className="font-bold" style={{ color: "#6F1AB6" }}>
                rankmyOutfit
              </span>
              ‘s Goals
            </b>
            <div className="flex justify-evenly items-center">
              
              {/* Goal 1 */}
              <div
                className="flex flex-col justify-center items-center |  col-start-8 col-span-3 | rounded-t-full rounded-br-full drop-shadow-md mx-4"
                style={{ backgroundColor: "#FFF4FF", maxWidth: "200px"}}
              >
                <img
                  src={loading.src}
                  className="w-full h-full object-cover rounded-full border-2"
                />
                <p className="font-body font-normal text-base indent-2 my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="flex justify-center items-center | w-16 sm:w-24 h-12 my-4 rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>
              
              {/* Goal 2 */}
              <div
                className="flex flex-col justify-center items-center |  col-start-8 col-span-3 | rounded-full drop-shadow-md mx-4"
                style={{ backgroundColor: "#FFF4FF", maxWidth: "200px"}}
              >
                <img
                  src={loading.src}
                  className="w-full h-full object-cover rounded-full border-2"
                />
                <p className="font-body font-normal text-base indent-2 my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="flex justify-center items-center | w-16 sm:w-24 h-12 my-4 rounded-3xl bg-neutral-800">
                  <button className="">
                    <MdOutlineDoubleArrow color="white" size={35} />
                  </button>
                </div>
              </div>

              {/* Goal 3 */}
              <div
                className="flex flex-col justify-center items-center |  col-start-8 col-span-3 | rounded-t-full rounded-bl-full drop-shadow-md mx-4"
                style={{ backgroundColor: "#FFF4FF", maxWidth: "200px"}}
              >
                <img
                  src={loading.src}
                  className="w-full h-full object-cover rounded-full border-2"
                />
                <p className="font-body font-normal text-base indent-2 my-4 w-11/12 sm:w-9/12 md:w-3/4 lg:1/2">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos
                </p>
                <div className="flex justify-center items-center | w-16 sm:w-24 h-12 my-4 rounded-3xl bg-neutral-800">
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
