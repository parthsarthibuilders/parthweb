import React from 'react';
import ContactForm from '@/components/single/ContactFormcopy';

export const metadata = {
  title: "Contact Parth Sarthi Builders | Get in Touch",
  description:
    "Contact Parth Sarthi Builders for inquiries, bookings, or assistance. Visit our office or reach out online to connect with the trusted real estate developers of Jaipur.",
};


export default function page() {
    return (
        <div className=" flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full">
                <h2 className="text-4xl font-extrabold text-[#2d2849]">
                    Contact Us
                </h2>
                <p className=" text-sm text-gray-500 mt-2">
                    We’d love to hear from you! Whether you’re buying or selling, get in touch with us.
                </p>
                <div className="bg-white shadow-lg mt-4 rounded-lg p-8">
                    <ContactForm />
                </div>

            </div>
        
        </div>
    );
}
