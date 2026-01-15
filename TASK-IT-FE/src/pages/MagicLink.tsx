import React, { useRef } from "react";
import axios from "axios";
import InputBox from "../components/input";
import { ButtonComponent } from "../components/Button";

export const MagicLink = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleDone = async () => {
    const email = emailRef.current?.value;
    if (!email) return;

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", {
        email,
      });

      console.log("Magic link sent:", res.data);
      alert("Magic link sent! Check your email.");
    } catch (err: any) {
      console.error(err);
      alert(
        err?.response?.data?.message || "Failed to send magic link"
      );
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#f3f4f6]">
      <div>
        <h1 className="font-sans font-bold text-xl text-gray-800 mb-2">
          Magic Link
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email to receive a login link
        </p>

        <div className="mb-6">
          <InputBox
            size="medium"
            type="email"
            placeholder="Email address"
            ref={emailRef}
          />
        </div>

        <ButtonComponent
          varient="primary"
          text="Done"
          fullWidth
          onClick={handleDone}
        />
      </div>
    </div>
  );
};
