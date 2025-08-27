import React from 'react'
import '../css/tools/MaskImage.css';

function MaskImage({ size = "1.1rem", bg = "var(--t-c-l)", hBg = "var(--p-c)", url = "https://api.iconify.design/hugeicons:search-02.svg" }) {
    return (
        <div
            className="mask-item"
            style={{
                "--m-size": size,
                "--m-bg": bg,
                "--m-url": `url(${url})`,
                "--m-h-bg": hBg
            }}
        ></div>
    )
}

export default MaskImage