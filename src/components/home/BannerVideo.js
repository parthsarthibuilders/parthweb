"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import Image from 'next/image';
import Link from 'next/link';

export default function BannerVideo() {
    

    return (
        <section className="">
            <div className="container mx-auto w-full overflow-hidden">

              
                    <Link href="/projects">
                        <Image
                            src="https://www.parthsarthi.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdisbjpwzn%2Fimage%2Fupload%2Fv1738220574%2Fparthsarthi%2Ffpxbgrcom1re4vizulxf.webp&w=1920&q=75"
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
