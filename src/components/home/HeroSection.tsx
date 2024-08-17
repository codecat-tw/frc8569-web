"use client";
import React from "react";
import Image from "next/image";
import { signIn } from 'next-auth/react';
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="min-h-screen container mx-auto grid grid-cols-1 sm:grid-cols-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-8 place-self-center w-full text-center sm:text-left justify-self-start"
      >
        <h1 className="text-black mb-4 text-2xl md:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
          <span className="text-4xl md:text-6xl lg:text-8xl bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
            FRC管理系統{" "}
          </span>
          <br></br>
          <TypeAnimation
            sequence={[
              "現代化管理系統",
              1000,
              "自動活動報名",
              1000,
              "出缺席管理",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="text-orange-600 text-base sm:text-lg mb-6 lg:text-xl">
          中和高中FRC管理系統
        </p>
        <div>
          <button className="flex items-center m-auto justify-center px-8 py-4 mb-8 bg-white text-black rounded-lg shadow-md hover:bg-gray-100" onClick={() => signIn('google')}>
            <Image
              src="/google-icon.png"
              alt="Google Icon"
              width={32}
              height={32}
              className="w-8 h-8 mr-4"
            />
            <span className="text-xl md:text-2xl font-medium">使用 中和高中Mail2 登入</span>
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-4 place-self-center mt-4 lg:mt-0"
      >
        <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
          <Image
            src="/FRC-debg.png"
            alt="hero image"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            width={300}
            height={300}
          />
        </div>
      </motion.div>
    </div>
  );
}
