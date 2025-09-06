"use client";
import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export default function FeaturedCard({ project }) {
    return (
        <div className="rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="relative h-[250px] w-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded">
                    {project.isSoldOut ? "Sold Out" : "✨ Featured"}
                </span>
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.location}</p>
                <p className="text-sm text-gray-700 font-medium">
                    {project.bhk && project.bhk.length > 0
                        ? project.bhk.map((b) => `${b.bhk} BHK`).join(", ")
                        : "Details Coming Soon"}
                </p>
                <Link
                    href={`/projects/${project.slug}`}
                    className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold mt-3"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
