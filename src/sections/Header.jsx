import React, { useRef } from 'react'
import "../css/header.css"
import "../css/header-mobile.css"
import logo from "../../public/images/logo.png"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function Header() {
    const [isMobile, setIsMobile] = useState(document.body.clientWidth > 1250);
    const [posState, setPosState] = useState(3);

    const profile = useRef();
    const profileLinks = useRef()

    const handleProfile = () => {
        profile.current.classList.toggle('active')
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (!profile.current.contains(e.target) && !profileLinks.current.contains(e.target)) {
                profile.current.classList.remove('active')
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);



    return (
        <>
            {isMobile ?
                <header className=''>
                    <div className="top-bar-wrapper w-full bg-p-c">
                        <div className='top-bar max-w-[1450px] mx-auto py-3 px-4 2xl:px-0'>
                            <div className='grid grid-cols-12'>
                                <div className='col-span-4 flex items-center'>
                                    <div className='top-left-links quando text-c-l flex gap-7 font-size text-[11px] font-normal'>
                                        <Link to="/">About Us</Link>
                                        <Link to="/">My Account</Link>
                                        <Link to="/">Order Tracking</Link>
                                    </div>
                                </div>
                                <div className='col-span-4 flex items-center justify-center'>
                                    <div className='quando flex justify-center text-[12px] text-c-l'>
                                        <p className='m-0'>WE ARE CREATING UNIQUE AYURVEDIC</p>
                                    </div>
                                </div>
                                <div className='col-span-4 flex items-center justify-end'>
                                    <div className='top-right-links flex gap-4'>
                                        <a href="">
                                            <div className='bg-w w-max p-1 rounded-full flex justify-center items-center hover:!bg-[var(--p-c)] transition-[.4s] box-sha-1'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/formkit:linkedin.svg)",
                                                        "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                        </a>
                                        <a href="">
                                            <div className='bg-w w-max p-1 rounded-full flex justify-center items-center  hover:!bg-[var(--p-c)] transition-[.4s] box-sha-1'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/mdi:instagram.svg)",
                                                        "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                        </a>
                                        <a href="">
                                            <div className='bg-w w-max p-1 rounded-full flex justify-center items-center  hover:!bg-[var(--p-c)] transition-[.4s] box-sha-1'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/flowbite:youtube-solid.svg)",
                                                        "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                        </a>
                                        <a href="">
                                            <div className='bg-w w-max p-1 rounded-full flex justify-center items-center  hover:!bg-[#007E3C] transition-[.4s] box-sha-1'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/gg:facebook.svg)",
                                                        "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='header-account-wrapper w-full bg-w'>
                        <div className='max-w-[1450px] py-6 mx-auto px-4 2xl:px-0'>
                            <div className='grid grid-cols-12 items-center'>
                                <div className="col-span-1 ">
                                    <div className='logo-wrapper w-full'>
                                        <img className='w-full' src={logo} alt="" />
                                    </div>
                                </div>
                                <div className='col-span-6'>
                                    <div className='header-search-wrapper px-3 flex justify-end'>
                                        <div className='input-wrapper  w-[85%] border flex items-center  border-[var(--a-c-4)] border-[.5px] box-sha-2 rounded-[3px] py-[1px] px-[1px] border-'>
                                            <input id='header-search' type="text" placeholder='' className=' w-full placeholder-[var(--t-c-p)] placeholder:text-[12px] text-[var(--t-p-c)] text-[12px] poppins  px-4' />
                                            <label htmlFor="header-search " className='search-label px-2 bg-p-c py-[7px]  flex items-center gap-2 poppins text-[16px] rounded-[2px] box-sha-1 cursor-pointer hover:!bg-[var(--bg-b-2)] transition-[.4s] '
                                                style={{ color: "color-mix(in srgb, var(--t-c-l) 80%, transparent)", backgroundColor: "color-mix(in srgb, var(--p-c) 80%, transparent)" }}>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1.1rem",
                                                        "--m-bg": "var(--t-c-l)",
                                                        "--m-url": "url(https://api.iconify.design/hugeicons:search-02.svg)",
                                                        // "--m-h-bg": "var(--p-c)"
                                                    }}
                                                ></div>
                                                Search</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-5'>
                                    <div className='flex gap-10 justify-end'>
                                        <div className='header-contact-wrapper flex gap-1'>
                                            <div className='contact-icon-wrapper w-[35px]'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "100%",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/garden:headset-fill-12.svg)",
                                                        // "--m-h-bg": "var(--p-c)"
                                                    }}
                                                ></div>
                                            </div>
                                            <div className='montagu-slab flex flex-col justify-center'>
                                                <h5 className='m-0 text-[11px] font-semibold'>CONTACT US </h5>
                                                <p className='m-0 text-[11px] tracking-[2px]' style={{ color: "color-mix(in srgb, var(--t-c-d) 50%, transparent)" }}>9176164417</p>
                                            </div>
                                        </div>
                                        <div className='wish-list-wrapper  flex gap-1 '>
                                            <div className='contact-icon-wrapper w-[30px] relative before:content-["23"] before:absolute before:top-[5px] before:right-[-2px] before:text-[8px] before:text-[var(--t-c-l)] before:bg-[var(--p-c)] before:rounded-full before:w-[15px] before:h-[15px] before:flex before:justify-center before:items-center before:z-10 '>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "100%",
                                                        "--m-bg": "var(--t-c-d)",
                                                        "--m-url": "url(https://api.iconify.design/si:heart-alt-line.svg)",
                                                        // "--m-h-bg": "var(--p-c)"
                                                    }}
                                                ></div>

                                            </div>
                                            <div className='poppins flex flex-col justify-center'>
                                                <h5 className='m-0 text-[16px] tracking-[2px]' style={{ color: "color-mix(in srgb, var(--t-c-d) 68%, transparent)" }}>Wish List</h5>
                                            </div>
                                        </div>
                                        <div className='cart-wrapper  flex gap-1 '>
                                            <div className='contact-icon-wrapper w-[30px] relative before:content-["23"] before:absolute before:top-[5px] before:right-[-2px] before:text-[8px] before:text-[var(--t-c-l)] before:bg-[var(--p-c)] before:rounded-full before:w-[15px] before:h-[15px] before:flex before:justify-center before:items-center before:z-10'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "100%",
                                                        "--m-bg": "var(--t-c-d)",
                                                        "--m-url": "url(https://api.iconify.design/ic:outline-shopping-cart.svg)",
                                                        // "--m-h-bg": "var(--p-c)"
                                                    }}
                                                ></div>

                                            </div>
                                            <div className='poppins flex flex-col justify-center'>
                                                <h5 className='m-0 text-[16px] tracking-[2px]' style={{ color: "color-mix(in srgb, var(--t-c-d) 68%, transparent)" }}>Cart</h5>
                                            </div>
                                        </div>
                                        <div className='profile-wrapper bg-p-c flex justify-center items-center text-c-l text-[30px] poppins rounded-full w-[45px] h-[45px]'>
                                            S
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='header-nav-links-wrapper w-full border-t bg-w ' style={{ borderColor: "color-mix(in srgb, var(--bg-b-2) 40%, transparent)" }}>
                        <div className='max-w-[1450px]  mx-auto px-4 2xl:px-0'>
                            <div className='grid grid-cols-12 items-center'>
                                <div className="w-[300px] col-span-3 bg-p-c py-[20px]">
                                    <div className=' flex gap-3 items-center px-4 justify-around'>
                                        <div className='categ-icon-wrapper '>
                                            <div
                                                className="mask-item"
                                                style={{
                                                    "--m-size": "1.9rem",
                                                    "--m-bg": "var(--t-c-l)",
                                                    "--m-url": "url(https://api.iconify.design/iconamoon:category.svg)",
                                                    // "--m-h-bg": "var(--p-c)"
                                                }}
                                            ></div>
                                        </div>
                                        <h5 className='m-0 text-[16px] text-c-l poppins font-[500] tracking-widest'>Browse All Categories</h5>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className=' flex items-center px-5 gap-2 '>
                                        <div className='categ-icon-wrapper '>
                                            <div
                                                className="mask-item"
                                                style={{
                                                    "--m-size": "1.9rem",
                                                    "--m-bg": "var(--p-c)",
                                                    "--m-url": "url(https://api.iconify.design/tabler:rosette-discount-filled.svg)",
                                                    // "--m-h-bg": "var(--p-c)"
                                                }}
                                            ></div>
                                        </div>
                                        <h5 className='m-0 text-[16px] text-c-d poppins font-[500] tracking-widest quando'>Hot Deal</h5>
                                    </div>
                                </div>
                                <div className='col-span-7 '>
                                    <div className='nav-links-wrapper flex justify-end'>
                                        <nav className='links-wrapper quando text-[15px] flex gap-12 justify-end w-full'>
                                            <Link to="/" className='py-6 tracking-[2px] nav-link-tag active'>Home</Link>
                                            <Link to="/" className='py-6 tracking-[2px] nav-link-tag'>About Us</Link>
                                            <Link to="/" className='py-6 tracking-[2px] nav-link-tag relative drop-down nav-drop-group'>Shop
                                                <div className="drop-down-links absolute bg-white top-full left-1/2 transform -translate-x-1/2 w-[200px] z-10 flex flex-col p-2">
                                                    <Link to="/" className="tracking-[2px] p-4 drop-link">
                                                        <div>Home</div></Link>
                                                    <Link to="/" className="tracking-[2px] p-4 drop-link">
                                                        <div>About Us</div></Link>
                                                    <Link to="/" className="tracking-[2px] p-4 drop-link">
                                                        <div>Home</div></Link>
                                                    <Link to="/" className="tracking-[2px] p-4 drop-link">
                                                        <div>About Us</div></Link>
                                                    <Link to="/" className="tracking-[2px] p-4 drop-link">
                                                        <div>Home</div></Link>
                                                    <Link to="/" className="tracking-[2px] p-4 drop-link">
                                                        <div>About Us</div></Link>
                                                </div>
                                            </Link>
                                            <Link to="/" className='py-6 tracking-[2px] nav-link-tag'>Blogs</Link>
                                            <Link to="/" className='py-6 tracking-[2px] nav-link-tag'>Faqs</Link>
                                            <Link to="/" className='py-6 tracking-[2px] nav-link-tag'>Contact Us</Link>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header >
                :
                <header>
                    <div className='nav-mobile-main w-full'>
                        <div className=' nav-mobile-wrapper fixed z-[99999999999]'>
                            <div data-pos={posState} className='grid grid-cols-10 mobile-nav-links-wrapper relative rounded-full'>
                                <div ref={profile} className={`mobile-search-box p-6`}>
                                    <div className='header-search-wrapper  flex justify-end'>
                                        <div className='input-wrapper  w-[100%] border flex items-center  border-[var(--a-c-4)] border-[.5px] box-sha-2  rounded-tl-[3px] rounded-bl-[3px] rounded-tr-[3px] rounded-br-[3px]  py-[1px] px-[1px] '>
                                            <input id='header-search' type="text" placeholder='' className=' w-full placeholder:text-[12px] poppins text-[var(--t-p-c)] text-[12px]   px-4' />
                                            <label htmlFor="header-search " className='search-label px-2 bg-p-c py-[5px]  flex items-center gap-2 poppins text-[13px] rounded-[2px] box-sha-1 cursor-pointer hover:!bg-[var(--bg-b-2)] transition-[.4s] '
                                                style={{ color: "color-mix(in srgb, var(--t-c-l) 80%, transparent)", backgroundColor: "color-mix(in srgb, var(--p-c) 80%, transparent)" }}>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": ".9rem",
                                                        "--m-bg": "var(--t-c-l)",
                                                        "--m-url": "url(https://api.iconify.design/hugeicons:search-02.svg)",
                                                        // "--m-h-bg": "var(--p-c)"
                                                    }}
                                                ></div>
                                                Search</label>
                                        </div>
                                    </div>
                                    <div className='mobile-otherLinks  mt-8 flex flex-col gap-1 '>
                                        <div className='grid grid-cols-12 gap-2'>
                                            <div className='col-span-6'>
                                                <Link to="/" className='w-full flex items-center justify-between other-links py-[6px] px-3 gap-2 rounded-[100vh]'>
                                                    <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] font-bold tracking-[1px]'>
                                                        ABOUT US
                                                    </p>
                                                    <div className=' mobile-nav-icon-wrapper flex '>
                                                        <div
                                                            className="mask-item"
                                                            style={{
                                                                "--m-size": "1.2rem",
                                                                "--m-bg": "var(--bg-w)",
                                                                "--m-url": "url(https://api.iconify.design/material-symbols:chevron-right-rounded.svg?color=%23ff0000)",
                                                                // "--m-h-bg": "var(--s-c)"
                                                            }}
                                                        ></div>
                                                    </div>

                                                </Link>
                                            </div>
                                            <div className='col-span-6'>
                                                <Link to="/" className='w-full flex items-center justify-between other-links py-[6px] px-3 gap-2 rounded-[100vh]'>
                                                    <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] font-bold tracking-[1px]'>
                                                        CONTACT US
                                                    </p>
                                                    <div className=' mobile-nav-icon-wrapper flex '>
                                                        <div
                                                            className="mask-item"
                                                            style={{
                                                                "--m-size": "1.2rem",
                                                                "--m-bg": "var(--bg-w)",
                                                                "--m-url": "url(https://api.iconify.design/material-symbols:chevron-right-rounded.svg?color=%23ff0000)",
                                                                // "--m-h-bg": "var(--s-c)"
                                                            }}
                                                        ></div>
                                                    </div>

                                                </Link>
                                            </div>
                                            <div className='col-span-6'>
                                                <Link to="/" className='w-full flex items-center justify-between other-links py-[6px] px-3 gap-2 rounded-[100vh]'>
                                                    <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] font-bold tracking-[1px]'>
                                                        FAQ
                                                    </p>
                                                    <div className=' mobile-nav-icon-wrapper flex '>
                                                        <div
                                                            className="mask-item"
                                                            style={{
                                                                "--m-size": "1.2rem",
                                                                "--m-bg": "var(--bg-w)",
                                                                "--m-url": "url(https://api.iconify.design/material-symbols:chevron-right-rounded.svg?color=%23ff0000)",
                                                                // "--m-h-bg": "var(--s-c)"
                                                            }}
                                                        ></div>
                                                    </div>

                                                </Link>
                                            </div>
                                            <div className='col-span-6'>
                                                <Link to="/" className='w-full flex items-center justify-between other-links py-[6px] px-3 gap-2 rounded-[100vh]'>
                                                    <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] font-bold tracking-[1px]'>
                                                        TESTIMONIALS
                                                    </p>
                                                    <div className=' mobile-nav-icon-wrapper flex '>
                                                        <div
                                                            className="mask-item"
                                                            style={{
                                                                "--m-size": "1.2rem",
                                                                "--m-bg": "var(--bg-w)",
                                                                "--m-url": "url(https://api.iconify.design/material-symbols:chevron-right-rounded.svg?color=%23ff0000)",
                                                                // "--m-h-bg": "var(--s-c)"
                                                            }}
                                                        ></div>
                                                    </div>

                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mobile-social-media-links mt-7 flex gap-1 items-center justify-center'>
                                        <div className='m-0 mobile-social-media-heading w-max text-p-c  leading-[1.2] poppins text-[8px] font-bold tracking-[1px] rounded-full p-3'>
                                            SOCIAL MEDIAS
                                        </div>:
                                        <div className='mobile-social-medias flex gap-3 ms-4'>
                                            <a href="">
                                                <div className='bg-w w-max p-1 rounded-full flex justify-center items-center hover:!bg-[var(--p-c)] transition-[.4s] box-sha-1'>
                                                    <div
                                                        className="mask-item"
                                                        style={{
                                                            "--m-size": ".8rem",
                                                            "--m-bg": "var(--p-c)",
                                                            "--m-url": "url(https://api.iconify.design/formkit:linkedin.svg)",
                                                            // "--m-h-bg": "var(--s-c)"
                                                        }}
                                                    ></div>
                                                </div>
                                            </a>
                                            <a href="">
                                                <div className='bg-w w-max p-1 rounded-full flex justify-center items-center  hover:!bg-[var(--p-c)] transition-[.4s] box-sha-1'>
                                                    <div
                                                        className="mask-item"
                                                        style={{
                                                            "--m-size": ".8rem",
                                                            "--m-bg": "var(--p-c)",
                                                            "--m-url": "url(https://api.iconify.design/mdi:instagram.svg)",
                                                            // "--m-h-bg": "var(--s-c)"
                                                        }}
                                                    ></div>
                                                </div>
                                            </a>
                                            <a href="">
                                                <div className='bg-w w-max p-1 rounded-full flex justify-center items-center  hover:!bg-[var(--p-c)] transition-[.4s] box-sha-1'>
                                                    <div
                                                        className="mask-item"
                                                        style={{
                                                            "--m-size": ".8rem",
                                                            "--m-bg": "var(--p-c)",
                                                            "--m-url": "url(https://api.iconify.design/flowbite:youtube-solid.svg)",
                                                            // "--m-h-bg": "var(--s-c)"
                                                        }}
                                                    ></div>
                                                </div>
                                            </a>
                                            <a href="">
                                                <div className='bg-w w-max p-1 rounded-full flex justify-center items-center  hover:!bg-[#007E3C] transition-[.4s] box-sha-1'>
                                                    <div
                                                        className="mask-item"
                                                        style={{
                                                            "--m-size": ".8rem",
                                                            "--m-bg": "var(--p-c)",
                                                            "--m-url": "url(https://api.iconify.design/gg:facebook.svg)",
                                                            // "--m-h-bg": "var(--s-c)"
                                                        }}
                                                    ></div>
                                                </div>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                                <div className='mobile-nav-circle-wrapper'>
                                    <div className='mobile-nav-circle'></div>
                                </div>
                                <div className="col-span-2">
                                    <div onClick={() => setPosState(1)} data-pos="1" className='mobile-nav-links w-full'>
                                        <Link to="/" className='w-full flex items-center justify-center py-3 flex-col gap-2'>
                                            <div className='w-full  mobile-nav-icon-wrapper flex justify-center'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1.2rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/meteor-icons:blogger.svg?color=%23ff0000)",
                                                        // "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                            <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] tracking-[1px]'>
                                                BLOG
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-span-2 ">
                                    <div onClick={() => setPosState(2)} data-pos="2" className='mobile-nav-links w-full'>
                                        <Link to="/" className='w-full flex items-center justify-center py-3 flex-col gap-2'>
                                            <div className='w-full  mobile-nav-icon-wrapper flex justify-center'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1.2rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/material-symbols:remove-shopping-cart-rounded.svg?color=%23ff0000)",
                                                        // "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                            <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] tracking-[1px]'>
                                                SHOP
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div onClick={() => { setPosState(3) }} data-pos="3" className='mobile-nav-links w-full'>
                                        <Link to="/" className='w-full flex items-center justify-center py-3 flex-col gap-2'>
                                            <div className='w-full  mobile-nav-icon-wrapper flex justify-center'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1.2rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/famicons:home.svg?color=%23ff0000)",
                                                        // "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                            <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] tracking-[1px]'>
                                                HOME
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div onClick={() => { setPosState(4); }} data-pos="4" className='mobile-nav-links w-full'>
                                        <Link to="/" className='w-full flex items-center justify-center py-3 flex-col gap-2'>
                                            <div className='w-full  mobile-nav-icon-wrapper flex justify-center'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1.2rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/material-symbols:person-search-rounded.svg?color=%23ff0000)",
                                                        // "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                            <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] tracking-[1px]'>
                                                PROFILE
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div ref={profileLinks} onClick={() => { handleProfile() }} className='mobile-nav-links w-full'>
                                        <div className='w-full flex items-center justify-center py-3 flex-col gap-2'>
                                            <div className='w-full  mobile-nav-icon-wrapper flex justify-center'>
                                                <div
                                                    className="mask-item"
                                                    style={{
                                                        "--m-size": "1.2rem",
                                                        "--m-bg": "var(--p-c)",
                                                        "--m-url": "url(https://api.iconify.design/line-md:list-3-filled.svg?color=%23ff0000)",
                                                        // "--m-h-bg": "var(--s-c)"
                                                    }}
                                                ></div>
                                            </div>
                                            <p className='m-0 mobile-nav-content leading-[1.2] poppins text-[8px] tracking-[1px]'>
                                                MENS
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header >
            }
        </>
    )
}

export default Header
