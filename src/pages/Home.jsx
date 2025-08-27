import React, { useEffect, useRef } from 'react'
import "../css/home.css"
import bannerVideo from "../../public/images/product/franch.mp4"
import ProductSection from '../sections/ProductSection';
import FirstBannerSection from '../sections/FirstBanner';

function Home() {
    const videoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 600) {

                const opacity = Math.min(scrollY / 900, .5);

                if (videoRef.current) {
                    if (scrollY > 700 && !videoRef.current.paused) {
                        document.documentElement.style.setProperty('--banner-overlay-opacity', opacity);
                        videoRef.current.pause();
                    } else if (scrollY <= 700 && videoRef.current.paused) {
                        videoRef.current.play().catch(() => { });
                    }
                }
            }
            else {
                document.documentElement.style.setProperty('--banner-overlay-opacity', 0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <div className='banner-video mx-auto'>
                <video
                    ref={videoRef}
                    src={bannerVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='mx-auto w-full lg:h-auto h-full object-cover lg:object-fill'
                ></video>
            </div>
            <FirstBannerSection />
            <ProductSection />
        </div >
    )
}

export default Home;
