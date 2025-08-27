import React from 'react'
import "../css/banner.css"

function FirstBannerSection() {
    return (
        <section className='w-full bg-w py-80 pb-20 banner-wrapper-full'>
            <div className="max-w-[1450px] mx-auto">
                <div className='grid grid-cols-12 lg:gap-10 gap-5'>
                    <div className="col-span-12 lg:col-span-6">
                        <div className='grid grid-cols-12'>
                            <div className="col-span-12 lg:mb-8 mb-5 mx-3">
                                <div className='banner-first  bg-[var(--bg-b-4)] rounded-[20px] px-5 lg:px-10 py-5 lg:py-15 relative overflow-hidden flex '>
                                    <div className='banner-image' style={{ "--banner-img": " url(../../public/images/product/p-6.png)" }}></div>
                                    <div className='banner-content-wrapper '>
                                        <h5 className='m-0 ruwudu tracking-[1px] lg:text-[33px] text-[20px]  text-c-l font-medium'>Franch Oil NH Plus </h5>
                                        <p className='quando m-0 text-[10px] lg:text-[12px] text-c-l lg:w-[50%] w-[45%] font-light lg:mb-9 mb-5'>Experience long-lasting relief from joint and muscle pain with Franch Oil NH* Plus</p>
                                        <a href='' className='banner-btn-link font-bold text-[7px] lg:text-[11px] tracking-[3px] text-[var(--t-c-l)] lg:py-[7px] lg:px-4 py-[3px] px-2 border rounded-full flex w-max items-center gap-2 hover:bg-[var(--bg-w)]  hover:text-[var(--t-p-c)] transition-all duration-400'>
                                            KNOW MORE
                                            <div
                                                className="mask-item"
                                                style={{
                                                    "--m-size": "1.1rem",
                                                    "--m-bg": "var(--t-c-l)",
                                                    "--m-url": "url(https://api.iconify.design/material-symbols:chevron-right-rounded.svg?color=%23ff0000)",
                                                    "--m-h-bg": "var(--p-c)"
                                                }}
                                            ></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12  px-4">
                                <div className='banner-second  bg-[var(--bg-b-1)] rounded-[20px] px-5 lg:px-10 py-5 lg:py-15 relative overflow-hidden flex'>
                                    <div className='banner-image' style={{ "--banner-img": " url(../../public/images/product/p-7.png)" }}></div>
                                    <div className='grid grid-cols-12'>
                                        <div className="col-span-6"></div>
                                        <div className="col-span-6 flex ">
                                            <div className='banner-content-wrapper '>
                                                <h5 className='m-0 ruwudu tracking-[1px] lg:text-[35px] text-[20px]  text-c-l font-medium'>Franch Orthovin Thailam </h5>
                                                <p className='quando m-0 text-[10px] lg:text-[12px] text-c-l  lg:mb-7 mb-5'>Experience lEase stiffness and pain with Franch Orthovin Thailam. This 100% Ayurvedic medicated oil is ideal </p>
                                                <a href='' className='banner-btn-link font-bold text-[7px] lg:text-[11px] tracking-[3px] text-[var(--t-c-l)] lg:py-[7px] lg:px-4 py-[3px] px-2 border rounded-full flex w-max items-center gap-2 hover:bg-[var(--bg-w)]  hover:text-[var(--t-p-c)] transition-all duration-400'>
                                                    KNOW MORE
                                                    <div
                                                        className="mask-item"
                                                        style={{
                                                            "--m-size": "1.1rem",
                                                            "--m-bg": "var(--t-c-l)",
                                                            "--m-url": "url(https://api.iconify.design/material-symbols:chevron-right-rounded.svg?color=%23ff0000)",
                                                            "--m-h-bg": "var(--bg-b-1)"
                                                        }}
                                                    ></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6  px-4">
                        <div className='banner-third  rounded-[20px] px-5 lg:px-10 py-5 lg:py-15 relative overflow-hidden flex '>
                            <div className='banner-image' style={{ "--banner-img": " url(../../public/images/product/p-8.png)" }}></div>
                            <div className='banner-content-wrapper flex flex-col items-center px-10'>
                                <h5 className='m-0 ruwudu tracking-[1px] lg:text-[35px] text-[20px] tracking-[1px] text-c-l font-medium text-center'>Franch Diafite Powder </h5>
                                <p className='quando m-0 text-[10px] lg:text-[16px] text-c-l  font-light lg:mb-9 mb-4 text-center'>Take control of your sugar levels with Franch Diafite Powder. Formulated as a diabetic food supplement</p>
                                <a href='' className='banner-btn-link font-bold text-[7px] lg:text-[11px] tracking-[3px] text-[var(--t-c-l)] lg:py-[7px] lg:px-4 py-[3px] px-2 border rounded-full flex w-max items-center gap-2 hover:bg-[var(--bg-w)]  hover:text-[var(--t-p-c)] transition-all duration-400'>
                                    KNOW MORE
                                    <div
                                        className="mask-item"
                                        style={{
                                            "--m-size": "1.1rem",
                                            "--m-bg": "var(--t-c-l)",
                                            "--m-url": "url(https://api.iconify.design/material-symbols:chevron-right-rounded.svg?color=%23ff0000)",
                                            "--m-h-bg": "var(--p-c)"
                                        }}
                                    ></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FirstBannerSection
