"use client";
import Image from "next/image";
export default function Partners() {
    const imageLinks = [
        'https://parthsarthibuilder.com/old/wp-content/uploads/2024/02/bangur-cement-logo-69AFF183E9-seeklogo.com_.png',
        'https://parthsarthibuilder.com/old/wp-content/uploads/2024/02/Godrej_Logo.svg.png',
        'https://parthsarthibuilder.com/old/wp-content/uploads/2024/02/logo-01.jpg',
        'https://parthsarthibuilder.com/old/wp-content/uploads/2024/02/CROMPTON.NS_BIG-fdfe936c.png',
        'https://parthsarthibuilder.com/old/wp-content/uploads/2024/02/926_tata.jpg',
        'https://parthsarthibuilder.com/old/wp-content/uploads/2024/02/Aquaguard-Logo.webp',
        'https://parthsarthibuilder.com/old/wp-content/uploads/2024/02/unnamed.png',
        'https://parthsarthibuilder.com/old/wp-content/uploads/2024/02/jaguar-experience-bathing-logo-234FD5BFEF-seeklogo.com_.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrSWq4uu0dFWR0GHddVy-Vw0TJSYJCyDCcRw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjPgZd3THLosh8VuZDaE8mlL8PdD_wP9tfuQ&s',
        'https://d199amilqw5tyr.cloudfront.net/wp-content/uploads/2024/04/Ultratech_Cement_Logo.svg_.png',
        'https://download.logo.wine/logo/Anchor_Electricals_Pvt._Ltd./Anchor_Electricals_Pvt._Ltd.-Logo.wine.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2bHAEyiq0TnJzLt0YMrO34puvCm1lTfrEw&s',
        'https://www.thereportingtoday.com/wp-content/uploads/2023/11/JSW-Paints-Logo.jpg'
        // Add more links here if needed (from the remaining HTML elements)
    ];
    return (
        <section className=" py-16 bg-gradient-to-r from-[#e6ecfc] to-[#e3ebff]">
            <div className="container flex flex-col items-center max-w-[90%] mx-auto relative">
                <h2 className="text-3xl mb-4 font-light text-[#2d2849]">Our  <span className="font-bold"> Partners</span></h2>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-5 w-full">
                    {imageLinks.map((imgUrl, index) => (
                        <div className="col-span-1" key={index}>
                            <div className="border-[0.6px] p-4 h-full bg-white group border-[#dedfdf] rounded-md flex items-center justify-center">

                                <Image alt="" src={imgUrl} className="max-w-full  " width={100} height={100} />
                            </div>

                        </div>
                    ))}



                </div>
            </div>
        </section>
    )
}