import React from 'react'

function ProductSection() {
    return (
        <section className='w-full bg-w py-20  '>
            <div className="max-w-[1450px] mx-auto product-section-wrapper">
                <div className='grid grid-cols-12'>
                    <div className="col-span-12 mb-20 px-4">
                        <div className='product-section-heading-wrapper  border-b-[5px] border-[var(--p-c)]'>
                            <div className='product-section-heading ruwudu p-2 px-7 pb-0 bg-p-c mb-[3px] w-max text-c-l text-[17px] rounded-t-[7px] tracking-[1px]'>Our Products</div>
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 px-6 mb-15 isolate'>
                        <div data-offer="10% OFF" className='poppins bg-w shadow-[0_0_10px_rgba(0,0,0,0.15)] p-4 rounded-[8px] product-wrapper relative'>
                            <div
                                style={{
                                    "--back-image": "url(/images/product/p-1.jpg)"
                                }}
                                className='product-img-wrapper back-image w-full aspect-[1/1.1] bg-p-c rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.3)]'></div>

                            <div className='product-details-wrapper pt-4 px-1 '>
                                <div className='product-ratings-wrapper flex items-center gap-2 poppins text-[14px]'>
                                    <div className='product-ratings' style={{ "--ratings": "3.5" }}></div>
                                    (3.5)
                                </div>
                                <h5 className='poppins font-extrabold text-[17px] mt-2 tracking-widest m-0'
                                    style={{ color: "color-mix(in srgb, var(--t-c-d) 70%, transparent)" }}>Franch Oil NH* Plus</h5>
                                <h5 className='poppins font-medium text-[14px] mt-1 m-0'>Ayurvedic Medicine - 100  ML</h5>

                                <div className='product-price poppins mt-7 flex items-end gap-3 mb-4 '>
                                    <p className='m-0 text-a-c-4 font-medium text-[23px] leading-[1.2] '>₹ 210.00</p>
                                    <p className='m-0 font-medium line-through decoration-2'
                                        style={{ color: "color-mix(in srgb, var(--t-c-d) 60%, transparent)" }}>₹ 360.00</p>
                                </div>

                                <a href="/" className='poppins font-bold flex w-full p-2 text-[15px] transition-all duration-400 tracking-[2px] text-c-l bg-[var(--bg-b-2)] rounded-full justify-center items-center hover:bg-[var(--p-c)]'>BUY NOW</a>
                            </div>
                        </div>

                    </div>
                    <div className='col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 px-6 mb-15 isolate'>
                        <div data-offer="10% OFF" className='poppins bg-w shadow-[0_0_10px_rgba(0,0,0,0.15)] p-4 rounded-[8px] product-wrapper relative'>
                            <div
                                style={{
                                    "--back-image": "url(/images/product/p-4.jpg)"
                                }}
                                className='product-img-wrapper back-image w-full aspect-[1/1.1] bg-p-c rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.3)]'></div>

                            <div className='product-details-wrapper pt-4 px-1 '>
                                <div className='product-ratings-wrapper flex items-center gap-2 poppins text-[14px]'>
                                    <div className='product-ratings' style={{ "--ratings": "3.5" }}></div>
                                    (3.5)
                                </div>
                                <h5 className='poppins font-extrabold text-[17px] mt-2 tracking-widest m-0'
                                    style={{ color: "color-mix(in srgb, var(--t-c-d) 70%, transparent)" }}>OG-3 Veg 30's </h5>
                                <h5 className='poppins font-medium text-[14px] mt-1 m-0'>Ayurvedic Proprietary Medicine</h5>

                                <div className='product-price poppins mt-7 flex items-end gap-3 mb-4 '>
                                    <p className='m-0 text-a-c-4 font-medium text-[23px] leading-[1.2] '>₹ 360.00</p>
                                    <p className='m-0 font-medium line-through decoration-2'
                                        style={{ color: "color-mix(in srgb, var(--t-c-d) 60%, transparent)" }}>₹ 450.00</p>
                                </div>

                                <a href="/" className='poppins font-bold flex w-full p-2 text-[15px] transition-all duration-400 tracking-[2px] text-c-l bg-[var(--bg-b-2)] rounded-full justify-center items-center hover:bg-[var(--p-c)]'>BUY NOW</a>
                            </div>
                        </div>

                    </div>
                    <div className='col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 px-6 mb-15 isolate'>
                        <div data-offer="10% OFF" className='poppins bg-w shadow-[0_0_10px_rgba(0,0,0,0.15)] p-4 rounded-[8px] product-wrapper relative'>
                            <div
                                style={{
                                    "--back-image": "url(/images/product/p-3.jpg)"
                                }}
                                className='product-img-wrapper back-image w-full aspect-[1/1.1] bg-p-c rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.3)]'></div>

                            <div className='product-details-wrapper pt-4 px-1 '>
                                <div className='product-ratings-wrapper flex items-center gap-2 poppins text-[14px]'>
                                    <div className='product-ratings' style={{ "--ratings": "3.5" }}></div>
                                    (3.5)
                                </div>
                                <h5 className='poppins font-extrabold text-[17px] mt-2 tracking-widest m-0'
                                    style={{ color: "color-mix(in srgb, var(--t-c-d) 70%, transparent)" }}>Franch Diafite Powder </h5>
                                <h5 className='poppins font-medium text-[14px] mt-1 m-0'>200 Gms - Diabetic Food Supplement</h5>

                                <div className='product-price poppins mt-7 flex items-end gap-3 mb-4 '>
                                    <p className='m-0 text-a-c-4 font-medium text-[23px] leading-[1.2] '>₹ 365.00</p>
                                    <p className='m-0 font-medium line-through decoration-2'
                                        style={{ color: "color-mix(in srgb, var(--t-c-d) 60%, transparent)" }}>₹ 500.00</p>
                                </div>

                                <a href="/" className='poppins font-bold flex w-full p-2 text-[15px] transition-all duration-400 tracking-[2px] text-c-l bg-[var(--bg-b-2)] rounded-full justify-center items-center hover:bg-[var(--p-c)]'>BUY NOW</a>
                            </div>
                        </div>

                    </div>
                    <div className='col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 px-6 mb-15 isolate'>
                        <div data-offer="10% OFF" className='poppins bg-w shadow-[0_0_10px_rgba(0,0,0,0.15)] p-4 rounded-[8px] product-wrapper relative'>
                            <div
                                style={{
                                    "--back-image": "url(/images/product/p-2.jpg)"
                                }}
                                className='product-img-wrapper back-image w-full aspect-[1/1.1] bg-p-c rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.3)]'></div>

                            <div className='product-details-wrapper pt-4 px-1 '>
                                <div className='product-ratings-wrapper flex items-center gap-2 poppins text-[14px]'>
                                    <div className='product-ratings' style={{ "--ratings": "3.5" }}></div>
                                    (3.5)
                                </div>
                                <h5 className='poppins font-extrabold text-[17px] mt-2 tracking-widest m-0'
                                    style={{ color: "color-mix(in srgb, var(--t-c-d) 70%, transparent)" }}>Franch Orthovin Thailam</h5>
                                <h5 className='poppins font-medium text-[14px] mt-1 m-0'>60 ML - Ayurvedic Medicine</h5>

                                <div className='product-price poppins mt-7 flex items-end gap-3 mb-4 '>
                                    <p className='m-0 text-a-c-4 font-medium text-[23px] leading-[1.2] '>₹ 180.00</p>
                                    <p className='m-0 font-medium line-through decoration-2'
                                        style={{ color: "color-mix(in srgb, var(--t-c-d) 60%, transparent)" }}>₹ 300.00</p>
                                </div>

                                <a href="/" className='poppins font-bold flex w-full p-2 text-[15px] transition-all duration-400 tracking-[2px] text-c-l bg-[var(--bg-b-2)] rounded-full justify-center items-center hover:bg-[var(--p-c)]'>BUY NOW</a>
                            </div>
                        </div>

                    </div>
                    <div className='col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 px-6 mb-15 isolate'>
                        <div data-offer="10% OFF" className='poppins bg-w shadow-[0_0_10px_rgba(0,0,0,0.15)] p-4 rounded-[8px] product-wrapper relative'>
                            <div
                                style={{
                                    "--back-image": "url(/images/product/p-5.jpg)"
                                }}
                                className='product-img-wrapper back-image w-full aspect-[1/1.1] bg-p-c rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.3)]'></div>

                            <div className='product-details-wrapper pt-4 px-1 '>
                                <div className='product-ratings-wrapper flex items-center gap-2 poppins text-[14px]'>
                                    <div className='product-ratings' style={{ "--ratings": "3.5" }}></div>
                                    (3.5)
                                </div>
                                <h5 className='poppins font-extrabold text-[17px] mt-2 tracking-widest m-0'
                                    style={{ color: "color-mix(in srgb, var(--t-c-d) 70%, transparent)" }}>Franch Ayurveda Skin Soap</h5>
                                <h5 className='poppins font-medium text-[14px] mt-1 m-0'>100 Gms</h5>

                                <div className='product-price poppins mt-7 flex items-end gap-3 mb-4 '>
                                    <p className='m-0 text-a-c-4 font-medium text-[23px] leading-[1.2] '>₹ 60.00</p>
                                    <p className='m-0 font-medium line-through decoration-2'
                                        style={{ color: "color-mix(in srgb, var(--t-c-d) 60%, transparent)" }}>₹ 160.00</p>
                                </div>

                                <a href="/" className='poppins font-bold flex w-full p-2 text-[15px] transition-all duration-400 tracking-[2px] text-c-l bg-[var(--bg-b-2)] rounded-full justify-center items-center hover:bg-[var(--p-c)]'>BUY NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "1000px" }}></div>
        </section>
    )
}

export default ProductSection
