"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";

const navigation = [
  { name: "場地列表", href: "/list" },
  { name: "申請場地", href: "/apply" },
  { name: "場地審核", href: "/manage" },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-200 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="flex flex-row items-center space-x-4">
                <Image
                  className="h-8 w-auto cursor-pointer"
                  src="/frc-debg.png"
                  alt="FRC Icon"
                  width={64}
                  height={64}
                />
                <span className="text-xl">FRC8569</span>
              </div>
            </Link>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <span className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {session ? (
            <div className="flex items-center space-x-4">
              <Link href={`/user/${session?.user?.email}`} passHref>
                <div className="flex cursor-pointer items-center space-x-4">
                  <Image
                    className="rounded-full"
                    src={session?.user?.image || "/default-avatar.png"}
                    alt={session?.user?.name || "User Avatar"}
                    width={32}
                    height={32}
                  />
                  <span className="hidden font-medium text-gray-900 md:block">
                    {session?.user?.name}
                  </span>
                </div>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="text-sm font-semibold text-gray-900 hover:text-gray-700"
            >
              登入
            </button>
          )}
        </div>
      </div>

      {mobileMenuOpen && <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
    </nav>
  );
};

export default Navbar;
