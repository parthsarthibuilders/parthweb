"use client";
import React, { useState, useEffect } from "react";
import New from "../card/new";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight } from "lucide-react";
import Slider from "react-slick";
import Link from "next/link";
import axios from "axios";

export default function NewLaunches() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get("/api/projects/fetchnewlaunch/new");
                if (isMounted) {
                    setData(response.data.data || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: "0px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <section className="py-10 bg-gradient-to-br from-[#2d2849] to-[#352d60] relative overflow-hidden">
            <div className="container max-w-[90%] mx-auto flex flex-col items-center relative">
                <div className="py-7" />
                <p className="lg:text-[100px] text-[60px] absolute top-0 text-center font-bold text-slate-200 uppercase opacity-10 pointer-events-none">
                    New Launches
                </p>
                <h2 className="text-3xl text-center mb-10 mt-5 font-bold text-white">
                    New Launches Projects
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center w-full h-48">
                        <p className="text-lg font-semibold text-gray-300">Loading...</p>
                    </div>
                ) : data.length > 0 ? (
                    <div className="w-full">
                        <Slider {...settings}>
                            {data.map((item, index) => (
                                <div key={item.slug || index} className="px-2">
                                    <New
                                        keyid={item.slug}
                                        logo={item.logo}
                                        imageUrl={item.image}
                                        status="New Launch"
                                        title={item.title}
                                        location={item.location}
                                        size={item.projectSize}
                                        bhk={item.bhk}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="flex justify-center items-center w-full h-48">
                        <p className="text-lg font-semibold text-gray-300">No Data Available</p>
                    </div>
                )}

                <Link
                    href="/projects"
                    className="flex py-3 px-10 mt-6 rounded-full items-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] text-white font-semibold group transition"
                >
                    View All
                    <ArrowRight
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                        size={18}
                    />
                </Link>
            </div>
        </section>
    );
}
