"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import Logo from '@/public/annother-parth.svg';

export const metadata = {
  title: "Our Vision | Parth Sarthi Real Estate Builders Jaipur",
  description:
    "Our vision is to build sustainable, modern, and high-quality real estate developments that enhance lifestyle and promote smart living in Jaipur.",
};


export default function Page() {
    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = e.clientX - left - width / 2; // Horizontal distance from center
        const y = e.clientY - top - height / 2; // Vertical distance from center

        const rotateX = (y / height) * 20; // Adjust rotation sensitivity
        const rotateY = (x / width) * -20;

        imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`; // Adjust 3D perspective
    };

    const handleMouseLeave = () => {
        imageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };
    return (
        <>
            <div className='px-4'>
                <div className="py-8">
                    <div className="container lg:w-[80%] mx-auto">
                        <h1 className="border-b-4 font-semibold text-2xl lg:text-3xl border-b-[#CC9B18] mb-4">Vision</h1>
                        <p className="text-sm leading-6 font-medium my-3">
                            At <span className="font-bold">PARTH SARTHI Builder</span>, our vision is to transform the landscape of urban living by crafting premium residential spaces that epitomize luxury, comfort, and innovation. Based in the vibrant city of Jaipur and established in 2008, we are dedicated to creating iconic landmarks that stand as a testament to exceptional craftsmanship and architectural brilliance.
                        </p>
                        <p className="text-sm leading-6 font-medium my-3">
                            We believe that a home is not just a place to live but an experience to cherish. Every project we undertake is meticulously designed to provide a harmonious blend of modern architecture, thoughtful amenities, and strategic locations. Our developments are a reflection of our commitment to enhancing the quality of life for our residents while setting new benchmarks in luxury living.
                        </p>

                        <p className="text-sm leading-6 font-medium my-3">
                            Our vision extends beyond building homes—we aim to create sustainable, value-driven communities that cater to the aspirations of modern families. With a focus on eco-friendly practices, innovative designs, and timely project delivery, we are redefining what it means to live in a premium home. At PARTH SARTHI Builder, we don’t just build homes; we create lifestyles that inspire and uplift.
                        </p>
                    </div>
                </div>
            </div>
            <div className='px-4 overflow-hidden'>
                <div className='backdrop-blur-lg p-6 lg:p-8'>
                    <div className="container py-10 lg:py-16 lg:w-[85%] mx-auto">
                        <h2 className='font-bold text-3xl text-center lg:text-left leading-snug'>
                            SHAPING THE FUTURE<br /> OF MODERN LIVING
                        </h2>
                        <p className='text-[#CC9B18] text-base font-medium mt-4 text-center lg:text-left'>
                            BUILDING TRUST, CREATING LEGACIES, AND INSPIRING INNOVATION
                        </p>

                        <div className="grid lg:grid-cols-2">
                            <div
                                className="col-span-1 flex justify-center image-container"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Image
                                    ref={imageRef}
                                    src={Logo}
                                    alt="Logo"
                                    width={408}
                                    height={340}
                                    className="image"
                                />
                            </div>
                            <div className="col-span-1 flex flex-col gap-10">
                                <div className="">
                                    <div className="flex items-center gap-2">
                                        <span className="text-6xl font-extrabold text-[#333]">17</span>
                                        <span className="border-b text-[#CC9B18] font-medium">YEARS OF EXCELLENCE</span>
                                    </div>
                                    <p className="text-sm font-medium mt-3 text-gray-600">
                                        Delivering innovative projects and setting benchmarks in quality since 2008.
                                    </p></div>

                                <div className="">
                                    <div className="flex items-center gap-2">
                                        <span className="text-6xl font-extrabold text-[#333]">INNOVATIVE</span>
                                        <span className="border-b text-[#CC9B18] font-medium">DESIGNS</span>
                                    </div>
                                    <p className="text-sm font-medium mt-3 text-gray-600">
                                        Crafting modern spaces with cutting-edge architecture and sustainable solutions.
                                    </p>
                                </div>


                                <div className="">
                                    <div className="flex items-center gap-2">
                                        <span className="text-6xl font-extrabold text-[#333]">100%</span>
                                        <span className="border-b text-[#CC9B18] font-medium">TRUST & SATISFACTION</span>
                                    </div>
                                    <p className="text-sm font-medium mt-3 text-gray-600">
                                        Prioritizing customer satisfaction with transparent processes and timely delivery.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
