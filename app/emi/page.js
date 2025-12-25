"use client";

import { useState } from 'react';
import { Phone, CreditCard, Building2, Globe, QrCode, ExternalLink } from 'lucide-react';

export default function EMIPolicy() {
    const [activeTab, setActiveTab] = useState('offline');

    // Offline (POS) EMI Data
    const offlineEmiData = [
        { bank: "AB Bank", minTrans: "10,000", m3: "4.16%", m6: "6.38%", m9: "7.52%", m12: "8.69%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Al-Arafah", minTrans: "10,000", m3: "4.71%", m6: "5.82%", m9: "6.95%", m12: "8.69%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Brac Bank", minTrans: "10,000", m3: "4.16%", m6: "5.26%", m9: "7.52%", m12: "8.69%", m18: "12.35%", m24: "16.27%", m36: "N/A" },
        { bank: "Bank Asia", minTrans: "10,000", m3: "4.71%", m6: "5.82%", m9: "6.95%", m12: "8.69%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "City Bank", minTrans: "5,000", m3: "4.16%", m6: "5.82%", m9: "6.95%", m12: "8.10%", m18: "11.73%", m24: "15.60%", m36: "24.22%" },
        { bank: "Dhaka Bank", minTrans: "5,000", m3: "3.62%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "11.11%", m24: "14.94%", m36: "23.45%" },
        { bank: "DBBL", minTrans: "10,000", m3: "4.60%", m6: "6.83%", m9: "7.99%", m12: "9.17%", m18: "14.15%", m24: "15.47%", m36: "18.20%" },
        { bank: "Eastern Bank", minTrans: "5,000", m3: "4.16%", m6: "5.26%", m9: "7.52%", m12: "8.69%", m18: "11.73%", m24: "16.27%", m36: "23.45%" },
        { bank: "Islami Bank", minTrans: "3,000", m3: "4.16%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Jamuna Bank", minTrans: "10,000", m3: "4.16%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "11.11%", m24: "14.94%", m36: "N/A" },
        { bank: "Lanka Bangla", minTrans: "10,000", m3: "4.16%", m6: "6.38%", m9: "7.52%", m12: "9.89%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Mutual Trust", minTrans: "5,000", m3: "3.62%", m6: "5.26%", m9: "6.95%", m12: "9.28%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Meghna Bank", minTrans: "5,000", m3: "3.62%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "11.11%", m24: "14.94%", m36: "N/A" },
        { bank: "NCC Bank", minTrans: "3,000", m3: "3.62%", m6: "4.16%", m9: "6.38%", m12: "7.52%", m18: "11.11%", m24: "N/A", m36: "N/A" },
        { bank: "Mercantile Bank", minTrans: "10,000", m3: "4.16%", m6: "5.26%", m9: "7.52%", m12: "8.69%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Midland Bank", minTrans: "5,000", m3: "3.62%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "11.11%", m24: "14.94%", m36: "N/A" },
        { bank: "NRB Commercial", minTrans: "10,000", m3: "3.62%", m6: "5.26%", m9: "6.38%", m12: "8.10%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "NRB Bank", minTrans: "5,000", m3: "3.09%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "12.35%", m24: "14.94%", m36: "19.04%" },
        { bank: "One Bank", minTrans: "5,000", m3: "4.16%", m6: "5.26%", m9: "7.52%", m12: "8.69%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Prime Bank", minTrans: "5,000", m3: "4.16%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Premier Bank", minTrans: "10,000", m3: "4.16%", m6: "5.26%", m9: "6.38%", m12: "8.69%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Pubali Bank", minTrans: "5,000", m3: "4.16%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "11.11%", m24: "14.94%", m36: "N/A" },
        { bank: "Standard Chartered", minTrans: "3,000", m3: "4.16%", m6: "6.38%", m9: "9.28%", m12: "12.35%", m18: "16.27%", m24: "21.95%", m36: "29.87%" },
        { bank: "Standard Bank", minTrans: "5,000", m3: "3.62%", m6: "5.26%", m9: "6.38%", m12: "7.52%", m18: "11.11%", m24: "14.94%", m36: "N/A" },
        { bank: "Southeast Bank", minTrans: "10,000", m3: "4.16%", m6: "5.26%", m9: "7.52%", m12: "9.89%", m18: "13.63%", m24: "19.04%", m36: "25.00%" },
        { bank: "Shahjalal Islami Bank", minTrans: "5,000", m3: "4.71%", m6: "5.26%", m9: "6.95%", m12: "9.28%", m18: "11.11%", m24: "14.28%", m36: "N/A" },
        { bank: "Social Islami Bank", minTrans: "5,000", m3: "4.71%", m6: "5.26%", m9: "6.95%", m12: "9.28%", m18: "11.11%", m24: "14.28%", m36: "N/A" },
        { bank: "SBAC", minTrans: "3,000", m3: "3.62%", m6: "5.26%", m9: "6.38%", m12: "8.69%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Trust Bank", minTrans: "10,000", m3: "4.16%", m6: "5.82%", m9: "7.52%", m12: "9.28%", m18: "13.63%", m24: "17.64%", m36: "23.45%" },
        { bank: "Modhumoti Bank", minTrans: "5,000", m3: "3.62%", m6: "5.26%", m9: "6.38%", m12: "8.69%", m18: "11.11%", m24: "14.94%", m36: "N/A" },
        { bank: "UCBL", minTrans: "10,000", m3: "3.30%", m6: "5.48%", m9: "7.75%", m12: "9.52%", m18: "13.63%", m24: "17.64%", m36: "N/A" },
        { bank: "Citizens Bank", minTrans: "5,000", m3: "4.16%", m6: "5.26%", m9: "7.52%", m12: "8.69%", m18: "N/A", m24: "N/A", m36: "N/A" },
        { bank: "Commercial Bank of Ceylon", minTrans: "5,000", m3: "5.26%", m6: "7.52%", m9: "9.89%", m12: "11.73%", m18: "14.94%", m24: "19.04%", m36: "N/A" },
    ];

    // Online (Website) EMI Data
    const onlineEmiData = [
        { bank: "Bank Asia", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "Dhaka Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "N/A", m24: "N/A", m30: "N/A", m36: "N/A" },
        { bank: "DBBL", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "Eastern Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "Jamuna Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "Lanka Bangla", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "Mutual Trust Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "Midland Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "Meghna Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "NRB Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "NCC Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "Standard Chartered", m3: "6.19%", m6: "8.38%", m9: "11.26%", m12: "14.29%", m18: "18.17%", m24: "23.77%", m30: "N/A", m36: "N/A" },
        { bank: "Standard Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "SBAC", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "Southeast Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "22.32%", m36: "26.78%" },
        { bank: "UCBL", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "N/A", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "Exim Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "N/A", m24: "N/A", m30: "N/A", m36: "N/A" },
        { bank: "Shahjalal Islami Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "N/A", m24: "N/A", m30: "N/A", m36: "N/A" },
        { bank: "Premier Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "N/A", m24: "N/A", m30: "N/A", m36: "N/A" },
        { bank: "Al-Arafah Islami Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "AB Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "Prime Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "NRBC Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "CBBL", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "Trust Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "One Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "N/A", m24: "N/A", m30: "N/A", m36: "N/A" },
        { bank: "Mercantile Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
        { bank: "City Bank (AMEX)", m3: "6.72%", m6: "8.34%", m9: "10.58%", m12: "12.92%", m18: "16.62%", m24: "21.97%", m30: "23.39%", m36: "27.85%" },
        { bank: "Citizens Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "N/A", m24: "N/A", m30: "N/A", m36: "N/A" },
        { bank: "Shimanto Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "Pubali Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "Modhumoti Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "N/A" },
        { bank: "Islami Bank", m3: "5.65%", m6: "7.27%", m9: "9.51%", m12: "11.85%", m18: "15.55%", m24: "20.90%", m30: "N/A", m36: "26.78%" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-[#103E34] text-white py-12">
                <div className="container max-w-6xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">EMI & Payment Policy</h1>
                    <p className="text-white/80 text-lg">Easy Monthly Installment options for your convenience</p>
                </div>
            </div>

            <div className="container max-w-6xl py-8 md:py-12">
                {/* Contact Banner */}
                {/* <div className="bg-[#FCB042]/10 border border-[#FCB042] rounded-xl p-4 md:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <Phone className="h-8 w-8 text-[#FCB042] flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-[#103E34]">Need Help with EMI or Payment?</p>
                        <p className="text-gray-600 text-sm">For any queries, concerns, or suggestions regarding EMI and Payment Policy, contact us:</p>
                        <a href="tel:09638148148" className="text-[#FCB042] font-bold text-lg hover:underline">09638-148148</a>
                    </div>
                </div> */}

                {/* Important Notice */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-6 mb-8">
                    <p className="text-red-700 font-medium">
                        <strong>Important:</strong> For both POS and Online payments, only domestic (Bangladeshi) bank cards are accepted. International cards are not supported.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('offline')}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${activeTab === 'offline'
                            ? 'bg-[#103E34] text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-[#103E34]'
                            }`}
                    >
                        <Building2 className="h-5 w-5" />
                        Offline Shop (POS)
                    </button>
                    <button
                        onClick={() => setActiveTab('online')}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${activeTab === 'online'
                            ? 'bg-[#103E34] text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-[#103E34]'
                            }`}
                    >
                        <Globe className="h-5 w-5" />
                        Online Shop (Website)
                    </button>
                </div>

                {/* Offline Shop EMI Table */}
                {activeTab === 'offline' && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                        <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-xl font-bold text-[#103E34] mb-2">Offline Shop (POS) EMI Rates</h2>
                            <p className="text-gray-600 text-sm">Credit card EMI charges applicable at our physical stores</p>
                            <p className="text-orange-600 text-sm mt-2 font-medium">
                                * Normal Transaction: 1.00% - 2.00% charge (depends on Card Network) applies for any POS payment
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#103E34] text-white">
                                    <tr>
                                        <th className="text-left p-3 font-semibold sticky left-0 bg-[#103E34] z-10">Bank Name</th>
                                        <th className="text-center p-3 font-semibold whitespace-nowrap">Min. Trans.</th>
                                        <th className="text-center p-3 font-semibold">3M</th>
                                        <th className="text-center p-3 font-semibold">6M</th>
                                        <th className="text-center p-3 font-semibold">9M</th>
                                        <th className="text-center p-3 font-semibold">12M</th>
                                        <th className="text-center p-3 font-semibold">18M</th>
                                        <th className="text-center p-3 font-semibold">24M</th>
                                        <th className="text-center p-3 font-semibold">36M</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offlineEmiData.map((row, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-3 font-medium text-[#103E34] sticky left-0 bg-inherit whitespace-nowrap">{row.bank}</td>
                                            <td className="p-3 text-center text-gray-600">৳{row.minTrans}</td>
                                            <td className={`p-3 text-center ${row.m3 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m3}</td>
                                            <td className={`p-3 text-center ${row.m6 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m6}</td>
                                            <td className={`p-3 text-center ${row.m9 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m9}</td>
                                            <td className={`p-3 text-center ${row.m12 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m12}</td>
                                            <td className={`p-3 text-center ${row.m18 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m18}</td>
                                            <td className={`p-3 text-center ${row.m24 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m24}</td>
                                            <td className={`p-3 text-center ${row.m36 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m36}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Online Shop EMI Table */}
                {activeTab === 'online' && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                        <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-xl font-bold text-[#103E34] mb-2">Online Shop (Website) EMI Rates</h2>
                            <p className="text-gray-600 text-sm">Credit card EMI charges applicable for online purchases</p>
                            <p className="text-green-600 text-sm mt-2 font-medium">
                                ✓ No POS charge will be applied on EMI payments
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#103E34] text-white">
                                    <tr>
                                        <th className="text-left p-3 font-semibold sticky left-0 bg-[#103E34] z-10">Bank Name</th>
                                        <th className="text-center p-3 font-semibold">3M</th>
                                        <th className="text-center p-3 font-semibold">6M</th>
                                        <th className="text-center p-3 font-semibold">9M</th>
                                        <th className="text-center p-3 font-semibold">12M</th>
                                        <th className="text-center p-3 font-semibold">18M</th>
                                        <th className="text-center p-3 font-semibold">24M</th>
                                        <th className="text-center p-3 font-semibold">30M</th>
                                        <th className="text-center p-3 font-semibold">36M</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {onlineEmiData.map((row, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-3 font-medium text-[#103E34] sticky left-0 bg-inherit whitespace-nowrap">{row.bank}</td>
                                            <td className={`p-3 text-center ${row.m3 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m3}</td>
                                            <td className={`p-3 text-center ${row.m6 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m6}</td>
                                            <td className={`p-3 text-center ${row.m9 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m9}</td>
                                            <td className={`p-3 text-center ${row.m12 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m12}</td>
                                            <td className={`p-3 text-center ${row.m18 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m18}</td>
                                            <td className={`p-3 text-center ${row.m24 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m24}</td>
                                            <td className={`p-3 text-center ${row.m30 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m30}</td>
                                            <td className={`p-3 text-center ${row.m36 === 'N/A' ? 'text-gray-400' : 'text-gray-700'}`}>{row.m36}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Payment Charges Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* QR / Link Payment */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#103E34]/10 rounded-lg">
                                <QrCode className="h-6 w-6 text-[#103E34]" />
                            </div>
                            <h3 className="text-lg font-bold text-[#103E34]">QR / Link Payment Charges</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">VISA / MasterCard</span>
                                <span className="font-bold text-[#FCB042]">2.04%</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">City Bank (AMEX)</span>
                                <span className="font-bold text-[#FCB042]">3.63%</span>
                            </div>
                        </div>
                    </div>

                    {/* Website Direct Payment */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#103E34]/10 rounded-lg">
                                <CreditCard className="h-6 w-6 text-[#103E34]" />
                            </div>
                            <h3 className="text-lg font-bold text-[#103E34]">Website Direct Payment Charges</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">VISA / MasterCard</span>
                                <span className="font-bold text-[#FCB042]">2.56%</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">City Bank (AMEX)</span>
                                <span className="text-gray-400 text-sm">Not available</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                    <p className="text-gray-600 text-sm">
                        EMI rates and terms are subject to change. Please contact your bank for the most up-to-date information.
                        <br />
                        <span className="text-[#103E34] font-medium">DIZMO</span> reserves the right to modify this policy at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}
