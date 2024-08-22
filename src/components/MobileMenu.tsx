import React from 'react';
import Link from 'next/link';

const navigation = [
    { name: '場地列表', href: '/list' },
    { name: '申請場地', href: '/apply' },
    { name: '場地審核', href: '/manage' },
];

interface MobileMenuProps {
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ setMobileMenuOpen }) => {
    return (
        <div className="lg:hidden text-center">
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
        </div>
    );
};

export default MobileMenu;
