import React from "react";
 import SignUpSVG from "../assets/signupimage-png.webp";
import planeImage from "../assets/qyshe.webp";
 import GoogleButton from "../../src/components/molecules/GoogleButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  

  const {
    register: registerEmail,
    handleSubmit,
    formState: { errors: emailErrors },
    setError,
  } = useForm({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  
  const onEmailSubmit = (data) => {
    console.log("Submitted data:", data);
    
  };

  return (
    <div className="bg-[#f0e9d5] flex flex-row justify-center items-center w-full h-screen">
      <div className="SignInRectangle bg-[#F0E9D5] max-w-[90%] max-h-[90%] z-1 lg:w-[547px] h-[688px] sm:w-[400px] rounded-2xl 
          border-[0.5px] border-[#c5c5c5] shadow-[0px_4px_4px_#00000040] ">
        <div className="RectangleVerticalForm h-full w-full flex flex-col place-items-center">
          {/* Step 1: Initial Email Form */}
          <div className="h-[35%] relative flex justify-center">
            <img
              loading="lazy"
              src={SignUpSVG}
              alt="man-looking"
              className="-[70%] relative opacity-[82%] object-contain"
            />
            
          </div>
          <div className="relative">
              <h1 className="text-4xl font-semibold font-inter text-[#3a260e]">
                Login
              </h1>
            </div>
            <GoogleButton buttonText="Sign In with Google"/>
          {/* Dividing part with the two borders and the text or in the middle */}
          <div className="BorderswithOrInMiddle flex items-center my-2 w-[80%] justify-center">
            <div className="flex-grow border-t border-[#B2ABAB]"></div>
            <span className="mx-4 text-gray-700 text-md">or</span>
            <div className="flex-grow border-t border-[#B2ABAB]"></div>
          </div>
          {/* Email input form */}
          <form
            onSubmit={handleSubmit(onEmailSubmit)}
            className="w-full px-[10%] flex flex-col"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-700 font-medium"></label>
              <div className="flex flex-col min-h-[80px]">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`border ${
                    emailErrors.email
                      ? "border-red-500"
                      : "border-[0.5px] border-gray-400"
                  } rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2
                  focus:ring-teal-500 text-sm sm:text-base placeholder-gray-400`}
                  {...registerEmail("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {emailErrors.email && (
                  <p className="text-red-500 text-sm">{emailErrors.email.message}</p>
                )}
              </div>
            </div>
            <div className="mb-2 flex items-center flex-col items-start">
              <div className="w-full flex justify-between ">
                <div>
                <input
                  className="mr-2"
                  size={16}
                  type="checkbox"
                  {...registerEmail("Remember", {
                    required: "Remember me",
                  })}
                />
                <label htmlFor="remember me ">
                     Remember me{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        className="font-semibold"
                      >
                        
                      </a>{" "}
                      {" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        className="font-semibold"
                      >
                        
                      </a>

                </label>
                </div>
                {emailErrors.terms && (
                  <p className="text-red-500 text-sm">{emailErrors.terms.message}</p>
                )}
                <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  
                }}
                className="text-teal-600 hover:underline cursor-pointer"
              >
                Forgot your password?
              </a>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-3 bg-[#668F82] text-[#F0E9D5] text-2xl rounded-[10px]
               hover:bg-teal-600 focus:ring-2 focus:ring-teal-500
              hover:cursor-pointer transition duration-150
              [box-shadow:0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]"
              >
                LogIn
              </button>
            </div>
          </form>
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

export default Login;
