'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const desktopSlides = [
  {
    id: 1,
    src: "/desktop/slide1.jpg",
    alt: "Slide 1",
  },
  {
    id: 2,
    src: "/desktop/slide2.jpg",
    alt: "Slide 2",
  },
  {
    id: 3,
    src: "/desktop/slide3.jpg",
    alt: "Slide 3",
  },
  {
    id: 4,
    src: "/desktop/slide4.jpg",
    alt: "Slide 4",
  },
];

const mobileSlides = [
  {
    id: 1,
    src: "/mobile/slide1.jpg",
    alt: "Slide 1",
  },
  {
    id: 2,
    src: "/mobile/slide2.jpg",
    alt: "Slide 2",
  },
  {
    id: 3,
    src: "/mobile/slide3.jpg",
    alt: "Slide 3",
  },
  {
    id: 4,
    src: "/mobile/slide4.jpg",
    alt: "Slide 4",
  },
  {
    id: 5,
    src: "/mobile/slide5.jpg",
    alt: "Slide 5",
  },
];

export default function Login() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
      <div className="relative z-20 text-center bg-blue-100 bg-opacity-80 p-8 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">FRC管理系統</h1>
        <button className="flex items-center m-auto justify-center px-8 py-4 mb-8 bg-white text-black rounded-lg shadow-md hover:bg-gray-100" onClick={() => signIn('google')}>
          <Image
            src="/google-icon.png"
            alt="Google Icon"
            width={32}
            height={32}
            className="w-8 h-8 mr-4"
          />
          <span className="text-xl md:text-2xl font-medium">使用 Google 登入</span>
        </button>
        <p className="text-red-800 text-bg font-bold">為了您的資料安全網站採Oauth驗證</p>
        <p className="text-red-800 text-bg font-bold">並阻擋Line與IG等崁入式瀏覽器登入</p>
        <p className="text-red-800 text-bg font-bold">請使用chrome或safari等系統瀏覽器</p>
      </div>
    </div>
  );
}
