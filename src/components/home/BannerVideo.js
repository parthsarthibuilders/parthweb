"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import Image from 'next/image';
import Link from 'next/link';
import Banner from "@/public/Untitled design (28) (1).png"
export default function BannerVideo() {
    

    return (
        <section className="">
            <div className="container mx-auto w-full overflow-hidden">

              
                    <Link href="/projects">
                        <Image
                            src={Banner}
                            width={1920}
                            height={1080}
                            className="max-w-full w-full"
                            alt="Parth Sarthi"
                        />
                    </Link>
                    
            </div>
        </section>
    );
}
