"use client";
import React, { useRef } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "JEFFREY BROWN",
    role: "Creative Leader",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "ANN RICHMOND",
    role: "Web Developer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "MICHAEL SCOTT",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "SARAH JOHNSON",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "DAVID MARTINEZ",
    role: "Marketing Head",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "EMMA WILSON",
    role: "Business Analyst",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

export default function TeamSection() {
  const scrollContainerRef = useRef(null);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container max-w-[90%] mx-auto">
        {/* 👇 Smaller gap & top aligned */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 items-start">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Meet The Team
              <br />
              <span className="text-gray-800">Our Professionals</span>
            </h2>

            {/* <div className="w-20 h-1 mb-6" /> */}

            <p className="text-gray-500 leading-relaxed mb-6 max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio corporis delectus dolorem possimus, dolor rerum.
            </p>

            <button className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition">
              READ MORE
            </button>
          </div>

          {/* Right Scroll Cards – starts at SAME TOP */}
          <div>
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-2"
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {member.role}
                    </p>

                    <div className="flex justify-center gap-4">
                      <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-100 hover:bg-blue-600 flex items-center justify-center transition">
                        <Facebook className="w-5 h-5 text-gray-600 hover:text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-100 hover:bg-pink-600 flex items-center justify-center transition ">
                        <Instagram className="w-5 h-5 text-gray-600 hover:text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-100 hover:bg-blue-700 flex items-center justify-center transition">
                        <Linkedin className="w-5 h-5 text-gray-600 hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
