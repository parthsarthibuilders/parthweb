"use client";
import { useState } from 'react';
import { Building2, PencilRuler, Building, ChartPie, HousePlus } from 'lucide-react';
import Image from 'next/image';
import PriceFilter from '../Pricefilter/PriceFilter';
import Aminities from '../Aminities/Aminities';
const Tabs = ({ project }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full border-gray-100 border">
            {/* Tab Header */}
            <div className="flex bg-[#e6ecfc] overflow-x-auto w-full">
                {/* Tab Buttons */}
                <button
                    className={`flex-1 py-2 text-center min-w-fit px-5 transition-colors duration-300
            ${activeTab === 0
                            ? 'border-b-4 border-[#1136cd] text-[#1136cd]'
                            : 'border-b-4 border-transparent text-gray-600 hover:text-[#1136cd] hover:border-[#1136cd]'
                        }`}
                    onClick={() => setActiveTab(0)}
                >
                    Overview
                </button>
                <button
                    className={`flex-1 py-2  min-w-fit px-5 text-center transition-colors duration-300
            ${activeTab === 1
                            ? 'border-b-4 border-[#1136cd] text-#1136cd'
                            : 'border-b-4 border-transparent text-gray-600 hover:text-[#1136cd] hover:border-[#1136cd]'
                        }`}
                    onClick={() => setActiveTab(1)}
                >
                    Location
                </button>
                <button
                    className={`flex-1 py-2  min-w-fit px-5 text-center transition-colors duration-300
            ${activeTab === 2
                            ? 'border-b-4 border-[#1136cd] text-[#1136cd]'
                            : 'border-b-4 border-transparent text-gray-600 hover:text-[#1136cd] hover:border-[#1136cd]'
                        }`}
                    onClick={() => setActiveTab(2)}
                >
                    Site Plan
                </button>
                <button
                    className={`flex-1 py-2 min-w-fit px-5 text-center transition-colors duration-300
            ${activeTab === 3
                            ? 'border-b-4 border-[#1136cd] text-[#1136cd]'
                            : 'border-b-4 border-transparent text-gray-600 hover:text-[#1136cd] hover:border-[#1136cd]'
                        }`}
                    onClick={() => setActiveTab(3)}
                >
                    Amenities
                </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-6">
                {/* Tab 1 Content */}
                {activeTab === 0 && (
                    <div>
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <Building2 size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">Property Type</p>
                                <p className="mb-0 font-bold">{project?.propertyType}</p>

                            </div>



                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <ChartPie size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">Possession Status</p>
                                <p className="mb-0 font-bold">{project?.possessionStatus}</p>

                            </div>
                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <HousePlus size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">Available Units</p>
                                <p className="mb-0 font-bold">{project?.AvailablePlot}</p>

                            </div>
                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <Building size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">BHK</p>
                                <div className="mb-0 font-bold flex gap-2">{project.bhk.map((item) => (
                                    <div key={item.id}>{item?.bhk} BHK /</div>
                                ))}</div>

                            </div>

                            {(project.semifurnishedprice !== "Not Provided" || project.fullfurnishedprice !== "Not Provided") && (
                                <div className="col-span-4 bg-[#fff5e4] rounded-md py-6">
                                    <PriceFilter
                                        bhk={project.bhk}
                                        size={project.projectSize}
                                        semiprice={project.semifurnishedprice}
                                        fullprice={project.fullfurnishedprice}
                                    />
                                </div>
                            )}



                        </div>
                    </div>
                )}

                {/* Tab 2 Content */}
                {activeTab === 1 && (

                    <div className=''
                        dangerouslySetInnerHTML={{ __html: project.map }}>
                    </div>


                )}

                {/* Tab 3 Content */}
                {activeTab === 2 && (
                    <div>
                        <Image
                            src={project?.sitePlan || '/path/to/default-image.jpg'}
                            width={500}
                            height={500}
                            alt="Site Plan"
                        />

                    </div>
                )}

                {/* Tab 4 Content */}
                {activeTab === 3 && (
                    <div>
                       <Aminities data={project?.amenities}/>

                    </div>

                )}
            </div>
        </div>
    );
};

export default Tabs;
