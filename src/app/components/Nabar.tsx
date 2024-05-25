"use client";
import Link from "next/link";
import React, { useState } from "react";

const navLinks = [
  {
    title: "個人介紹",
    path: "#about",
  },
  {
    title: "檢定成績",
    path: "#tabinfo",
  },
  {
    title: "競賽獲獎",
    path: "#contest",
  },
  {
    title: "作品成果",
    path: "#projects",
  },
  {
    title: "聯繫方式",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          FRC管理系統
        </Link>
        <Link
          href={"/"}
          className="text-2xl md:text-2xl  text-white font-semibold"
        >
          活動列表
        </Link>
        <Link
          href={"/"}
          className="text-2xl md:text-2xl text-white font-semibold"
        >
          申請場地
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;