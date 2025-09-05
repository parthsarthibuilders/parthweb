"use client";
import Image from "next/image";
import './Partners.css'

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
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#e6ecfc] to-[#e3ebff]">
      <div className="container flex flex-col items-center max-w-[90%] mx-auto relative">
        <h2 className="text-3xl mb-8 font-light text-[#2d2849] text-center">
          Our <span className="font-bold">Partners</span>
        </h2>

        <div
          className="slider w-full overflow-x-auto whitespace-nowrap"
          style={{
            "--width": "15rem",
            "--height": "10rem",
            "--quantity": imageLinks.length,
          }}
        >
          <div className="list flex gap-4">
            {imageLinks.map((logo, index) => (
              <div
                key={index}
                className="item inline-block"
                style={{ "--position": index + 1 }}
              >
                <div className="partner-logo w-[15rem] h-[10rem] p-2 border bg-white border-gray-200 flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={240}
                    height={160} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
