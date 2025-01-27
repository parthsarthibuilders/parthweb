"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const JobForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    jobprofile: "",
  });

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  // Fetch job categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/jobcategory");
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Check if all fields are filled and OTP is verified
  useEffect(() => {
    const allFieldsFilled =
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.jobprofile;

    setIsSubmitEnabled(allFieldsFilled && isOtpVerified);
  }, [formData, isOtpVerified]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/contact/otp", { email: formData.email });
      if (response.data.success) {
        toast.success("OTP sent to your email.");
        setIsOtpSent(true);
        setLoading(false);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error sending OTP.");
      console.error("Error sending OTP:", error);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("/api/contact/otp", {
        email: formData.email,
        otp,
      });
      if (response.data.success) {
        toast.success("OTP verified.");
        setIsOtpVerified(true);
        setIsOtpSent(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error verifying OTP.");
      console.error("Error verifying OTP:", error);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setIsSubmitEnabled(false)
    e.preventDefault();
    try {
      // First API: Create the job request
      const createResponse = await axios.post("/api/job/create", formData);
      if (createResponse.data.success) {
        // Second API: Send email
        const emailResponse = await axios.post("/api/contact/sendata", formData);
        if (emailResponse.data.success) {
          toast.success("Job Request Sent Successfully");
        } else {
          toast.error("Job created but failed to send email: " + emailResponse.data.message);
        }
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          jobprofile: "",
        });
        setOtp("");
        setIsOtpSent(false);
        setIsOtpVerified(false);
        setLoading(false); 
        setIsSubmitEnabled(true);
      } else {
        toast.error(createResponse.data.message);
      }
    } catch (error) {
      toast.error("Error processing the request.");
      console.error("Error processing the request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Toaster />

      {/* Full Name */}
      <div className="relative z-0 w-full mb-4 group">
        <input
          type="text"
          name="fullName"
          id="fullName"
          className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
          placeholder=" "
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="fullName"
          className="peer-focus:font-medium absolute mx-1 px-1 text-sm bg-white text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#CC9B18] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Email */}
      <div className="relative z-0 w-full mb-4 group">
        <input
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
          placeholder=" "
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute mx-1 px-1 text-sm bg-white text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#CC9B18] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email <span className="text-red-500">*</span>
        </label>
        {!isOtpVerified && (
          <button
            type="button"
            onClick={sendOtp}
            className="mt-2 text-[#CC9B18] text-sm hover:underline"
          >
            Send OTP
          </button>
        )}
      </div>

      {/* OTP */}
      {isOtpSent && !isOtpVerified && (
        <div className="relative z-0 w-full mb-4 group">
          <input
            type="text"
            name="otp"
            id="otp"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={verifyOtp}
            className="mt-2 text-[#CC9B18] text-sm hover:underline"
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* Other Inputs */}
      <div className="relative z-0 w-full mb-4 group">
        <input
          type="tel"
          name="phone"
          id="phone"
          className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
          placeholder=" "
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute mx-1 px-1 text-sm bg-white text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#CC9B18] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone <span className="text-red-500">*</span>
        </label>
      </div>

      <div className="relative z-0 w-full mb-4 group">
        <select
          className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
          name="jobprofile"
          id="jobprofile"
          value={formData.jobprofile}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Profile *</option>
          {category.map((data) => (
            <option key={data.id} value={data.category}>
              {data.category}
            </option>
          ))}
        </select>
      </div>

      <div className="relative z-0 w-full mb-4 group">
        <input
          type="text"
          name="address"
          id="address"
          className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
          placeholder=" "
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="address"
          className="peer-focus:font-medium absolute bg-white mx-1 px-1 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#CC9B18] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="relative z-0 w-full">
        <button
          type="submit"
          disabled={!isSubmitEnabled}
          className={`w-full py-2 px-3 text-white text-sm rounded-md ${
            isSubmitEnabled
              ? "bg-[#CC9B18] hover:bg-[#CC9B18] focus:ring-2 focus:ring-offset-2"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Wait..." : "Submit Job Request"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
