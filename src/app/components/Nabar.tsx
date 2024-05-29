"use client";
import React, { useState } from "react";
import { signOut, useSession } from 'next-auth/react';
import { Bars3Icon } from '@heroicons/react/24/outline';

const navigation = [
    { name: '場地列表', href: '/list' },
    { name: '申請場地', href: '/apply' },
    { name: '場地審核', href: '/manage' },
]

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const session = useSession();

    return (
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                    />
                </a>
            </div>
            <div className="flex lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    {mobileMenuOpen ? (
                        <a>X</a>
                    ) : (
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                        {item.name}
                    </a>
                ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div>{session?.data?.user?.name}</div>
                <div>{session?.data?.user?.email}</div>
                <button onClick={() => signOut()} className="text-sm font-semibold leading-6 text-gray-900">
                    登出
                </button>
            </div>
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                        <div className="px-5">
                            <div className="text-base font-medium text-gray-800">{session?.data?.user?.name}</div>
                            <div className="text-sm font-medium text-gray-500">{session?.data?.user?.email}</div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            <button onClick={() => signOut()} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                                登出
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
