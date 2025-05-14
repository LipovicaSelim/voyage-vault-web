import React from "react";
import planeImage from "../../assets/qyshe.png";
import Logo from "../../assets/logo-svg-format.svg";
import SignUpSVG from "../../assets/signupimage-png.png";
import GoogleLogo from "../../assets/google-color-icon.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const handleLoginClick = () => navigate("/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Email submitted:", data.email);
  };

  return (
    <div className="bg-[#f0e9d5] flex flex-row justify-center items-center w-full h-screen">
      <div
        className="SignUpRectangle bg-[#F0E9D5] max-w-[90%]  max-h-[90%] z-1 lg:w-[547px] h-[688px] sm:w-[400px]  rounded-2xl 
      border-[0.5px] border-[#c5c5c5] shadow-[0px_4px_4px_#00000040] "
      >
        <div className="RectangleVerticalForm  h-full w-full flex flex-col items-center">
          <div className="h-[35%] relative  flex  justify-center ">
            <img
              loading="lazy"
              src={SignUpSVG}
              alt="man-looking"
              className="w-[70%] relative opacity-[82%] object-contain"
            />
          </div>
          <div className="relative ">
            <h1 className="text-4xl font-semibold font-inter text-[#3a260e]">
              Sign Up
            </h1>
          </div>

          {/* Google Button */}

          <button
            className="SignUp mt-2 with Google w-[90%] h-[55px] bg-[#F0E9D5] border-2 border-[#3E9FC9] rounded-md px-4 py-2 flex 
            justify-center items-center
           hover:bg-[#d9d3c3] hover:cursor-pointer transition duration-150 ease-out"
            aria-label="Sign up with Google"
          >
            <img
              loading="lazy"
              src={GoogleLogo}
              alt="Google Logo"
              className="w-[30px] h-[30px] mr-2"
            />
            <p className="text-2xl font-inter text-neutral-600 font-[400]">
              Sign Up with Google
            </p>
          </button>

          {/* Dividing part with the two borders and the text or in the middle */}
          <div className="BorderswithOrInMiddle flex items-center my-2 w-[90%] justify-center">
            <div className="flex-grow border-t border-[#B2ABAB]"></div>
            <span className="mx-4 text-gray-700 text-md">or</span>
            <div className="flex-grow border-t border-[#B2ABAB]"></div>
          </div>

          {/*Email input form*/}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-[5%] flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-gray-700 font-medium"
              ></label>
              <div className="flex flex-col min-h-[80px]">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`
            border ${
              errors.email ? "border-red-500" : "border-[0.5px] border-gray-400"
            } rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2
            focus:ring-teal-500 text-sm sm:text-base placeholder-gray-400
            `}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3 bg-[#668F82] text-[#F0E9D5] text-2xl rounded-[10px]
               hover:bg-teal-600 focus:ring-2 focus:ring-teal-500
              hover:cursor-pointer transition duration-150
              [box-shadow:0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]
              "
            >
              Continue
            </button>
          </form>

          {/* Already have an account */}
          <p className="mt-2">
            Already have an account?
            <span
              onClick={handleLoginClick}
              className="hover:cursor-pointer text-lg font-bold text-inter text-[20px] text-[#668F82] ml-2"
            >
              Log in{" "}
            </span>
          </p>
        </div>
      </div>

      {/* Robust parts of design */}
      <div className="w-full bg-[#E4DCC3] fixed bottom-0 h-[20%] h-max-[200px]"></div>
      <img
        src={planeImage}
        loading="lazy"
        alt="plane"
        className="w-[520px] max-w-[90%] fixed top-[110px] left-[50px] opacity-[0.8] "
      />
    </div>
  );
}

export default SignUp;
