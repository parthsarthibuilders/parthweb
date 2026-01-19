"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import videoImg from "@/public/Parth-Crown-1-1024x1024.jpg";
import "./About.css";
import TeamSection from "./TeamSection";

const useCountUp = ({ end, duration = 1000, isInView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                })
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('.fade-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [])

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(end * easeOutQuart));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [end, duration, isInView]);

    return count;
};

const useIntersectionObserver = ({ threshold = 0.3, rootMargin = "0px" } = {}) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsInView(true);
            },
            { threshold, rootMargin }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [threshold, rootMargin]);

    return { ref, isInView };
};

function StatItem({ value, label, suffix, isInView }) {
    const animatedValue = useCountUp({ end: value, isInView });
    return (
        <div className="fade-section">
            <h3 className="text-4xl font-bold">
                {animatedValue}
                {suffix}
            </h3>
            <p className="text-sm mt-1">{label}</p>
        </div>
    );
}

export default function AboutComponent() {
    const { ref, isInView } = useIntersectionObserver();

    const statsData = [
        { value: 35, label: "YEARS OF EXCELLENCE", suffix: "+" },
        { value: 10.5, label: "SQ. FT. DELIVERED", suffix: "M+" },
        { value: 35, label: "PROJECTS", suffix: "+" },
        { value: 2.6, label: "SQ. FT. UNDER DEVELOPMENT", suffix: "M+" },
    ];

    return (
        <>
            <section className="py-10">
                <div className="container max-w-[90%] mx-auto">
                    <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-10 gap-4">
                        <div className="col-span-3">
                            <p className="bg-gradient-to-r animate-bounce mb-2 font-semibold inline-block px-5 py-1 text-xs rounded-full text-white from-[#DAB221] to-[#B07C0A]">
                                About us
                            </p>
                            <h2 className="text-3xl mb-4 font-light text-[#2d2849]">
                                Legacy Of <span className="font-bold">PARTH SARTHI GROUP</span>
                            </h2>
                            <p className="mb-3 font-medium">
                                -Experience luxury living with{" "}
                                <span className="text-[#DAB221] font-semibold underline">
                                    Parth Sarthi Buildestate Pvt. ltd.
                                </span>
                            </p>
                            <p className="mb-2 text-sm font-light">
                                Are you looking for a dream home in Jaipur, situated in a prime location
                                with modern architecture and luxury interiors? Look no further than
                                Parth Sarthi Builders and Developers, a reputable group of companies
                                founded by Bhagwana Ram Choudhary and Mega Ram Choudhary. With their
                                combined expertise and experience, they have established themselves
                                as leaders in the real estate industry, especially in Jaipur.
                            </p>
                            <p className="my-3 font-medium">
                                -Why Choose{" "}
                                <span className="text-[#DAB221] font-semibold underline">
                                    Parth Sarthi Buildestate Pvt. ltd.
                                </span>{" "}
                                ?
                            </p>
                            <p className="mb-2 text-sm font-light">
                                <span className="text-[#DAB221] font-semibold underline">
                                    Parth Sarthi Buildestate Pvt. ltd.
                                </span>{" "}
                                stand out from the competition for several reasons. Firstly, their
                                commitment to quality and customer satisfaction is unmatched. Each
                                project is carefully planned and executed to ensure that residents
                                experience the highest level of comfort and luxury. Secondly, their
                                attention to detail is evident in every aspect of their properties,
                                from modern architectural designs to state-of-the-art amenities.
                                Lastly, their premium amenities and prime locations make it convenient
                                for residents to access essential services and enjoy a vibrant lifestyle.
                            </p>
                            <p className="mb-2 text-sm font-light">
                                <span className="text-[#DAB221] font-semibold underline">
                                    Parth Sarthi Buildestate Pvt. ltd.
                                </span>{" "}
                                is a trustworthy brand in the real estate industry with a proven
                                track record of delivering high-quality residential projects in Jaipur.
                            </p>
                        </div>

                        <div className="col-span-2">
                            <Link
                                className="block videImgtag h-full relative"
                                href="https://www.instagram.com/reel/C7UbFevtE3H/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                            >
                                <Image
                                    src={videoImg}
                                    alt="Video Img"
                                    className="h-full object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <PlayCircle className="text-white w-16 h-16 animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <TeamSection />

            <section ref={ref} className="py-16 bg-white">
                <div className="container max-w-[80%] mx-auto text-center">
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-8 mb-8">
                        {statsData.map((stat, idx) => (
                            <StatItem
                                key={idx}
                                value={stat.value}
                                label={stat.label}
                                suffix={stat.suffix}
                                isInView={isInView}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-5 lg:mt-10">
                        <h4 className="text-2xl font-semibold mb-3 fade-section">
                            35+ Years Of Experience In Redefining Real Estate For Aspirational Living
                        </h4>
                        <p className="text-sm font-light max-w-3xl mx-auto leading-relaxed fade-section">
                            The journey of Parth Sarthi Builders has been both iconic and happening. The
                            group has spread its wings in all spheres of real estate development
                            and established many benchmarks of architectural excellence. With many
                            firsts in its portfolio, Parth Sarthi is constantly evolving and playing a
                            pivotal role in changing Jaipur’s skyline for better. Today, Parth Sarthi
                            is trusted for better planning, excellent construction quality and
                            on-time delivery.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
