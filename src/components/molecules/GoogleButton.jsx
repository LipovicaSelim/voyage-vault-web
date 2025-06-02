import React from "react";
import GoogleLogo from "../../assets/google-color-icon.svg";

function GoogleButton({ buttonText = "Sign Up with Google", onClick }) {
  return (
    <>
      {/* Google Button */}

      <button
        onClick={onClick}
        className="SignUp mt-2 with Google w-[80%] h-[55px] bg-[#F0E9D5] border-2 border-[#3E9FC9] rounded-md px-4 py-2 flex 
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
          {buttonText}
        </p>
      </button>
    </>
  );
}

export default GoogleButton;
