// components/MobileMenu.tsx
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const navigation = [
    { name: '場地列表', href: '/list' },
    { name: '申請場地', href: '/apply' },
    { name: '場地審核', href: '/manage' },
];

interface MobileMenuProps {
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ setMobileMenuOpen }) => {
    const { data: session } = useSession();

    return (
        <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href} passHref>
                        <span
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
                {session ? (
                    <>
                        <div className="px-4">
                            <Link href={`/user/${session.user?.email}`} passHref>
                                <span className="text-base font-medium text-gray-800 cursor-pointer">{session.user?.name}</span>
                            </Link>
                            <div className="text-sm font-medium text-gray-500">{session.user?.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <button
                                onClick={() => signOut()}
                                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                            >
                                登出
                            </button>
                        </div>
                    </>
                ) : (
                    <Link href="/api/auth/signin" passHref>
                        <span
                            className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            登入
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;
