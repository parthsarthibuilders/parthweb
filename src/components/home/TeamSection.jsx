"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

const leaders = [
  {
    id: 1,
    name: "Bhagwana Ram Burdak",
    image:
      "/owner1.png",
    description:
      "Bhagwana Ram Burdak, the co-founder and driving force behind Parth Sarthi Buildestate Pvt Ltd, is a name synonymous with innovation and resilience in the real estate sector.",
    detailLink: "/leadership/bhagwana-ram-burdak",
  },
  {
    id: 2,
    name: "Megha Ram Burdak",
    image:
      "/owner2.png",
    description:
      "Megha Ram Burdak, a trailblazer in the real estate industry, began his journey in 2003 with an ambitious vision to transform the landscape of modern living.",
    detailLink: "/leadership/megha-ram-burdak",
  },
];

export default function LeadershipPreview() {
  return (
    <section className="py-16">
      <div className="container px-4 md:max-w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-5">
              Meet the Leaders
            </h2>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Driving Vision & Strategy
            </h3>

            <p className="font-light leading-relaxed mb-8 max-w-lg">
              Our leadership team brings together experience, innovation, and a
              clear vision for the future. With a strong focus on strategic
              thinking and impactful decision-making, they guide our
              organization toward sustainable growth and long-term success.
            </p>
          </div>

          {/* Right - Leader Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {leaders.map((leader) => (
              <a
                key={leader.id}
                href={leader.detailLink}
                className="text-center group cursor-pointer"
              >
                {/* Circular Image */}
                <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-wide uppercase">
                  {leader.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 px-4 line-clamp-2">
                  {leader.description}
                </p>

                {/* View Details Link */}
                <span className="inline-flex items-center gap-2 text-gray-700 font-semibold text-sm group-hover:text-yellow-600 transition-colors">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
