"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight } from "lucide-react";
import FeaturedCard from "../card/FeaturedCard";
import Slider from "react-slick";
import axios from "axios";

export default function Feature() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/projects/fetchfeatured/true");
                setData(response.data.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <section className="py-10">
            <div className="container max-w-[90%] mx-auto">
                <p className="bg-gradient-to-l animate-bounce font-semibold inline-block px-5 py-1 text-xs rounded-full text-white from-[#DAB221] to-[#352d60]">
                    ✨Featured
                </p>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-light text-[#2d2849]">
                        Our <span className="font-bold">Feature Projects</span>
                    </h2>
                    <Link
                        href={`/projects`}
                        className="sm:flex hidden py-3 px-10 rounded-full items-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] text-white font-semibold my-3 leading-3 group transition"
                    >
                        View All
                        <ArrowRight
                            className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                            size={18}
                        />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center w-full h-48">
                        <p className="text-lg font-semibold text-gray-500">Loading...</p>
                    </div>
                ) : data.length > 0 ? (
                    <div className="w-full relative">
                        <Slider {...settings}>
                            {data.map((item) => (
                                <div className="items" key={item._id}>
                                    <FeaturedCard project={item} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="flex justify-center items-center w-full h-48">
                        <p className="text-lg font-semibold text-gray-500">No Data Available</p>
                    </div>
                )}
            </div>
        </section>
    );
}
