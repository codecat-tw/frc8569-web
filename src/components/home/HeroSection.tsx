"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="container mx-auto grid min-h-screen grid-cols-1 sm:grid-cols-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-8 w-full place-self-center justify-self-start text-center sm:text-left"
      >
        <h1 className="mb-4 text-2xl font-extrabold text-black md:text-5xl lg:text-8xl lg:leading-normal">
          <span className="from-primary-400 to-secondary-600 bg-gradient-to-r bg-clip-text text-4xl md:text-6xl lg:text-8xl">
            FRC8569{" "}
          </span>
          <br></br>
          <TypeAnimation
            sequence={[
              "中和高中FRC",
              1000,
              "團隊管理系統",
              1000,
              "現代化網站",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <div>
          <button
            className="m-auto mb-8 flex items-center justify-center rounded-lg bg-white px-8 py-4 text-black shadow-md hover:bg-gray-100"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google-icon.png"
              alt="Google Icon"
              width={32}
              height={32}
              className="mr-4 h-8 w-8"
            />
            <span className="text-xl font-medium md:text-2xl">
              使用 Google 登入
            </span>
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-4 mt-4 place-self-center lg:mt-0"
      >
        <div className="relative h-[250px] w-[250px] rounded-full bg-[#181818] lg:h-[400px] lg:w-[400px]">
          <Image
            src="/logo.png"
            alt="hero image"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            width={300}
            height={300}
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
