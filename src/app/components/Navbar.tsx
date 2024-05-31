// components/Navbar.tsx
"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import MobileMenu from './MobileMenu'; // 引用新的MobileMenu組件

const navigation = [
    { name: '場地列表', href: '/list' },
    { name: '申請場地', href: '/apply' },
    { name: '場地審核', href: '/manage' },
];

const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <Link href="/" passHref>
                                <img className="h-8 w-auto cursor-pointer" src="/FRC.jpg" alt="Your Company" />
                            </Link>
                        </div>
                        <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href} passHref>
                                    <span className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:space-x-4">
                        {session ? (
                            <>
                                <Link href={`/user/${session.user?.email}`} passHref>
                                    <span className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">
                                        {session.user?.name}
                                    </span>
                                </Link>
                                <button onClick={() => signOut()} className="text-sm font-semibold text-gray-900">
                                    登出
                                </button>
                            </>
                        ) : (
                            <Link href="/api/auth/signin" passHref>
                                <span className="text-sm font-semibold text-gray-900 cursor-pointer">登入</span>
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center lg:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
        </nav>
    );
};

export default Navbar;
