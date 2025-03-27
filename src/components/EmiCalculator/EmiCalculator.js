import React, { useState } from 'react';

export default function EmiCalculator() {
    const [amount, setAmount] = useState(5000000);
    const [interest, setInterest] = useState(7.5);
    const [tenure, setTenure] = useState(240);

    const calculateEMI = () => {
        const monthlyInterest = (interest / 100) / 12;
        const emi = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, tenure)) /
            (Math.pow(1 + monthlyInterest, tenure) - 1);
        return parseFloat(emi.toFixed(2));
    };

    const emi = calculateEMI();
    const totalPayment = (emi * tenure).toFixed(2);
    const totalInterest = (totalPayment - amount).toFixed(2);
    const tenureYears = Math.floor(tenure / 12);
    const tenureMonths = tenure % 12;

    return (
        <div className="mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 border">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">EMI Calculator</h2>

            {/* Loan Amount Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">Loan Amount</label>
                <div className="text-lg font-semibold text-gray-700 mb-2">₹{amount.toLocaleString()}</div>
                <input
                    type="range"
                    min="100000" max="20000000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#DAB221]"
                />
            </div>

            {/* Interest Rate Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">Interest Rate</label>
                <div className="text-lg font-semibold text-gray-700 mb-2">{interest}%</div>
                <input
                    type="range"
                    min="5" max="20" step="0.1"
                    value={interest}
                    onChange={(e) => setInterest(Number(e.target.value))}
                    className="w-full accent-[#DAB221]"
                />
            </div>

            {/* Tenure Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">Loan Tenure</label>
                <div className="text-lg font-semibold text-gray-700 mb-2">{tenure} months ({tenureYears} years {tenureMonths} months)</div>
                <input
                    type="range"
                    min="60" max="360"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full accent-[#DAB221]"
                />
            </div>

            {/* EMI Calculation Result */}
            <div className="text-xl font-semibold text-center bg-[#DAB221] text-white p-4 rounded-lg shadow-md">
                Monthly EMI: ₹{emi.toLocaleString()}
            </div>

            {/* Summary Details */}
            <div className="mt-6 text-md bg-gray-100 text-gray-700 p-5 rounded-lg shadow-sm">
                <div className='mb-2 font-semibold text-lg'>Principal Amount: <span className="text-gray-700">₹{amount.toLocaleString()}</span></div>
                <div className='mb-2 font-semibold text-lg'>Total Interest: <span className="text-gray-700">₹{totalInterest.toLocaleString()}</span></div>
                <div className='font-semibold text-lg'>Total Payment: <span className="text-gray-700">₹{totalPayment.toLocaleString()}</span></div>
            </div>
        </div>
    );
}
