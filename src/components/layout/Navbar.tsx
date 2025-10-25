"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "活動清單", href: "/events" },
  { name: "申請場地", href: "/apply" },
  { name: "場地審核", href: "/manage" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-background/95 sticky top-0 z-50 mx-auto w-full border-b border-gray-300 backdrop-blur dark:border-gray-700">
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
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="flex flex-row items-center space-x-4">
                <Image
                  className="h-8 w-auto cursor-pointer"
                  src="/logo.png"
                  alt="logo"
                  width={64}
                  height={64}
                  priority
                />
                <span className="text-xl">中和高中 FRC8569</span>
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
              <Link href={`/user`} passHref>
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

      {mobileMenuOpen && (
        <div className="text-center lg:hidden">
          <div className="space-y-1 pt-2 pb-3">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <span
                  className="block cursor-pointer border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
