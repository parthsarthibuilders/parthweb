import React from 'react';
import {
  Home,
  PartyPopper,
  Heart,
  LandPlot,
  CableCar,
  Boxes,
  DoorClosed,
  FireExtinguisher,
  Dumbbell,
  Gamepad,
  Blocks,
  Waves,
  Leaf,
  Building2,
  SunSnow,
  Church,
  RockingChair,
  TreePalm,
  ParkingCircle,
  BatteryFull
} from 'lucide-react';

export default function Amenities({ data }) {
  // Mapping amenities to icons
  const amenityIcons = {
    campFire: <FireExtinguisher className="text-orange-500" />,
    fireEquipment: <FireExtinguisher className="text-red-500" />,
    gatedSociety: <DoorClosed className="text-gray-600" />,
    gym: <Dumbbell className="text-blue-600" />,
    indoorGames: <Gamepad className="text-purple-600" />,
    intercomFacility: <Home className="text-green-600" />,
    kidsPlayArea: <Blocks className="text-yellow-500" />,
    lavishInterior: <Heart className="text-pink-500" />,
    liftFacility: <CableCar className="text-indigo-600" />,
    miniTurf: <LandPlot className="text-lime-500" />,
    multiPurposeHall: <Boxes className="text-teal-500" />,
    openTerraceForParty: <PartyPopper className="text-orange-600" />,
    powerBackup: <BatteryFull className="text-green-500" />,
    reservedParking: <ParkingCircle className="text-gray-700" />,
    roofTopGarden: <TreePalm className="text-emerald-500" />,
    sittingArea: <RockingChair className="text-brown-500" />,
    societyTemple: <Church className="text-indigo-700" />,
    solarPanel: <SunSnow className="text-yellow-400" />,
    twoSideOpenBuilding: <Building2 className="text-cyan-600" />,
    waterSupply24x7: <Waves className="text-blue-500" />,
    yogaDeck: <Leaf className="text-green-400" />
  };

  // List of amenities with icons
  const amenities = Object.entries(data)
    .map(([key, value]) => {
      if (value && amenityIcons[key]) {
        return (
          <div
            key={key}
            className="flex flex-col items-center p-4 bg-gradient-to-r from-white to-gray-100 shadow-md rounded-2xl text-center border border-gray-200"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2 bg-gray-50 rounded-full border border-gray-300">
              {amenityIcons[key]}
            </div>
            <span className="text-sm ">
              {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </span>
          </div>
        );
      }
      return null;
    })
    .filter(Boolean); // Remove null values

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">Amenities</h3>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {amenities.length > 0 ? (
          amenities
        ) : (
          <div className="text-center text-gray-500">No amenities available</div>
        )}
      </div>
    </div>
  );
}
