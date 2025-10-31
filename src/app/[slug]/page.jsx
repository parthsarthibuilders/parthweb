"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProjectPage() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function fetchProject() {
            try {
                const res = await fetch(`/api/projects/${slug}`);
                if (!res.ok) throw new Error("Not found");
                const data = await res.json();
                if (!data) setNotFound(true);
                else setProject(data);
            } catch (err) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [slug]);

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-[#CC9B18] w-16 h-16 mb-4"></div>
                <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
        );

    if (notFound)
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center px-6">
                <h1 className="text-[7rem] md:text-[9rem] font-extrabold text-[#CC9B18] drop-shadow-md leading-none">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mt-3 max-w-md mx-auto">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block mt-4 px-6 py-3 bg-[#CC9B18] text-white text-lg font-medium rounded-full shadow-md hover:bg-[#b88915] transition-all duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{project.title}</h1>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
        </div>
    );
}
