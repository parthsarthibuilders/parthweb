import React, { useState } from 'react';

export default function PriceFilter({ bhk, size, semiprice, fullprice }) {
  const [furnishingType, setFurnishingType] = useState('semi'); // 'semi' or 'full'
  const [selectedSize, setSelectedSize] = useState(size[0]?.size || 0); // Default to the first size if available

  // Calculate the price based on the selected size and furnishing type
  const calculatePrice = () => {
    if (furnishingType === 'semi') {
      return selectedSize * semiprice;
    } else if (furnishingType === 'full') {
      return selectedSize * fullprice;
    }
    return 0;
  };

  return (
    <div className="px-6 py-2 ">
      {calculatePrice() > 0 && (
        <>
      <h1 className="text-xl font-bold text-gray-800 mb-4">Price Filter</h1>


      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Select Size</h2>
        <select
          className="w-full border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-[#DAB221]"
          value={selectedSize}
          onChange={(e) => setSelectedSize(Number(e.target.value))}
          >
          {size.map((data, index) => (
            <option key={index} value={data.size}>
              {data.size} sqft
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Select Furnishing Type</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="furnishing"
              value="semi"
              checked={furnishingType === 'semi'}
              onChange={() => setFurnishingType('semi')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Semi-Furnished</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="furnishing"
              value="full"
              checked={furnishingType === 'full'}
              onChange={() => setFurnishingType('full')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
            <span className="ml-2 text-gray-700">Fully-Furnished</span>
          </label>
        </div>
      </div>


              </>      )}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Price Details</h2>
        <div className=" bg-gradient-to-r from-[#DAB221] to-[#B07C0A] p-4 rounded-lg">
          <p className="text-sm text-white">
            Semi-Furnished Price per sqft: <strong className="text-white"> {semiprice} Psq.ft</strong>
          </p>
          <p className="text-sm text-white">
            Fully-Furnished Price per sqft: <strong className="text-white"> {fullprice} Psq.ft</strong>
          </p>
        </div>
      </div>


      {calculatePrice() > 0 && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Total Price</h2>
          <p className="text-sm text-gray-600">
            Selected Size: <strong className="text-gray-800">{selectedSize} sqft</strong>
          </p>
          <p className="text-sm text-gray-600">
            Furnishing Type: <strong className="text-gray-800">{furnishingType === 'semi' ? 'Semi-Furnished' : 'Fully-Furnished'}</strong>
          </p>
          <p className="text-2xl font-bold text-blue-600 mt-4">
            ₹ {calculatePrice().toLocaleString()}
          </p>
        </div>
      )}

    </div>
  );
}
