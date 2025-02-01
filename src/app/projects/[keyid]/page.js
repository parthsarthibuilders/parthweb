"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";
import ImageGallery from "@/components/single/ImageGallery";
import Tabs from "@/components/single/Tabs";
import ReadMore from "@/components/single/ReadMore";
import { ArrowDownToLine } from "lucide-react";
import ContactForm from "@/components/single/ContactForm";
import ContactFormPdf from "@/components/single/CaontactFormpdf";
import Image from "next/image";
import EmiCalculator from "@/components/EmiCalculator/EmiCalculator";
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default function SingleProject({ params }) {
    const { keyid } = params;

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedBhk, setSelectedBhk] = useState("");
    const [filteredSizes, setFilteredSizes] = useState([]);
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`/api/projects/${keyid}`);
                const data = response.data.data;
                setProject(data);
                setFilteredImages(data.gallery); // Default images
            } catch (err) {
                setError("Failed to fetch project data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [keyid]);

    useEffect(() => {
        if (project) {
            let newImages = project.gallery;

            // Apply size filter
            if (selectedSize) {
                const sizeObj = project.projectSize.find((size) => size.size === selectedSize);
                if (sizeObj) {
                    newImages = sizeObj.image;
                } else {
                    newImages = []; // No matching size
                }
            }

            // Apply BHK filter on top of size filter
            if (selectedBhk) {
                const bhkObj = project.bhk.find((bhk) => bhk.bhk === selectedBhk);
                if (bhkObj) {
                    // Intersection of current images and BHK images
                    newImages = newImages.filter((img) => bhkObj.image.includes(img));

                    // Update available sizes based on selected BHK
                    const bhkSizes = project.projectSize.filter((size) =>
                        size.image.some((img) => bhkObj.image.includes(img))
                    );
                    setFilteredSizes(bhkSizes);
                } else {
                    newImages = []; // No matching BHK
                    setFilteredSizes([]); // Clear sizes
                }
            } else {
                // If no BHK is selected, reset sizes
                setFilteredSizes(project.projectSize);
            }

            setFilteredImages(newImages);
        }
    }, [selectedSize, selectedBhk, project]);

    const resetFilters = () => {
        setSelectedSize("");
        setSelectedBhk("");
        if (project) setFilteredImages(project.gallery);
    };




    if (project?.possessionStatus === "Coming Soon") {
        return (
            <section className="flex justify-center relative py-5 ">
                <div className="relative w-full max-w-4xl">
                    {/* Property Image */}
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <Image
                            src={project?.image} // Replace with your image field in the project object
                            alt={project?.name}
                            width={1200}
                            height={800}
                            className="object-cover w-full h-[400px] sm:h-[500px]"
                            priority
                        />
                        {/* Overlay for Property Title */}
                        <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold">{project?.title}</h2>
                        </div>
                        {/* Main Overlay */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <h1 className="text-6xl font-extrabold text-[white] animate-bounce tracking-wide">
                                Coming Soon 🚀
                            </h1>
                        </div>
                    </div>

                    {/* Stay Excited Message */}
                    <div className="absolute bottom-8 left-8 flex gap-2 items-center text-sm text-[#DAB221]">
                        <span className="animate-pulse">✨ Stay excited!</span>
                    </div>
                </div>
            </section>
        );
    }

    if (project?.possessionStatus === "Sold Out" && filteredImages?.length < 2) {
        return (
            <section className="flex justify-center relative py-5 ">
                <div className="relative w-full max-w-4xl">
                    {/* Property Image */}
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <Image
                            src={project?.image} // Replace with your image field in the project object
                            alt={project?.name}
                            width={1200}
                            height={800}
                            className="object-cover w-full h-[400px] sm:h-[500px]"
                            priority
                        />
                        {/* Overlay for Property Title */}
                        <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold">{project?.title}</h2>
                        </div>
                        {/* Main Overlay */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <h1 className="text-6xl font-extrabold text-[white] animate-bounce tracking-wide">
                                Sold Out 🚀
                            </h1>
                        </div>
                    </div>


                </div>
            </section>
        );
    }




    if (loading) {
        return (
            <section className="py-4">
                <div className="container max-w-[90%] mx-auto text-center">
                    <p className="text-xl font-bold text-gray-600">Loading project details...</p>
                    <div className="mt-4">
                        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16 mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-4">
                <div className="container max-w-[90%] mx-auto text-center">
                    <p className="text-xl font-bold text-red-600">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="py-2 bg-[#e6ecfc]">
                <title>{project.seoTitle}</title>
                <div className="container max-w-[90%] mx-auto">
                    <Breadcrumb customLabels={{ projects: "Projects", single: "Project Details" }} />
                </div>
            </section>
            <section className="py-4">
                <div className="container max-w-[90%] mx-auto">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="relative overflow-hidden bg-[#fff5e4] rounded-lg rounded-br-none">
                                {project?.possessionStatus === "Sold Out" ? (
                                    <span className="inline-block z-50 absolute top-6 text-xs -left-9 bg-red-500 py-1 text-white px-10 border-y transform -rotate-45">

                                        ✨Sold Out
                                    </span>
                                ) : (
                                    <span className="inline-block z-50 absolute top-6 text-xs -left-9 bg-red-500 py-1 text-white px-10 border-y transform -rotate-45">

                                        ✨Featured
                                    </span>)}
                                <ImageGallery images={filteredImages} />
                            </div>

                            <div className="flex justify-end  items-center">
                                <div className="flex gap-6 bg-[#fff5e4] p-2 rounded-b-lg shadow-md">

                                    <div className="flex justify-end items-center">
                                        <div className="flex gap-6 bg-[#fff5e4] p-2 rounded-b-lg shadow-md">
                                            {/* Size Filter */}
                                            <div className="relative w-1/2">
                                                <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="size-select">
                                                    Select Size
                                                </label>
                                                <select
                                                    id="size-select"
                                                    className="block w-full text-sm px-3 py-2 rounded border border-gray-300 bg-[#2d2849] text-white focus:outline-none"
                                                    value={selectedSize}
                                                    onChange={(e) => setSelectedSize(e.target.value)}
                                                >
                                                    <option value="" className="text-gray-400">
                                                        All Size
                                                    </option>
                                                    {filteredSizes.map((size) => (
                                                        <option key={size.size} value={size.size}>
                                                            {size.size} Sq.ft
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* BHK Filter */}
                                            <div className="relative w-1/2">
                                                <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="bhk-select">
                                                    Select BHK
                                                </label>
                                                <select
                                                    id="bhk-select"
                                                    className="block w-full text-sm px-3 py-2 rounded border border-gray-300 bg-[#2d2849] text-white focus:outline-none"
                                                    value={selectedBhk}
                                                    onChange={(e) => setSelectedBhk(e.target.value)}
                                                >
                                                    <option value="" className="text-gray-400">
                                                        All BHK
                                                    </option>
                                                    {project.bhk.map((bhk) => (
                                                        <option key={bhk.bhk} value={bhk.bhk}>
                                                            {bhk.bhk} BHK
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <button
                                    onClick={resetFilters}
                                    className="text-sm bg-red-500 text-white px-4 py-1 rounded"
                                >
                                    Reset
                                </button> */}
                            </div>

                            <div className="py-5">
                                <h1 className="text-2xl font-bold text-[#2d2849]">{project.title}</h1>
                                <p className="text-sm text-gray-400">{project.location}</p>
                            </div>

                            <Tabs project={project} />

                            <ReadMore project={project} />
                            <EmiCalculator />
                            <div className="mt-5">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex w-full text-center justify-center py-7 px-10 rounded-full items-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] text-white font-semibold my-3 leading-3 group transition"
                                >
                                    Download Brochure
                                    <ArrowDownToLine
                                        className="ml-2 transition-transform duration-300 group-hover:translate-y-1 animate-bounce"
                                        size={18}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="max-w-lg mx-auto sticky top-1 p-5 bg-[white] border shadow-xl flex flex-col items-center rounded-xl justify-center">
                                <p className="bg-gradient-to-l animate-bounce font-semibold inline-block px-5 py-1 text-xs rounded-full text-white from-[#DAB221] to-[#352d60]">
                                    ✨Get Offer{" "}
                                </p>
                                <h4 className="text-md font-bold text-center mb-4 uppercase">
                                    Get Best Offer on this Project
                                </h4>
                                <ContactForm project={project.slug} bhk={selectedBhk} size={selectedSize} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="h-96">
                    <ContactFormPdf pdflink={project.pdf} />
                </div>
            </Modal>
        </>
    );
}
