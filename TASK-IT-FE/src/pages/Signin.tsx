import React, { useRef } from "react";
import axios from "axios";
import InputBox from "../components/input";
import { ButtonComponent } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { BackgroundSnow } from "../components/BackgroundSnow";

export const Signin = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSignin = async () => {
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    console.log({
  email,
  password,
  emailLength: email?.length,
  passwordLength: password?.length,
});

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
//@ts-ignore
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignin();
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "https://accounts.google.com";
  };

  const handleMagicLink = () => {
    navigate("/magic/login");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <BackgroundSnow />
      <div className="fixed inset-0 bg-black/40 z-10" />

      <div className="relative z-20 w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center">
          <h1 className="font-sans text-3xl font-bold text-white text-center">
            Welcome back
          </h1>
          <p className="text-sm text-white text-center mt-2 mb-6">
            Sign in to your account
          </p>

          <div className="mb-4">
            <InputBox
              size="medium"
              type="email"
              placeholder="Email address"
              ref={emailRef as any}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="mb-6">
            <InputBox
              size="medium"
              type="password"
              placeholder="Password"
              ref={passwordRef as any}
              onKeyDown={handleKeyDown}
            />
          </div>

          <ButtonComponent
            varient="primary"
            text="Sign In"
            onClick={handleSignin}
          />

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <ButtonComponent
              varient="base"
              text="Google"
              startIcon={
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                />
              }
              onClick={handleGoogleAuth}
            />

            <ButtonComponent
              varient="base"
              text="Magic Link"
              startIcon={
                <img
                  src="https://www.svgrepo.com/show/349378/gmail.svg"
                  className="w-6 h-6"
                />
              }
              onClick={handleMagicLink}
            />
          </div>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
