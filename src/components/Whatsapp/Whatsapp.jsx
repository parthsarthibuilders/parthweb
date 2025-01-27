import React from 'react';
import Image from 'next/image';
import Whatsapplogo from "@/public/logo.png"
export default function Whatsapp() {
  const phoneNumber = '6378822375'; // Replace with your phone number

  const sendMessage = () => {
    const currentPageUrl = encodeURIComponent(window.location.href); // Encode the current page URL
    const message = `Hello, I would like to inquire about your services! Here is the page I am viewing: ${currentPageUrl}`; // Customize the message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex items-center justify-center fixed bottom-0 right-0">
      <button
        onClick={sendMessage}
        className="flex items-center px-4 py-1"
      >
        <Image alt='' src={Whatsapplogo} className=' h-8 w-8' />
      </button>
    </div>
  );
}
