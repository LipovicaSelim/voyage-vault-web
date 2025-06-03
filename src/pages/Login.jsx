import React, { useState, useEffect } from "react";
import SignUpSVG from "../assets/signupimage-png.webp";
import planeImage from "../assets/qyshe.webp";
import GoogleButton from "../../src/components/molecules/GoogleButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VerifyCode from "../components/organisms/VerifyCode";
import axios from "axios";

function Login() {
  const [step, setStep] = useState("initial");
  const [email, setEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onEmailSubmit = async (data) => {
    console.log("data", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        { email: data.email },
        { withCredentials: true }
      );
      console.log("Sign-in response: ", response.data);
      setEmail(data.email);
      setStep("code");
      setResendTimer(30);
    } catch (err) {
      console.error("Sign-in error: ", err.response?.data || err.message);
      if (
        err.response?.data.message ===
        "Please complete signup by verifying your email. Use the signup page to resume."
      ) {
        navigate("/signup", { state: { email: data.email } });
      } else {
        setFormError("email", {
          type: "manual",
          message:
            err.response?.data.message || "An error occurred during sign-in.",
        });
      }
    }
  };

  const navigate = useNavigate();
  const handleSignUpClick = () => navigate("/signup");

  const handleGoogleSignIn = () => {
    const redirectUri = encodeURIComponent(
      "http://localhost:5000/api/auth/google-callback"
    );
    const clientId =
      "961694883404-brm4h2smg2fotcb9dq3veqsnp749bdo4.apps.googleusercontent.com";
    const scope = encodeURIComponent("email profile openid");
    const responseType = "code";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=select_account`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <div className="bg-[#f0e9d5] flex flex-row justify-center items-center w-full h-screen">
      <div
        className="SignInRectangle bg-[#F0E9D5] max-w-[90%] max-h-[90%] z-1 lg:w-[547px] h-[688px] sm:w-[400px] rounded-2xl 
          border-[0.5px] border-[#c5c5c5] shadow-[0px_4px_4px_#00000040]"
      >
        <div className="RectangleVerticalForm h-full w-full flex flex-col place-items-center">
          {step === "initial" && (
            <>
              <div className="h-[35%] relative flex justify-center">
                <img
                  loading="lazy"
                  src={SignUpSVG}
                  alt="man-looking"
                  className="w-[70%] relative opacity-[82%] object-contain"
                />
              </div>
              <div className="relative">
                <h1 className="text-4xl font-semibold font-inter text-[#3a260e]">
                  Log in
                </h1>
              </div>
              <GoogleButton
                buttonText="Sign In with Google"
                onClick={handleGoogleSignIn}
              />
              <div className="BorderswithOrInMiddle flex items-center my-2 w-[80%] justify-center">
                <div className="flex-grow border-t border-[#B2ABAB]"></div>
                <span className="mx-4 text-gray-700 text-md">or</span>
                <div className="flex-grow border-t border-[#B2ABAB]"></div>
              </div>
              <form
                onSubmit={handleSubmit(onEmailSubmit)}
                className="w-full px-[10%] flex flex-col"
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
                      className={`border ${
                        errors.email
                          ? "border-red-500"
                          : "border-[0.5px] border-gray-400"
                      } rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2
                      focus:ring-teal-500 text-sm sm:text-base placeholder-gray-400`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-2 flex items-center flex-col items-start">
                  <div className="w-full flex justify-between">
                    <div>
                      <input
                        className="mr-2"
                        type="checkbox"
                        id="rememberMe"
                        {...register("rememberMe", { required: "Remember me" })}
                      />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    {/* Removed "Forgot your password?" since it's passwordless */}
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center px-4 py-3 bg-[#668F82] text-[#F0E9D5] text-2xl rounded-[10px]
                    hover:bg-teal-600 focus:ring-2 focus:ring-teal-500
                    hover:cursor-pointer transition duration-150
                    [box-shadow:0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <p className="mt-2">
                Don't you have an account?
                <span
                  onClick={handleSignUpClick}
                  className="hover:cursor-pointer text-lg font-bold font-inter text-[20px] text-[#668F82] ml-2"
                >
                  Sign Up
                </span>
              </p>
            </>
          )}
          {step === "code" && (
            <div className="w-full px-[10%] flex flex-col items-center">
              <VerifyCode
                email={email}
                setStep={setStep}
                resendTimer={resendTimer}
                setResendTimer={setResendTimer}
                setError={setError}
                isSignIn={true}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-[#E4DCC3] fixed bottom-0 h-[20%] h-max-[200px]"></div>
      <img
        src={planeImage}
        loading="lazy"
        alt="plane"
        className="w-[520px] max-w-[90%] fixed top-[110px] left-[50px] opacity-[0.8]"
      />
    </div>
  );
}

export default Login;