import React from 'react';
import Image from 'next/image';
import Image1 from '@/public/WhatsApp Image 2025-01-23 at 14.15.58_0e1230ef.webp';
import Image2 from '@/public/WhatsApp Image 2025-01-23 at 14.15.58_8df28691 (2).jpg';

export default function Page() {
    return (
        <>
            <div className='container lg:w-[80%] mx-auto p-5 lg:p-0'>

                {/* Megha Ram Burdak Section */}
                <div className="grid lg:grid-cols-5 gap-4 my-5 border-b pb-5">
                    <div className="lg:col-span-3">
                        <h3 className='border-b-4 border-[#CC9B18] font-semibold text-2xl text-[#333]'>Megha Ram Burdak</h3>
                        <p className='text-sm mt-2 text-gray-600 leading-6'>
                            Megha Ram Burdak, a trailblazer in the real estate industry, began his journey in 2003 with an ambitious vision to transform the landscape of modern living. As the visionary owner of <span className='font-bold text-[#CC9B18]'>Parth Sarthi Buildestate Pvt Ltd</span>, Megha Ram brought innovative ideas and unparalleled dedication to every project he undertook. 
                            <br /><br />
                            His leadership has been the driving force behind the company&apos;s exponential growth. With a focus on delivering top-tier quality and building enduring trust with clients, Megha Ram has set new benchmarks in the industry. His knack for understanding client needs and a relentless pursuit of excellence have earned him a stellar reputation as a dependable and innovative entrepreneur. His journey inspires many aspiring leaders in the real estate domain.
                            <br /><br />
                            Beyond his professional endeavors, Megha Ram is deeply committed to social welfare. His philanthropic initiatives, including supporting education and healthcare in underprivileged communities, reflect his dedication to creating a better society.
                        </p>
                    </div>
                    <div className="lg:col-span-2 flex justify-center lg:justify-end">
                        <Image
                            src={Image1}
                            alt="Megha Ram Burdak"
                            priority
                            width={350}
                            height={525}
                            className='rounded-lg shadow-lg'
                        />
                    </div>
                </div>

                {/* Bhagwana Ram Burdak Section */}
                <div className="grid lg:grid-cols-5 gap-4 my-5 border-b pb-5">
                    <div className="lg:col-span-2 flex justify-center lg:justify-start">
                        <Image
                            src={Image2}
                            alt="Bhagwana Ram Burdak"
                            priority
                            width={350}
                            height={525}
                            className='rounded-lg shadow-lg'
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <h3 className='border-b-4 border-[#CC9B18] font-semibold text-2xl text-[#333]'>Bhagwana Ram Burdak</h3>
                        <p className='text-sm mt-2 text-gray-600 leading-6'>
                            Bhagwana Ram Burdak, the co-founder and driving force behind <span className='font-bold text-[#CC9B18]'>Parth Sarthi Buildestate Pvt Ltd</span>, is a name synonymous with innovation and resilience in the real estate sector. Since 2003, he has spearheaded numerous successful projects, blending strategic foresight with a deep understanding of market dynamics.
                            <br /><br />
                            Known for his integrity and customer-first approach, Bhagwana Ram has built a legacy of trust and excellence. His visionary mindset and tireless efforts have positioned the company as a market leader, known for delivering properties that redefine luxury and comfort. He is celebrated for his ability to stay ahead of industry trends, ensuring every project meets and exceeds client expectations. Bhagwana Ram’s story is one of perseverance, passion, and an unwavering commitment to excellence.
                            <br /><br />
                            Outside of his professional life, Bhagwana Ram is an advocate for sustainable development. His efforts in promoting green building practices and environmental conservation have set a new standard for responsible real estate development. Additionally, he actively participates in community-building activities, fostering a sense of unity and progress in the regions where the company operates.
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}