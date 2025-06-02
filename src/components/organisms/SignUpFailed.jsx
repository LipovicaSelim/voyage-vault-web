import React from "react";
import ExlamationMark from "../../assets/exclamation-round-icon.svg";

function SignUpFailed({ setStep }) {
  return (
    <>
      <div className="h-[35%] relative flex justify-center mb-4">
        <div className="PINKCIRCLES w-[200px] h-[200px] rounded-[50%] bg-[#C07979] mt-6 flex justify-center items-center">
          <div className="REDCIRCLE W-[150px] h-[150px] rounded-[50%] aspect-square  flex items-center justify-center">
            <img
              src={ExlamationMark}
              alt="exlamation"
              className="fill-[#A63333]"
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <h1 className="text-2xl font-semibold font-inter text-[#4E4A4A] mb-4">
          Verification Failed
        </h1>
      </div>
      <div className="mt-2 text-center text-[#5E5E5E] font-[300] leading-[25px] mb-8 px-2">
        <p>The code entered is not valid or it is crashed, please try again.</p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-[250px] flex flex-col gap-4 mt-6">
        <button
          onClick={() => setStep("initial")}
          className="w-full  flex justify-center items-center px-4 py-3 bg-[#668F82] text-[#F0E9D5] text-xl rounded-[10px]
          hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 hover:cursor-pointer transition duration-150
          [box-shadow:0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]"
        >
          Update Email
        </button>
        <button
          onClick={() => setStep("code")}
          className="w-full flex justify-center items-center px-4 py-3 bg-gray-200 text-gray-700 text-xl rounded-[10px]
          hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 hover:cursor-pointer transition duration-150
          [box-shadow:0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]"
        >
          Resend Code
        </button>
      </div>

      {/* Contact Support Link */}
      <p className="mt-4 text-center">
        Need help?{" "}
        <span
          className="text-[#668F82] font-bold hover:underline hover:cursor-pointer"
          onClick={() => console.log("Contact support clicked")}
          tabIndex="0"
          onKeyPress={(e) =>
            e.key === "Enter" && console.log("Contact support clicked")
          }
        >
          Contact support
        </span>
      </p>
    </>
  );
}

export default SignUpFailed;
