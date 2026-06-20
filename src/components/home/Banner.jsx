"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { Button } from '@heroui/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Link from 'next/link';

const images = [
    "https://i.postimg.cc/JnLZwBQL/gavel-soundblock-justice-law-lawyer-working-wooden-desk-background-1423-1407.avif",
    "https://i.postimg.cc/B60HW1CJ/How-to-Become-a-Lawyer-Everything-You-Need-to-Know-REV-2026.webp",
    "https://i.postimg.cc/HxgXG7tH/images.jpg",
    "https://i.postimg.cc/4dgVCh1G/images-(1).jpg"
];

const Banner = () => {
    return (
        <div className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] overflow-hidden">
            <Swiper
                modules={[Navigation, Autoplay, EffectFade]}
                effect="fade"
                navigation={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative w-full h-full bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${img})` }}
                        >
                            {/* Dark Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-black/50 z-10"></div>

                            {/* Centered Content */}
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                    Justice, meticulously organized.
                                </h1>
                                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl">
                                    Access elite legal counsel through our rigorous, archival system. Every detail verified. Every case perfectly filed.
                                </p>
                                <Link href={'/lawyers'}>
                                    <Button
                                        size="lg"
                                        className="bg-[#A48039] hover:bg-[#8e6e30] text-white font-semibold px-10 py-6 tracking-wide rounded-sm transition-colors"
                                    >
                                        BROWSE LAWYERS
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Styles to Override Default Swiper Arrow Colors to match standard white/grey styling */}
            <style jsx global>{`
                .swiper-button-next,
                .swiper-button-prev {
                    color: rgba(255, 255, 255, 0.8) !important;
                    background: rgba(0, 0, 0, 0.3);
                    width: 50px !important;
                    height: 50px !important;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                    color: white !important;
                    background: rgba(0, 0, 0, 0.6);
                }
                .swiper-button-next::after,
                .swiper-button-prev::after {
                    font-size: 20px !important;
                }
            `}</style>
        </div>
    );
};

export default Banner;