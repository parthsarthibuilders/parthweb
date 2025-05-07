"use client";
import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const MyImageGallery = ({ images }) => {
    const [loadedImages, setLoadedImages] = useState([]);
    const [imageBatch, setImageBatch] = useState(10); // Number of images to load initially

    useEffect(() => {
        // Initialize with a subset of images for faster load time
        setLoadedImages(images.slice(0, imageBatch));
    }, [images, imageBatch]);

    // This function will be called when a slide changes (on user interaction)
    const handleSlideChange = (currentIndex) => {
        // Automatically load more images when the user reaches the end of the gallery
        if (currentIndex === loadedImages.length - 1 && loadedImages.length < images.length) {
            setImageBatch(prevBatch => prevBatch + 10); // Increase the batch size (e.g., 10 more images)
        }
    };

    const galleryItems = loadedImages.map(image => ({
        original: image, // Full image URL
        thumbnail: image, // You can use a different thumbnail image if available
        loading: "lazy"
    }));

    return (
        <div className="my-gallery">
            <ImageGallery
                items={galleryItems}
                showThumbnails={true}
                showFullscreenButton={true}
                showBullets={false}
                showIndex={true}
                autoPlay={false}
                infinite={true}
                thumbnailPosition="bottom"
                slideDuration={450}
                slideInterval={3000}
                onSlide={handleSlideChange} // Trigger image loading on slide change
            />
        </div>
    );
};

export default MyImageGallery;
