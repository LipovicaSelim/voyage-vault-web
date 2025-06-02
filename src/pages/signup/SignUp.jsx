import React, { useEffect } from "react";
import planeImage from "../../assets/qyshe.webp";
import SignUpSVG from "../../assets/signupimage-png.webp";
import GoogleLogo from "../../assets/google-color-icon.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import VerifyCode from "../../components/organisms/VerifyCode.jsx";
import SignUpFailed from "../../components/organisms/SignUpFailed.jsx";
import GoogleButton from "../../components/molecules/GoogleButton.jsx";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState("initial");
  const [email, setEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form setup for email
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
    setError,
  } = useForm({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  // Handle email submit
  const onEmailSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { email: data.email },
        { withCredentials: true }
      );
      console.log("Signup response:", response.data);
      // Handle success
      setEmail(data.email);
      setStep("code");
      setResendTimer(30);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      if (err.response?.data.message === "User already exists") {
        setError("email", {
          type: "manual",
          message: "Email is already in use. Please sign in.",
        });
      } else {
        setError("email", {
          type: "manual",
          message:
            err.response?.data.message || "An error occurred during signup.",
        });
      }
    }
  };

  const handleLoginClick = () => navigate("/login");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get("success");
    const errorParam = urlParams.get("error");
    const emailParam = urlParams.get("email");

    console.log("URL Params:", { successParam, errorParam, emailParam });

    if (successParam === "true" && emailParam) {
      setEmail(emailParam);
      axios
        .get(
          `http://localhost:5000/api/auth/verify-google?email=${encodeURIComponent(
            emailParam
          )}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Verify Google response:", response.data);
          if (response.data.isGoogle) {
            navigate("../");
          } else {
            setSuccess(true);
            setStep("code");
            setResendTimer(30);
          }
        })
        .catch((error) => {
          console.error("Verify Google error:", error.response?.data);
          setErr(
            "Authentication verification failed: " +
              (error.response?.data.message || error.message)
          );
          setStep("failed");
        });
    } else if (errorParam) {
      setErr(errorParam);
      setStep("failed");
    }
  }, []);

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
        className="SignUpRectangle bg-[#F0E9D5] max-w-[90%]  max-h-[90%] z-1 lg:w-[547px] h-[688px] sm:w-[400px]  rounded-2xl 
      border-[0.5px] border-[#c5c5c5] shadow-[0px_4px_4px_#00000040] "
      >
        <div className="RectangleVerticalForm  h-full w-full flex flex-col items-center">
          {/* Step 1: Initial Email Form */}
          {step === "initial" && (
            <>
              <div className="h-[35%] relative  flex  justify-center ">
                <img
                  loading="lazy"
                  src={SignUpSVG}
                  alt="man-looking"
                  className="-[70%] relativwe opacity-[82%] object-contain"
                />
              </div>
              <div className="relative ">
                <h1 className="text-4xl font-semibold font-inter text-[#3a260e]">
                  Sign Up
                </h1>
              </div>
              {/* Google Button */}
              <GoogleButton
                buttonText="Sign Up with Google"
                onClick={handleGoogleSignIn}
              />
              {err && (
                <p className="text-red-500 mt-2">{decodeURIComponent(err)}</p>
              )}

              {/* Dividing part with the two borders and the text or in the middle */}
              <div className="BorderswithOrInMiddle flex items-center my-2 w-[80%] justify-center">
                <div className="flex-grow border-t border-[#B2ABAB]"></div>
                <span className="mx-4 text-gray-700 text-md">or</span>
                <div className="flex-grow border-t border-[#B2ABAB]"></div>
              </div>
              {/*Email input form*/}
              <form
                onSubmit={handleEmailSubmit(onEmailSubmit)}
                className="w-full px-[10%] flex flex-col "
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
              emailErrors.email
                ? "border-red-500"
                : "border-[0.5px] border-gray-400"
            } rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2
            focus:ring-teal-500 text-sm sm:text-base placeholder-gray-400
            `}
                      {...registerEmail("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {emailErrors.email && (
                      <p className="text-red-500 text-sm">
                        {emailErrors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-2 flex items-center flex-col items-start">
                  <div>
                    <input
                      className="mr-2"
                      size={16}
                      type="checkbox"
                      {...registerEmail("terms", {
                        required: "You must agree to the Terms",
                      })}
                    />
                    <label>
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        className="font-semibold"
                      >
                        Terms
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        className="font-semibold"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {emailErrors.terms && (
                    <p className="text-red-500 text-sm">
                      {emailErrors.terms.message}
                    </p>
                  )}
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
            </>
          )}

          {step === "code" && (
            <VerifyCode
              email={email}
              setStep={setStep}
              resendTimer={resendTimer}
              setResendTimer={setResendTimer}
              setError={setError}
              // onCodeSubmit={onCodeSubmit}
            />
          )}

          {step === "failed" && <SignUpFailed setStep={setStep} />}
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
