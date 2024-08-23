import React from "react";
import Link from "next/link";

const navigation = [
  { name: "場地列表", href: "/list" },
  { name: "申請場地", href: "/apply" },
  { name: "場地審核", href: "/manage" },
];

interface MobileMenuProps {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ setMobileMenuOpen }) => {
  return (
    <div className="text-center lg:hidden">
      <div className="space-y-1 pb-3 pt-2">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <span
              className="block cursor-pointer border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50"
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
