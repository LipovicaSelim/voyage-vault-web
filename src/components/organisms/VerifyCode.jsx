import React from "react";
import { useForm, Controller } from "react-hook-form";
import FloatingBalloons from "../../assets/floating-ballons.webp";
import Envelope from "../../assets/envelope-line-icon.svg";
import ReactCodeInput from "react-code-input";
import { useNavigate } from "react-router-dom";

function VerifyCode({
  email,
  setStep,
  resendTimer,
  setResendTimer,
  setError,
  isSignIn = false,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { code: "" },
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const handleResend = async () => {
    if (resendTimer === 0) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/resend-code",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          setResendTimer(30);
          console.log("Code resent successfully");
        } else {
          console.error("Resend failed:", result.message);
        }
      } catch (error) {
        console.error("Resend error:", error.message);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = isSignIn
        ? "http://localhost:5000/api/auth/signin-verify"
        : "http://localhost:5000/api/auth/verify-code";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: data.code }),
        credentials: "include",
      });
      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Verification failed");

      if (isSignIn) {
        setTimeout(() => navigate("/"), 2000);
      } else {
        if (result.message === "Sign-up completed successfully") {
          navigate("../");
        } else {
          setStep("failed");
        }
      }
    } catch (error) {
      console.log(
        `${isSignIn ? "Sign-in" : "Verification"} error:`,
        error.message
      );
      setError(error.message);
      setStep("failed");
    }
  };

  return (
    <>
      <div className="w-[65%] relative flex justify-center opacity-[0.8]">
        <img
          src={FloatingBalloons}
          alt="man-looking"
          className="w-[70%] relative opacity-80"
          loading="lazy"
        />
      </div>
      <div className="relative">
        <h1 className="text-4xl font-[600] font-inter text-[#3a260e]">
          Check your email
        </h1>
      </div>
      <div className="mt-2 text-center text-[16px] font-inter text-[#5E5E5E] leading-[25px] mb-6">
        <p>
          Enter the code sent to{" "}
          <span className="font-[700] text-[#5E5E5E] text-[16px]">{email}</span>
        </p>
      </div>

      <p className="w-[60%] h-[22px] text-[#5E5E5E] text-[14px] font-[600]">
        6-digit code
      </p>
      {/* Code Input Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-8 flex flex-col gap-2 items-center"
      >
        <div className="flex flex-col">
          <label htmlFor="code-0" className="text-gray-700 font-medium sr-only">
            6-digit code
          </label>
          <div className="flex flex-col min-h-[80px] items-center min-w-[360px]">
            <Controller
              name="code"
              control={control}
              rules={{
                required: "Code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Please enter a valid 6-digit code",
                },
              }}
              render={({ field }) => (
                <ReactCodeInput
                  type="text"
                  fields={6}
                  value={field.value}
                  onChange={field.onChange}
                  inputStyle={{
                    fontFamily: "monospace",
                    margin: "4px",
                    MozAppearance: "textfield",
                    width: "52px",
                    height: "52px",
                    borderRadius: "8px",
                    fontSize: "32px",
                    textAlign: "center",
                    backgroundColor: "#F2F2F2",
                    color: "#797878",
                    fontWeight: "500",
                    border: "1px solid #D3D3D3",
                  }}
                  inputStyleInvalid={{
                    border: "1px solid red",
                    MozAppearance: "textfield",
                  }}
                  className="flex gap-2 justify-center"
                />
              )}
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-2">{errors.code.message}</p>
            )}
          </div>
        </div>

        {/* Reminding the user to check for spam */}

        <div className="flex px-2 max-w-[357px] rounded-[4px] bg-[#EAE5E5] h-[55px] mt-2 items-center justify-between border-1 border-[#E4D8D8]">
          <div className="bg-[#484848] px-2 py-2 rounded-[50%] ml-4 flex items-center justify-center mr-1">
            <img src={Envelope} alt="mail" className="w-[32px] stroke-white" />
          </div>
          <p className="text-[#424242] font-inter text-[12px] font-normal leading-[14px] mt-1">
            Can’t find your verification code? Make sure to check your spam
            folder
          </p>
        </div>

        <button
          type="submit"
          className="px-2 w-full max-w-[357px] flex justify-center items-center py-3 bg-[#668F82] text-[#F0E9D5] text-2xl rounded-[8px]
          hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 hover:cursor-pointer transition duration-150
          [box-shadow:0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]"
        >
          {isSignIn ? "Log In" : "Confirm Sign-Up"}
        </button>
      </form>

      {/* Resend Code Link */}
      <p className="mt-4 text-center">
        Didn’t receive a code?{" "}
        <span
          className={`text-[#668F82] font-bold hover:underline hover:cursor-pointer ${
            resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleResend}
          tabIndex="0"
          onKeyPress={(e) =>
            e.key === "Enter" && resendTimer === 0 && handleResend()
          }
        >
          Resend code {resendTimer > 0 && `(${resendTimer}s)`}
        </span>
      </p>
    </>
  );
}

export default VerifyCode;