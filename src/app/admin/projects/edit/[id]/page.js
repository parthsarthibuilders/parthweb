"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import slugify from "slugify";
import dynamic from "next/dynamic";
import Image from "next/image";
// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Disable SSR for this component
});
import 'react-quill/dist/quill.snow.css';

export default function Page({ params }) {
  const id = params.id;
  // State to store form data
  const [formData, setFormData] = useState({
    category: "",
    semifurnishedprice: "",
    fullfurnishedprice: "",
    title: "",
    slug: "",
    content: "",
    location: "",

    projectSize: [{ size: "", image: [] }],
    bhk: [{ bhk: "", image: [] }],
    isFeatured: "false",
    propertyType: "",
    possessionStatus: "",
    AvailablePlot: "",
    map: "",
    logo: "",
    image: "",
    gallery: "",
    sitePlan: "",
    pdf: "",
    seoTitle: "",
    seoDescription: "",
    amenities: {
      gatedSociety: "false",
      powerBackup: "false",
      gym: "false",
      solarPanel: "false",
      openTerraceForParty: "false",
      kidsPlayArea: "false",
      societyTemple: "false",
      reservedParking: "false",
      indoorGames: "false",
      miniTurf: "false",
      campFire: "false",
      intercomFacility: "false",
      liftFacility: "false",
      multiPurposeHall: "false",
      roofTopGarden: "false",
      lavishInterior: "false",
      twoSideOpenBuilding: "false",
      yogaDeck: "false",
      sittingArea: "false",
      waterSupply24x7: "false",
      fireEquipment: "false"
    }
  });

  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [category, setCategory] = useState([])


  useEffect(() => {
    const alldata = async () => {
      try {
        const response = await axios.get('/api/category');
        setCategory(response.data.data);
      } catch (error) {
        console.error('Error fetching data data:', error);
      } finally {
        setLoading(false);
      }
    };

    alldata();
  }, []);

  const getPreviewSrc = (image) => (image instanceof File ? URL.createObjectURL(image) : image);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/projects/findssinglebyid/${id}`);

        setFormData({

          category: res.data.data.category,
          semifurnishedprice: res.data.data.semifurnishedprice,
          fullfurnishedprice: res.data.data.fullfurnishedprice,
          title: res.data.data.title,
          slug: res.data.data.slug,
          content: res.data.data.content,
          location: res.data.data.location,
          projectSize: res.data.data.projectSize.map(item => ({
            size: item.size,
            image: item.image
          })),
          bhk: res.data.data.bhk.map(item => ({
            bhk: item.bhk,
            image: item.image
          })),
          isFeatured: res.data.data.isFeatured,
          propertyType: res.data.data.propertyType,
          possessionStatus: res.data.data.possessionStatus,
          AvailablePlot: res.data.data.AvailablePlot,
          map: res.data.data.map,
          logo: res.data.data.logo,
          image: res.data.data.image,
          gallery: res.data.data.gallery,
          sitePlan: res.data.data.sitePlan,
          pdf: res.data.data.pdf,
          seoTitle: res.data.data.seoTitle,
          seoDescription: res.data.data.seoDescription,

          amenities: {
            gatedSociety: res.data.data.amenities?.gatedSociety ?? false,
            powerBackup: res.data.data.amenities?.powerBackup ?? false,
            gym: res.data.data.amenities?.gym ?? false,
            solarPanel: res.data.data.amenities?.solarPanel ?? false,
            openTerraceForParty: res.data.data.amenities?.openTerraceForParty ?? false,
            kidsPlayArea: res.data.data.amenities?.kidsPlayArea ?? false,
            societyTemple: res.data.data.amenities?.societyTemple ?? false,
            reservedParking: res.data.data.amenities?.reservedParking ?? false,
            indoorGames: res.data.data.amenities?.indoorGames ?? false,
            miniTurf: res.data.data.amenities?.miniTurf ?? false,
            campFire: res.data.data.amenities?.campFire ?? false,
            intercomFacility: res.data.data.amenities?.intercomFacility ?? false,
            liftFacility: res.data.data.amenities?.liftFacility ?? false,
            multiPurposeHall: res.data.data.amenities?.multiPurposeHall ?? false,
            roofTopGarden: res.data.data.amenities?.roofTopGarden ?? false,
            lavishInterior: res.data.data.amenities?.lavishInterior ?? false,
            twoSideOpenBuilding: res.data.data.amenities?.twoSideOpenBuilding ?? false,
            yogaDeck: res.data.data.amenities?.yogaDeck ?? false,
            sittingArea: res.data.data.amenities?.sittingArea ?? false,
            waterSupply24x7: res.data.data.amenities?.waterSupply24x7 ?? false,
            fireEquipment: res.data.data.amenities?.fireEquipment ?? false
          }


        });
      } catch (error) {
        console.error("Error fetching Project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);



  // Handle input change
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "category") {
      // Handle the checkbox (multiple categories)
      setFormData((prev) => {
        const updatedCategories = checked
          ? [...prev.category, value]  // Add the selected category
          : prev.category.filter((id) => id !== value);  // Remove the unselected category

        return {
          ...prev,
          [name]: updatedCategories,  // Update the category array
        };
      });
    } else if (name in formData.amenities) {
      // Handle amenities (boolean values)
      setFormData((prev) => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name]: value === "true", // Convert the string value to a boolean
        },
      }));
    } else {
      // Handle other fields (boolean or standard input)
      const booleanFields = ["isFeatured"]; // List of fields that should be boolean
      setFormData((prev) => ({
        ...prev,
        [name]: booleanFields.includes(name) ? value === "true" : value,
      }));
    }

    // Generate slug for title field
    if (name === "title") {
      generateUniqueSlug(value);
    }
  };



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array for easier manipulation

    switch (e.target.name) {
      case "image":
        // Handle single image upload
        if (files[0]) {
          setFormData((prev) => ({ ...prev, image: files[0] }));
        }
        break;

      case "logo":
        // Handle single logo upload
        if (files[0]) {
          setFormData((prev) => ({ ...prev, logo: files[0] }));
        }
        break;

      case "gallery":
        // Handle multiple images upload
        if (files.length > 0) {
          setFormData((prev) => ({
            ...prev,
            gallery: [...(prev.gallery || []), ...files],
          }));
        }
        break;

      case "sitePlan":
        // Handle site plan upload (single file)
        if (files[0]) {
          setFormData((prev) => ({ ...prev, sitePlan: files[0] }));
        }
        break;

      case "pdf":
        // Handle PDF file upload (single file)
        if (files[0]) {
          setFormData((prev) => ({ ...prev, pdf: files[0] }));
        }
        break;

      default:
        console.warn("Unhandled file input type:", e.target.name);
    }
  };


  // Function to generate a unique slug
  const generateUniqueSlug = async (title) => {
    if (!title) return;

    // Generate slug using slugify
    let newSlug = slugify(title, { lower: true, strict: true });

    // Check if slug already exists in the database
    try {
      const { data } = await axios.get(`/api/projects/check-slug/${newSlug}`);

      // If slug exists, append suffix until it's unique
      let suffix = 1;
      if (data.success) {
        newSlug = `${slugify(title, { lower: true, strict: true })}-${suffix}`;
        const { data: newCheck } = await axios.get(`/api/projects/check-slug/${newSlug}`);

        suffix++;
      }

      // Update slug in the form data
      setFormData((prevState) => ({ ...prevState, slug: newSlug }));
    } catch (err) {
      console.error("Error generating slug", err);
    }
  };

  // Validate form
  useEffect(() => {
    setIsFormValid(!!formData.title && !!formData.slug);
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image; // Preserve existing image URL if available
      let logoUrl = formData.logo;
      let galleryUrls = formData.gallery || []; // Preserve existing gallery URLs
      let sitePlanUrl = formData.sitePlan; // Preserve existing site plan URL


      // Upload single image if it's a new file
      if (formData.image instanceof File) {
        const formDataImage = new FormData();
        formDataImage.append("file", formData.image);
        const uploadResponse = await axios.post("/api/upload", formDataImage, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl =  uploadResponse.data.file;
      }


      if (formData.logo instanceof File) {
        const formDatalogo = new FormData();
        formDatalogo.append("file", formData.logo);
        const uploadResponse = await axios.post("/api/upload", formDatalogo, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        logoUrl =  uploadResponse.data.file;
      }

      // Upload new gallery images only
      if (formData.gallery) {
        const newGalleryFiles = formData.gallery.filter((item) => item instanceof File);
      
        if (newGalleryFiles.length > 0) {
          const uploadPromises = newGalleryFiles.map((file) => {
            const formDataGallery = new FormData();
            formDataGallery.append("file", file);
            return axios.post("/api/upload", formDataGallery, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          });
      console.log(uploadPromises,"uplod")
          const uploadResponses = await Promise.all(uploadPromises);
          const newGalleryUrls = uploadResponses.map((res) => res.data.file);
      
          // Combine non-File (existing) URLs and new uploads
          const existingUrls = formData.gallery.filter((item) => typeof item === "string");
          galleryUrls = [...existingUrls, ...newGalleryUrls];
        } else {
          // Only existing URLs, no new files
          galleryUrls = formData.gallery.filter((item) => typeof item === "string");
        }
      }
      

      // Upload site plan if it's a new file
      if (formData.sitePlan instanceof File) {
        const formDataSitePlan = new FormData();
        formDataSitePlan.append("file", formData.sitePlan);
        const sitePlanResponse = await axios.post("/api/upload", formDataSitePlan, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        sitePlanUrl = sitePlanResponse.data.file;
      }

      // Submit updated data
      const updatedFormData = {
        ...formData,
        image: imageUrl,
        logo: logoUrl,
        gallery: galleryUrls, // Array of updated gallery URLs
        sitePlan: sitePlanUrl, // Updated site plan URL

      };

      const response = await axios.patch("/api/projects/update", { id: id, ...updatedFormData });

      if (response.status === 200) {
        toast.success("Project successfully updated!");
      } else {
        toast.error("Failed to update project! Unexpected status code.");
      }
    } catch (err) {
      console.error("Failed to update project:", err.response?.data || err.message);
      toast.error(`Failed to update project: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };




  // Handle change for bhk input
  const handleBHKChange = (e, index) => {
    const updatedBHK = [...formData.bhk];
    updatedBHK[index].bhk = e.target.value;
    setFormData({ ...formData, bhk: updatedBHK });
  };

  const handleProjectSizeChange = (e, index) => {
    const updatedProjectSize = [...formData.projectSize];
    updatedProjectSize[index].size = e.target.value;
    setFormData({ ...formData, projectSize: updatedProjectSize });
  };

  // Add a new bhk entry
  const addBHK = () => {
    setFormData({
      ...formData,
      bhk: [...formData.bhk, { bhk: '', image: [] }],
    });
  };

  // Add a new projectSize entry
  const addProjectSize = () => {
    setFormData({
      ...formData,
      projectSize: [...formData.projectSize, { size: '', image: [] }],
    });
  };

  // Remove a specific bhk entry
  const removeBHK = (index) => {
    const updatedBHK = formData.bhk.filter((_, i) => i !== index);
    setFormData({ ...formData, bhk: updatedBHK });
  };

  // Remove a specific projectSize entry
  const removeProjectSize = (index) => {
    const updatedProjectSize = formData.projectSize.filter((_, i) => i !== index);
    setFormData({ ...formData, projectSize: updatedProjectSize });
  };

  const addImageToBHK = (index) => {
    setFormData((prevFormData) => {
      const updatedBhk = [...prevFormData.bhk];

      const newImages = prevFormData.gallery.filter(
        (image) => !updatedBhk[index].image.includes(image)
      );

      updatedBhk[index].image = [...updatedBhk[index].image, ...newImages];

      return { ...prevFormData, bhk: updatedBhk };
    });
  };


  const addImageToProjectSize = (index) => {
    setFormData((prevFormData) => {
      const updatedProjectSize = [...prevFormData.projectSize];
      const newImages = prevFormData.gallery.filter(
        (image) => !updatedProjectSize[index].image.includes(image)
      );
      updatedProjectSize[index].image = [...updatedProjectSize[index].image, ...newImages];

      return { ...prevFormData, projectSize: updatedProjectSize };
    });
  };


  const removeImage = (bhkIndex, imgIndex) => {
    setFormData((prevFormData) => {
      const updatedBhk = prevFormData.bhk.map((bhkItem, index) => {
        if (index === bhkIndex) {
          return {
            ...bhkItem,
            image: bhkItem.image.filter((_, i) => i !== imgIndex),
          };
        }
        return bhkItem;
      });
      return { ...prevFormData, bhk: updatedBhk };
    });
  };
  const removeProjectSizeImage = (sizeIndex, imgIndex) => {
    setFormData((prevFormData) => {
      const updatedProjectSize = prevFormData.projectSize.map((sizeItem, index) => {
        if (index === sizeIndex) {
          return {
            ...sizeItem,
            image: sizeItem.image.filter((_, i) => i !== imgIndex),
          };
        }
        return sizeItem;
      });
      return { ...prevFormData, projectSize: updatedProjectSize };
    });
  };


  const handleEditorChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  return (
    <div className="container lg:w-[90%] mx-auto py-5">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-3">
          <Link href={'/admin/projects'}>
            <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2">
              <ArrowLeft size={16} className='me-1' /> All Projects
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-[#29234b] text-white px-7 py-3 flex justify-between w-full">
          <h1 className="text-lg font-bold">Update Project</h1>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-3 space-y-3">

          <div className=" grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">

              <div className="grid grid-cols-12 gap-4">
                {/* Title */}
                <div className="sm:col-span-6 col-span-12">
                  <label htmlFor="title" className="block text-[12px] text-gray-700">
                    Title <span className=" text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter Title"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>

                {/* Slug (Read-Only Field) */}
                <div className="sm:col-span-6 col-span-12">
                  <label htmlFor="slug" className="block text-[12px] text-gray-700">
                    Slug <span className=" text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="Enter Page Slug"
                    className="block w-full px-2 py-2 text-gray-500 bg-gray-100 border border-gray-200 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-6 col-span-12">
                  <label htmlFor="seoTitle" className="block text-[12px] text-gray-700">
                    Seo Title
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    placeholder="Enter Page Seo Title"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-6 col-span-12">
                  <label htmlFor="seoDescription" className="block text-[12px] text-gray-700">
                    Seo Description
                  </label>
                  <input
                    type="text"
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    placeholder="Enter Page Seo Description"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>


                <div className="col-span-12">
                  <label htmlFor="location" className="block text-[12px] text-gray-700">
                    Location <span className=" text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location (use Embed code)"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>

                <div className="col-span-12">
                  <label htmlFor="map" className="block text-[12px] text-gray-700">
                    Map (use Embed code)
                  </label>
                  <input
                    type="text"
                    name="map"
                    value={formData.map}
                    onChange={handleChange}
                    placeholder="Map (use Embed code)"
                    className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                  />
                </div>

                <div className="col-span-12">

                  <div className="col-span-12">
                    <label htmlFor="pdf" className="block text-[12px] text-gray-700">
                      Brochure (use Link)
                    </label>
                    <input
                      type="text"
                      name="pdf"
                      value={formData.pdf}
                      onChange={handleChange}
                      placeholder="Pdf (use Link)"
                      className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                    />
                  </div>
                </div>



                {/* Content */}
                <div className="col-span-12">
                  <label htmlFor="content" className="block text-[12px] text-gray-700">
                    Content <span className=" text-red-600">*</span>
                  </label>
                  <ReactQuill theme="snow" className=" h-44 mb-10" value={formData.content} onChange={(value) => handleEditorChange('content', value)} />
                </div>
                <div className="col-span-12">


                  <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">
                    Amenities <span className="text-red-600">*</span>
                  </label>
                  <div className="  p-4 rounded-lg shadow-md  grid grid-cols-4 gap-4">
                    {Object.keys(formData.amenities).map((amenityKey) => (
                      <div key={amenityKey} className=" bg-gray-100 p-2 rounded-md">
                        <label className="block  text-[12px] ">
                          {amenityKey.replace(/([A-Z])/g, ' $1').toUpperCase()} {/* Format the key to a more readable label */}
                        </label>
                        <div className="flex space-x-6 mt-2">
                          <label className="flex items-center text-gray-600 cursor-pointer hover:text-blue-600">
                            <input
                              type="radio"
                              name={amenityKey}
                              value="true" // String "true"
                              checked={formData.amenities[amenityKey] === true}
                              onChange={handleChange}
                              className="text-blue-500 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full transition duration-200 ease-in-out"
                            />
                            <span className="text-[12px]">Yes</span>
                          </label>
                          <label className="flex items-center text-gray-600 cursor-pointer hover:text-blue-600">
                            <input
                              type="radio"
                              name={amenityKey}
                              value="false" // String "false"
                              checked={formData.amenities[amenityKey] === false}
                              onChange={handleChange}
                              className="text-blue-500 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full transition duration-200 ease-in-out"
                            />
                            <span className="text-[12px]">No</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-12">
                  <label htmlFor="logo" className="block text-[12px] text-gray-700">
                    Logo Image
                  </label>

                  {formData.logo ? (
                    <div className="relative group">
                      <Image
                        src={getPreviewSrc(formData.logo)}
                        alt="logo Preview"
                        height={100}
                        width={100}
                        className="w-full h-40 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.logo instanceof File) URL.revokeObjectURL(formData.logo);
                          setFormData((prev) => ({ ...prev, logo: "" }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        accept="application/pdf,image/*,image/heic"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="logo"
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                      >
                        Click to upload an logo
                      </label>
                    </div>
                  )}
                </div>




                {/* Feature Image */}
                <div className="col-span-12">
                  <label htmlFor="image" className="block text-[12px] text-gray-700">
                    Feature Image
                  </label>

                  {formData.image ? (
                    <div className="relative group">
                      <Image
                        src={getPreviewSrc(formData.image)}
                        alt="Feature Preview"
                        height={100}
                        width={100}
                        className="w-full h-40 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.image instanceof File) URL.revokeObjectURL(formData.image);
                          setFormData((prev) => ({ ...prev, image: "" }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="application/pdf,image/*,image/heic"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                      >
                        Click to upload an image
                      </label>
                    </div>
                  )}
                </div>



                <div className="col-span-12">
                  {/* Gallery Images */}
                  <label htmlFor="gallery" className="block text-[12px] text-gray-700">
                    Gallery Images
                  </label>

                  {formData.gallery && formData.gallery.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.gallery.map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={image instanceof File ? URL.createObjectURL(image) : image}
                            alt={`Gallery Preview ${index + 1}`}
                            height={100}
                            width={100}
                            className="w-full h-40 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((_, i) => i !== index),
                              }))
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                      <input
                        type="file"
                        id="gallery"
                        name="gallery"
                        accept="application/pdf,image/*,image/heic"
                        multiple
                        onChange={(e) => handleFileChange(e, "gallery")}
                        className="hidden"
                      />
                      <label
                        htmlFor="gallery"
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                      >
                        Click to upload Gallery Images
                      </label>
                    </div>
                  )}
                </div>


                <div className="col-span-12">
                  <label htmlFor="sitePlan" className="block text-[12px] text-gray-700">
                    Site Plan
                  </label>

                  {formData.sitePlan ? (
                    <div className="relative group">
                      <Image
                        src={getPreviewSrc(formData.sitePlan)}

                        alt="Feature Preview"
                        height={100}
                        width={100}
                        className="w-full h-40 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, sitePlan: "" }))}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-75 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 p-4 rounded text-center">
                      <input
                        type="file"
                        id="sitePlan"
                        name="sitePlan"
                        accept="application/pdf,image/*,image/heic" // Adjust MIME types as needed
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="sitePlan"
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                      >
                        Click to upload a Site Plan
                      </label>
                    </div>
                  )}
                </div>









              </div>
            </div>
            <div className="lg:col-span-1 gap-4 flex flex-col">

              <div>
                {formData.bhk.map((bhkItem, index) => (
                  <div key={`bhk-${index}`} className="sm:col-span-6 col-span-12">
                    {/* Input for BHK */}
                    <label htmlFor={`bhk-${index}`} className="block text-[12px] text-gray-700">
                      BHK
                    </label>
                    <input
                      type="number"
                      name={`bhk-${index}`}
                      value={bhkItem.bhk}
                      onChange={(e) => handleBHKChange(e, index)}
                      placeholder="Enter BHK"
                      className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                    />

                    {/* Display existing images */}
                    <div className="mt-2">
                      <p className="text-[12px] text-gray-700">Images:</p>
                      {bhkItem.image.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {bhkItem.image.map((img, imgIndex) => (
                            <div key={imgIndex} className="relative">
                              <Image
                                src={img}
                                alt={`BHK Image ${imgIndex + 1}`}
                                height={100}
                                width={100}
                                className="w-full h-auto rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index, imgIndex)}
                                className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[12px] text-gray-500">No images added yet.</p>
                      )}
                    </div>

                    {/* Button to add images */}
                    <button
                      type="button"
                      onClick={() => addImageToBHK(index)}
                      className="text-blue-500 text-xs mt-2"
                    >
                      Add Images from Gallery
                    </button>

                    {/* Button to remove BHK */}
                    {formData.bhk.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBHK(index)}
                        className="text-red-500 text-xs mt-2"
                      >
                        Remove BHK
                      </button>
                    )}
                  </div>
                ))}

                {/* Button to add more BHK */}
                <button
                  type="button"
                  onClick={addBHK}
                  className="text-blue-500 text-xs mt-2"
                >
                  Add More BHK
                </button>
              </div>

              <div>
                {formData.projectSize.map((projectSizeItem, index) => (
                  <div key={`projectSize-${index}`} className="sm:col-span-6 col-span-12">
                    {/* Input for Project Size */}
                    <label htmlFor={`projectSize-${index}`} className="block text-[12px] text-gray-700">
                      Project Size
                    </label>
                    <input
                      type="number"
                      name={`projectSize-${index}`}
                      value={projectSizeItem.size}
                      onChange={(e) => handleProjectSizeChange(e, index)}
                      placeholder="Enter project size"
                      className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                    />

                    {/* Display existing images */}
                    <div className="mt-2">
                      <p className="text-[12px] text-gray-700">Images:</p>
                      {projectSizeItem.image.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {projectSizeItem.image.map((img, imgIndex) => (
                            <div key={imgIndex} className="relative">
                              <Image
                                src={img}
                                height={100}
                                width={100}
                                alt={`Project Size Image ${imgIndex + 1}`}
                                className="w-full h-auto rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeProjectSizeImage(index, imgIndex)}
                                className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[12px] text-gray-500">No images added yet.</p>
                      )}
                    </div>

                    {/* Button to add images */}
                    <button
                      type="button"
                      onClick={() => addImageToProjectSize(index)}
                      className="text-blue-500 text-xs mt-2"
                    >
                      Add Images from Gallery
                    </button>

                    {/* Button to remove Project Size */}
                    {formData.projectSize.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProjectSize(index)}
                        className="text-red-500 text-xs mt-2"
                      >
                        Remove Project Size
                      </button>
                    )}
                  </div>
                ))}

                {/* Button to add more Project Sizes */}
                <button
                  type="button"
                  onClick={addProjectSize}
                  className="text-blue-500 text-xs mt-2"
                >
                  Add More Project Size
                </button>
              </div>





              <div className="col-span-12">
                <label htmlFor="possessionStatus" className="block text-[12px] text-gray-700">
                  Possession Status <span className=" text-red-600">*</span>
                </label>
                <select
                  name="possessionStatus"
                  value={formData.possessionStatus}
                  onChange={handleChange}
                  className="block w-full px-2 py-2 text-gray-500  border border-gray-200 sm:text-sm"
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Sold Out">Sold Out</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Possession Offered">Possession Offered</option>

                </select>
              </div>


              <div className="col-span-12">
                <label htmlFor="category" className="block text-[12px] text-gray-700">
                  Category <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2 bg-gray-100 p-2 rounded-md">
                  {category.map((cat) => (
                    <div key={cat._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${cat._id}`}
                        name="category"
                        value={cat._id}
                        checked={formData.category.includes(cat._id)}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${cat._id}`} className="text-xs text-gray-600">
                        {cat.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>




              <div className="col-span-12">
                <label htmlFor="propertyType" className="block text-[12px] text-gray-700">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="block w-full px-2 py-2 text-gray-500  border border-gray-200 sm:text-sm"
                >
                  <option value="" disabled>Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div className="sm:col-span-6 col-span-12">
                <label htmlFor="semifurnishedprice" className="block text-[12px] text-gray-700">
                  Semi Furnished price <span className=" text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="semifurnishedprice"
                  value={formData.semifurnishedprice}
                  onChange={handleChange}
                  placeholder="Enter Semifurnished price"
                  className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6 col-span-12">
                <label htmlFor="fullfurnishedprice" className="block text-[12px] text-gray-700">
                  Full Furnished price <span className=" text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="fullfurnishedprice"
                  value={formData.fullfurnishedprice}
                  onChange={handleChange}
                  placeholder="Enter Fullfurnished price"
                  className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                />
              </div>



              <div className="col-span-12">
                <label htmlFor="isFeatured" className="block text-[12px] text-gray-700">
                  Is Featured <span className=" text-red-600">*</span>
                </label>
                <label className="flex items-center text-gray-500 sm:text-sm">
                  <input
                    type="radio"
                    name="isFeatured"
                    value="true" // String "true"
                    checked={formData.isFeatured === true}
                    onChange={handleChange}
                    className="text-blue-500 border-gray-200 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="flex items-center text-gray-500 sm:text-sm">
                  <input
                    type="radio"
                    name="isFeatured"
                    value="false" // String "false"
                    checked={formData.isFeatured === false}
                    onChange={handleChange}
                    className="text-blue-500 border-gray-200 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="ml-2">No</span>
                </label>

              </div>







              <div className="sm:col-span-6 col-span-12">
                <label htmlFor="AvailablePlot" className="block text-[12px] text-gray-700">
                  Available Unit
                </label>
                <input
                  type="number"
                  name="AvailablePlot"
                  value={formData.AvailablePlot}
                  onChange={handleChange}
                  placeholder="Available Plot Number"
                  className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                />
              </div>



            </div>
          </div>
          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`${!isFormValid || loading ? "bg-gray-400" : "bg-[#29234b]"} text-white w-full font-bold py-2 px-4 rounded-md`}
            >
              {loading ? "Submitting..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
