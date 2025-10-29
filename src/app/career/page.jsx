import React from 'react'
import Job from "@/components/single/Job"

export const metadata = {
  title: "Careers | Join Parth Sarthi Real Estate Developers Jaipur",
  description:
    "Grow your career with Parth Sarthi, a leading real estate developer in Jaipur with opportunities in construction, sales, technology, marketing, and management.",
};


export default function page() {
    return (
        <>
            <div className=" flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full">
                    <h2 className="text-4xl font-extrabold text-[#2d2849]">
                        Job Profile
                    </h2>
                    <p className=" text-sm text-gray-500 mt-2">
                    We’d love to hear from you! If you’re interested in joining our team, explore the details below and apply.
                    </p>
                    <div className="bg-white shadow-lg mt-4 rounded-lg p-8">
                        <Job />
                    </div>

                </div>

            </div>



        </>
    )
}
