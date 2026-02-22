"use client";

import { useState } from "react";
import { FileText, Gift, Truck, CreditCard, X, ShieldCheck, CheckCircle2, Clock, MapPin } from "lucide-react";

// EMI Calculator Component
function EMICalculator({ currentPrice, bankEmiData }) {
    const [selectedBank, setSelectedBank] = useState(bankEmiData[0]);
    const [customAmount, setCustomAmount] = useState(currentPrice);

    // Calculate EMI for a given price, months, and charge percentage
    const calculateEMI = (price, months, chargePercent) => {
        if (!chargePercent) return null;
        const chargeAmount = (price * chargePercent) / 100;
        const totalAmount = price + chargeAmount;
        const monthlyEMI = totalAmount / months;
        return {
            emi: monthlyEMI,
            charge: chargePercent,
            effectiveCost: totalAmount
        };
    };

    // Get EMI plans for selected bank based on customAmount
    const getEmiPlans = (bank) => {
        const plans = [];
        const months = [
            { key: 'm3', label: 3 },
            { key: 'm6', label: 6 },
            { key: 'm9', label: 9 },
            { key: 'm12', label: 12 },
            { key: 'm18', label: 18 },
            { key: 'm24', label: 24 },
            { key: 'm36', label: 36 }
        ];

        months.forEach(({ key, label }) => {
            if (bank[key]) {
                const calc = calculateEMI(customAmount, label, bank[key]);
                if (calc) {
                    plans.push({
                        months: label,
                        ...calc
                    });
                }
            }
        });

        return plans;
    };

    const plans = getEmiPlans(selectedBank);

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-lg text-[#103E34]">EMI Options</h3>

            <div className="flex flex-row gap-2 md:gap-4 h-[500px] md:h-[600px]">
                {/* Left: Bank List */}
                <div className="w-[110px] md:w-1/3 border border-gray-200 rounded-lg flex flex-col h-full sticky top-0">
                    <div className="p-2 md:p-3 bg-gray-50 border-b border-gray-200 font-semibold text-xs md:text-sm text-gray-700 sticky top-0 bg-gray-50 z-10">
                        BANK NAME
                    </div>
                    <div className="overflow-y-auto flex-1">
                        {bankEmiData.map((bank, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedBank(bank)}
                                className={`w-full flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-3 p-2 md:p-3 text-center md:text-left border-b border-gray-100 last:border-0 transition-all ${selectedBank.bank === bank.bank
                                    ? 'bg-[#0a3d2e]/10 border-r-4 md:border-r-0 md:border-l-4 border-[#0a3d2e]'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-8 h-8 md:w-8 md:h-8 ${!bank.logo && bank.color} rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0 mx-auto md:mx-0 overflow-hidden bg-white`}>
                                    {bank.logo ? (
                                        <img
                                            src={bank.logo}
                                            alt={bank.bank}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.classList.remove('bg-white');
                                                e.target.parentElement.classList.add(bank.color.split(' ')[0]);
                                                e.target.parentElement.innerHTML = bank.initial;
                                            }}
                                        />
                                    ) : (
                                        <div className={`w-full h-full ${bank.color} flex items-center justify-center`}>
                                            {bank.initial}
                                        </div>
                                    )}
                                </div>
                                <span className="text-[10px] md:text-sm font-medium text-gray-700 truncate w-full md:w-auto overflow-hidden text-ellipsis whitespace-nowrap block">{bank.bank}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: EMI Details */}
                <div className="flex-1 space-y-3 md:space-y-4 h-full overflow-y-auto">
                    {/* Amount Input */}
                    <div>
                        <label className="text-xs md:text-sm text-gray-500 mb-1 block">Amount</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">৳</span>
                            <input
                                type="number"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(Number(e.target.value))}
                                className="w-full p-2 md:p-3 pl-8 bg-white border border-gray-200 rounded-lg text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    {/* EMI Table */}
                    <div className="border border-gray-200 rounded-lg overflow-x-auto">
                        <table className="w-full text-xs md:text-sm whitespace-nowrap">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-center p-2 md:p-3 font-medium text-gray-600">
                                        Plan <span className="block md:inline text-[10px] md:text-sm font-normal text-gray-400 md:text-gray-600">(Monthly)</span>
                                    </th>
                                    <th className="text-left p-2 md:p-3 font-medium text-gray-600">EMI</th>
                                    <th className="text-right p-2 md:p-3 font-medium text-gray-600">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.length > 0 ? plans.map((plan, idx) => (
                                    <tr key={idx} className="border-t border-gray-100 odd:bg-white even:bg-gray-50/50">
                                        <td className="p-2 md:p-3 text-center align-middle font-medium">
                                            {plan.months}
                                        </td>
                                        <td className="p-2 md:p-3 align-middle">
                                            <div className="flex flex-col">
                                                <span className="text-[#0a3d2e] font-bold text-sm">BDT {plan.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                                <span className="text-[10px] text-gray-500">(Charge {plan.charge}%)</span>
                                            </div>
                                        </td>
                                        <td className="p-2 md:p-3 text-right align-middle text-[#0a3d2e] font-bold">
                                            {plan.effectiveCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="p-4 text-center text-gray-400">No EMI plans available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-xs text-gray-500">
                        * EMI facility available for purchases over ৳5,000. Terms apply.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ProductExtras({ product, selectedCarePlans, toggleCarePlan, currentPrice: currentPriceProp }) {
    // Use the live variant price if provided, fall back to product.price
    const currentPrice = currentPriceProp ?? product.price ?? 0;
    const [activeDrawer, setActiveDrawer] = useState(null);

    const closeDrawer = () => setActiveDrawer(null);

    const extras = [
        {
            id: "specs",
            label: "Technical Specifications",
            description: "Detailed product specs",
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            id: "perks",
            label: "Perks & Benefits",
            description: "Exclusive rewards & offers",
            icon: Gift,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            id: "delivery",
            label: "Delivery Information",
            description: "Shipping methods & times",
            icon: Truck,
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            id: "emi",
            label: "EMI Availability",
            description: "Easy monthly installments",
            icon: CreditCard,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        }
    ];

    const renderDrawerContent = () => {
        switch (activeDrawer) {
            case "specs":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[#103E34]">Technical Specifications</h3>
                        <div className="divide-y divide-gray-100">
                            {Array.isArray(product.specifications) ? (
                                product.specifications.map((spec, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-4 py-4">
                                        <span className="font-bold text-[#103E34] sm:w-1/3 text-base">{spec.name}</span>
                                        <span className="text-gray-600 sm:w-2/3 text-sm leading-relaxed">
                                            {spec.description}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex flex-col sm:flex-row gap-4 py-4">
                                        <span className="font-bold text-[#103E34] sm:w-1/3 text-base">{key}</span>
                                        <span className="text-gray-600 sm:w-2/3 text-sm leading-relaxed">
                                            {typeof value === 'object' && value !== null ? value.name || JSON.stringify(value) : value}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            case "perks":
                // Check if category is Phones and brand is Apple
                const categoryLowerPerks = (product.category || '').toLowerCase();
                const brandLower = (product.brand || '').toLowerCase();
                const isPhonesCategory = categoryLowerPerks.includes('phone') || categoryLowerPerks.includes('phones');
                const isAppleBrand = brandLower.includes('apple');

                // Determine warranty text
                let warrantyTitle = "3 Days Full Replacement Warranty";
                let warrantyDesc = "Get 3-Days Full Replacement of your device";

                if (isPhonesCategory && isAppleBrand) {
                    warrantyTitle = "1 Year Apple Warranty";
                    warrantyDesc = "Get official 1 Year Apple warranty coverage";
                }

                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg">Perks & benefits included</h3>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="bg-green-100 p-3 rounded-full h-fit">
                                    <ShieldCheck className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{warrantyTitle}</h4>
                                    <p className="text-sm text-muted-foreground">{warrantyDesc}</p>
                                    <p className="text-xs text-muted-foreground mt-1">*Condition apply</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-yellow-100 p-3 rounded-full h-fit">
                                    <Truck className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Free Shipping</h4>
                                    <p className="text-sm text-muted-foreground">Get your order delivered inside Dhaka for free</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-blue-100 p-3 rounded-full h-fit">
                                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Authentic device</h4>
                                    <p className="text-sm text-muted-foreground">Get genuine, unaltered, authentic device from Dizmo</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-red-100 p-3 rounded-full h-fit">
                                    <Clock className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Repair history</h4>
                                    <p className="text-sm text-muted-foreground">Acknowledge repair histories of devices from now if there is ANY</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "delivery":
                return (
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg">Shipping Information</h3>
                        <p className="text-sm text-muted-foreground">
                            We are committed to delivering your orders quickly and reliably. Our standard and express delivery options are designed to meet your needs:
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                                <span className="font-medium">Inside Dhaka</span>
                                <span className="font-bold bg-secondary px-3 py-1 rounded-full text-sm">48–72 hours</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                                <span className="font-medium">Outside Dhaka</span>
                                <span className="font-bold bg-secondary px-3 py-1 rounded-full text-sm">48–72 hours</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                                <span className="font-medium">Express Delivery</span>
                                <span className="font-bold bg-cyan-500 text-white px-3 py-1 rounded-full text-sm">24 hours</span>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4">
                            With these options, you can always count on us for timely and secure delivery.
                        </p>
                    </div>
                );
            case "emi":
                const currentPrice = currentPriceProp ?? product.price ?? 0;

                // Bank EMI data (Online rates - no POS charge)
                const bankEmiData = [
                    { bank: "AB Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_of_AB_Bank.svg", initial: "A", color: "bg-red-500", m3: 4.16, m6: 6.38, m9: 7.52, m12: 8.69, m18: null, m24: null, m36: null },
                    { bank: "AB Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_of_AB_Bank.svg", initial: "A", color: "bg-red-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Al-Arafah Islami Bank", logo: "https://images.seeklogo.com/logo-png/36/1/al-arafah-islami-bank-limited-logo-png_seeklogo-367896.png", initial: "A", color: "bg-red-600", m3: 4.71, m6: 5.82, m9: 6.95, m12: 8.69, m18: null, m24: null, m36: null },
                    { bank: "Al-Arafah Islami Bank - Online", logo: "https://images.seeklogo.com/logo-png/36/1/al-arafah-islami-bank-limited-logo-png_seeklogo-367896.png", initial: "A", color: "bg-red-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Bank Asia", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Logo_of_Bank_Asia.svg", initial: "B", color: "bg-orange-500", m3: 4.71, m6: 5.82, m9: 6.95, m12: 8.69, m18: null, m24: null, m36: null },
                    { bank: "Bank Asia - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Logo_of_Bank_Asia.svg", initial: "B", color: "bg-orange-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "Brac Bank", logo: "https://cdn.brandfetch.io/idcfUmYxDL/w/1882/h/1882/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1764488567824", initial: "B", color: "bg-orange-600", m3: 4.16, m6: 5.26, m9: 7.52, m12: 8.69, m18: 12.35, m24: 16.27, m36: null },
                    { bank: "CBBL - Online", logo: "https://www.communitybankbd.com/wp-content/uploads/2020/10/community-cash.png", initial: "C", color: "bg-blue-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Citizens Bank", logo: "https://cdn.brandfetch.io/idKfR1XVeV/w/846/h/367/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1715047471790", initial: "C", color: "bg-blue-500", m3: 4.16, m6: 5.26, m9: 7.52, m12: 8.69, m18: null, m24: null, m36: null },
                    { bank: "Citizens Bank - Online", logo: "https://cdn.brandfetch.io/idKfR1XVeV/w/846/h/367/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1715047471790", initial: "C", color: "bg-blue-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: null, m24: null, m36: null },
                    { bank: "City Bank", logo: "https://images.seeklogo.com/logo-png/26/1/city-bank-logo-png_seeklogo-263036.png", initial: "C", color: "bg-blue-600", m3: 4.16, m6: 5.82, m9: 6.95, m12: 8.10, m18: 11.73, m24: 15.60, m36: 24.22 },
                    { bank: "City Bank (AMEX) - Online", logo: "https://images.seeklogo.com/logo-png/26/1/city-bank-logo-png_seeklogo-263036.png", initial: "C", color: "bg-blue-700", m3: 6.72, m6: 8.34, m9: 10.58, m12: 12.92, m18: 16.62, m24: 21.97, m36: 27.85 },
                    { bank: "Commercial Bank of Ceylon", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Commercial_Bank_logo.svg", initial: "C", color: "bg-blue-800", m3: 5.26, m6: 7.52, m9: 9.89, m12: 11.73, m18: 14.94, m24: 19.04, m36: null },
                    { bank: "DBBL", logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Dutch-bangla-bank-ltd.svg", initial: "D", color: "bg-green-600", m3: 4.60, m6: 6.83, m9: 7.99, m12: 9.17, m18: 14.15, m24: 15.47, m36: 18.20 },
                    { bank: "DBBL - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Dutch-bangla-bank-ltd.svg", initial: "D", color: "bg-green-500", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Dhaka Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Logo_of_Dhaka_Bank.svg", initial: "D", color: "bg-green-700", m3: 3.62, m6: 5.26, m9: 6.38, m12: 7.52, m18: 11.11, m24: 14.94, m36: 23.45 },
                    { bank: "Dhaka Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Logo_of_Dhaka_Bank.svg", initial: "D", color: "bg-green-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: null, m24: null, m36: null },
                    { bank: "Eastern Bank", logo: "https://cdn.brandfetch.io/id-Sih_qNB/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1764583453827", initial: "E", color: "bg-purple-500", m3: 4.16, m6: 5.26, m9: 7.52, m12: 8.69, m18: 11.73, m24: 16.27, m36: 23.45 },
                    { bank: "Eastern Bank - Online", logo: "https://cdn.brandfetch.io/id-Sih_qNB/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1764583453827", initial: "E", color: "bg-purple-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Exim Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Logo_of_Exim_Bank_%28Bangladesh%29.svg", initial: "E", color: "bg-purple-600", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: null, m24: null, m36: null },
                    { bank: "Islami Bank", logo: "https://zarss-bibm.s3-ap-southeast-1.amazonaws.com/bibm_org/members_photo/x9OQKixv9r9WlsdxKXmo3uVWGoZn9GGjrJt0lhf6.jpeg", initial: "I", color: "bg-teal-500", m3: 4.16, m6: 5.26, m9: 6.38, m12: 7.52, m18: null, m24: null, m36: null },
                    { bank: "Islami Bank - Online", logo: "https://zarss-bibm.s3-ap-southeast-1.amazonaws.com/bibm_org/members_photo/x9OQKixv9r9WlsdxKXmo3uVWGoZn9GGjrJt0lhf6.jpeg", initial: "I", color: "bg-teal-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Jamuna Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Logo_of_Jamuna_Bank.svg", initial: "J", color: "bg-indigo-500", m3: 4.16, m6: 5.26, m9: 6.38, m12: 7.52, m18: 11.11, m24: 14.94, m36: null },
                    { bank: "Jamuna Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Logo_of_Jamuna_Bank.svg", initial: "J", color: "bg-indigo-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Lanka Bangla", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Logo_of_LankaBangla_Finance.svg", initial: "L", color: "bg-lime-600", m3: 4.16, m6: 6.38, m9: 7.52, m12: 9.89, m18: null, m24: null, m36: null },
                    { bank: "Lanka Bangla - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Logo_of_LankaBangla_Finance.svg", initial: "L", color: "bg-lime-500", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "Meghna Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Meghna-Bank_Logo_JPG.jpg", initial: "M", color: "bg-pink-500", m3: 3.62, m6: 5.26, m9: 6.38, m12: 7.52, m18: 11.11, m24: 14.94, m36: null },
                    { bank: "Meghna Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Meghna-Bank_Logo_JPG.jpg", initial: "M", color: "bg-pink-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Mercantile Bank", logo: "https://images.seeklogo.com/logo-png/30/1/mercantile-bank-ltd-logo-png_seeklogo-308216.png", initial: "M", color: "bg-pink-600", m3: 4.16, m6: 5.26, m9: 7.52, m12: 8.69, m18: null, m24: null, m36: null },
                    { bank: "Mercantile Bank - Online", logo: "https://images.seeklogo.com/logo-png/30/1/mercantile-bank-ltd-logo-png_seeklogo-308216.png", initial: "M", color: "bg-pink-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Midland Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/6/66/Logo_of_Midland_Bank.svg", initial: "M", color: "bg-fuchsia-500", m3: 3.62, m6: 5.26, m9: 6.38, m12: 7.52, m18: 11.11, m24: 14.94, m36: null },
                    { bank: "Midland Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/6/66/Logo_of_Midland_Bank.svg", initial: "M", color: "bg-fuchsia-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "Modhumoti Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Logo_of_Modhumoti_Bank-en.svg/2560px-Logo_of_Modhumoti_Bank-en.svg.png", initial: "M", color: "bg-violet-500", m3: 3.62, m6: 5.26, m9: 6.38, m12: 8.69, m18: 11.11, m24: 14.94, m36: null },
                    { bank: "Modhumoti Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Logo_of_Modhumoti_Bank-en.svg/2560px-Logo_of_Modhumoti_Bank-en.svg.png", initial: "M", color: "bg-violet-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "Mutual Trust Bank", logo: "https://cdn.brandfetch.io/idw9NqUipN/w/368/h/270/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1766308741582", initial: "M", color: "bg-rose-500", m3: 3.62, m6: 5.26, m9: 6.95, m12: 9.28, m18: null, m24: null, m36: null },
                    { bank: "Mutual Trust Bank - Online", logo: "https://cdn.brandfetch.io/idw9NqUipN/w/368/h/270/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1766308741582", initial: "M", color: "bg-rose-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "NCC Bank", logo: "https://upload.wikimedia.org/wikipedia/en/b/b5/NCC_bank_logo.png", initial: "N", color: "bg-cyan-500", m3: 3.62, m6: 4.16, m9: 6.38, m12: 7.52, m18: 11.11, m24: null, m36: null },
                    { bank: "NCC Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/en/b/b5/NCC_bank_logo.png", initial: "N", color: "bg-cyan-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "NRB Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/Logo_of_NRB_Bank.svg", initial: "N", color: "bg-cyan-600", m3: 3.09, m6: 5.26, m9: 6.38, m12: 7.52, m18: 12.35, m24: 14.94, m36: 19.04 },
                    { bank: "NRB Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/Logo_of_NRB_Bank.svg", initial: "N", color: "bg-cyan-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "NRB Commercial Bank", logo: "https://images.seeklogo.com/logo-png/55/1/nrbc-bank-logo-png_seeklogo-551967.png", initial: "N", color: "bg-sky-500", m3: 3.62, m6: 5.26, m9: 6.38, m12: 8.10, m18: null, m24: null, m36: null },
                    { bank: "NRBC Bank - Online", logo: "https://images.seeklogo.com/logo-png/55/1/nrbc-bank-logo-png_seeklogo-551967.png", initial: "N", color: "bg-sky-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "One Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_of_ONE_Bank-en.svg/2560px-Logo_of_ONE_Bank-en.svg.png", initial: "O", color: "bg-amber-500", m3: 4.16, m6: 5.26, m9: 7.52, m12: 8.69, m18: null, m24: null, m36: null },
                    { bank: "One Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_of_ONE_Bank-en.svg/2560px-Logo_of_ONE_Bank-en.svg.png", initial: "O", color: "bg-amber-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: null, m24: null, m36: null },
                    { bank: "Premier Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Logo_of_Premier_Bank-en.svg/2560px-Logo_of_Premier_Bank-en.svg.png", initial: "P", color: "bg-amber-600", m3: 4.16, m6: 5.26, m9: 6.38, m12: 8.69, m18: null, m24: null, m36: null },
                    { bank: "Premier Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Logo_of_Premier_Bank-en.svg/2560px-Logo_of_Premier_Bank-en.svg.png", initial: "P", color: "bg-amber-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: null, m24: null, m36: null },
                    { bank: "Prime Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Logo_of_Prime_Bank.svg/2560px-Logo_of_Prime_Bank.svg.png", initial: "P", color: "bg-yellow-600", m3: 4.16, m6: 5.26, m9: 6.38, m12: 7.52, m18: null, m24: null, m36: null },
                    { bank: "Prime Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Logo_of_Prime_Bank.svg/2560px-Logo_of_Prime_Bank.svg.png", initial: "P", color: "bg-yellow-500", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "Pubali Bank", logo: "https://images.seeklogo.com/logo-png/51/1/pubali-bank-plc-logo-png_seeklogo-511721.png", initial: "P", color: "bg-yellow-400", m3: 4.16, m6: 5.26, m9: 6.38, m12: 7.52, m18: 11.11, m24: 14.94, m36: null },
                    { bank: "Pubali Bank - Online", logo: "https://images.seeklogo.com/logo-png/51/1/pubali-bank-plc-logo-png_seeklogo-511721.png", initial: "P", color: "bg-yellow-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "SBAC", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/SBAC_Bank_Ltd.png", initial: "S", color: "bg-emerald-500", m3: 3.62, m6: 5.26, m9: 6.38, m12: 8.69, m18: null, m24: null, m36: null },
                    { bank: "SBAC - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/SBAC_Bank_Ltd.png", initial: "S", color: "bg-emerald-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "Shahjalal Islami Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/SJIBL_Logo_English_Blue-01.jpg", initial: "S", color: "bg-emerald-600", m3: 4.71, m6: 5.26, m9: 6.95, m12: 9.28, m18: 11.11, m24: 14.28, m36: null },
                    { bank: "Shahjalal Islami Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/SJIBL_Logo_English_Blue-01.jpg", initial: "S", color: "bg-emerald-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: null, m24: null, m36: null },
                    { bank: "Shimanto Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/en/9/9c/Logo_of_Shimanto_Bank.png", initial: "S", color: "bg-green-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "Social Islami Bank", logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/Logo_of_Social_Islami_Bank.svg", initial: "S", color: "bg-teal-600", m3: 4.71, m6: 5.26, m9: 6.95, m12: 9.28, m18: 11.11, m24: 14.28, m36: null },
                    { bank: "Southeast Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Logo_of_Southeast_Bank.svg", initial: "S", color: "bg-teal-700", m3: 4.16, m6: 5.26, m9: 7.52, m12: 9.89, m18: 13.63, m24: 19.04, m36: 25.00 },
                    { bank: "Southeast Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Logo_of_Southeast_Bank.svg", initial: "S", color: "bg-teal-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "Standard Bank", logo: "https://www.standardbankbd.com/Content/Images/standard-logo.png", initial: "S", color: "bg-indigo-600", m3: 3.62, m6: 5.26, m9: 6.38, m12: 7.52, m18: 11.11, m24: 14.94, m36: null },
                    { bank: "Standard Bank - Online", logo: "https://www.standardbankbd.com/Content/Images/standard-logo.png", initial: "S", color: "bg-indigo-300", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: null },
                    { bank: "Standard Chartered", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Standard_Chartered_%282021%29.svg", initial: "S", color: "bg-blue-900", m3: 4.16, m6: 6.38, m9: 9.28, m12: 12.35, m18: 16.27, m24: 21.95, m36: 29.87 },
                    { bank: "Standard Chartered - Online", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Standard_Chartered_%282021%29.svg", initial: "S", color: "bg-blue-800", m3: 6.19, m6: 8.38, m9: 11.26, m12: 14.29, m18: 18.17, m24: 23.77, m36: null },
                    { bank: "Trust Bank", logo: "https://upload.wikimedia.org/wikipedia/bn/4/4a/%E0%A6%9F%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A7%8D%E0%A6%9F_%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%82%E0%A6%95%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg", initial: "T", color: "bg-rose-600", m3: 4.16, m6: 5.82, m9: 7.52, m12: 9.28, m18: 13.63, m24: 17.64, m36: 23.45 },
                    { bank: "Trust Bank - Online", logo: "https://upload.wikimedia.org/wikipedia/bn/4/4a/%E0%A6%9F%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A7%8D%E0%A6%9F_%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%82%E0%A6%95%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg", initial: "T", color: "bg-rose-400", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: 15.55, m24: 20.90, m36: 26.78 },
                    { bank: "UCBL", logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Logo_of_United_Commercial_Bank.svg", initial: "U", color: "bg-gray-600", m3: 3.30, m6: 5.48, m9: 7.75, m12: 9.52, m18: 13.63, m24: 17.64, m36: null },
                    { bank: "UCBL - Online", logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Logo_of_United_Commercial_Bank.svg", initial: "U", color: "bg-gray-500", m3: 5.65, m6: 7.27, m9: 9.51, m12: 11.85, m18: null, m24: 20.90, m36: null },
                ];

                return (
                    <EMICalculator
                        currentPrice={currentPrice}
                        bankEmiData={bankEmiData}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Dizmo Care Plans - Moved from ProductInfo */}


            <div className="space-y-3">
                {extras.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveDrawer(item.id)}
                        className="w-full flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card group text-left"
                    >
                        <div className={`p-3 rounded-full ${item.bgColor} group-hover:scale-110 transition-transform`}>
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">{item.label}</h4>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Dizmo Care Plans - Moved from ProductInfo */}
            {/* Different care options based on category */}
            {(() => {
                const categoryLower = (product.category || '').toLowerCase();
                const isPhoneCategory = categoryLower.includes('phone') || categoryLower.includes('phones');
                const productNameLower = (product.name || '').toLowerCase();
                const isAdapter = productNameLower.includes('adaptar') || productNameLower.includes('adapter');
                const isCable = productNameLower.includes('cable');
                const isLaptop = categoryLower.includes('laptop') || categoryLower.includes('macbook') ||
                    productNameLower.includes('macbook') || productNameLower.includes('laptop') ||
                    productNameLower.includes('notebook') || productNameLower.includes('mac');

                // Calculate extended warranty prices for non-phone categories
                const productPrice = currentPrice;
                const warranty12MonthPrice = Math.round(productPrice * 0.10); // 10% of product price
                const warranty18MonthPrice = Math.round(productPrice * 0.20); // 20% of product price

                // Care plans for phones
                const phoneCarePlans = product.carePlans && product.carePlans.length > 0 ? product.carePlans : [
                    { id: 'care_android', name: 'Dizmo Care+ 1 Year', description: 'Brand New Replacement Guarantee', price: Math.round(productPrice * 0.05) },
                    { id: 'screen_care', name: 'Dizmo Screen Care+ : 730 days', description: 'One time display replacements (excluding physical damage)', price: Math.round(productPrice * 0.06) },
                    { id: 'parts', name: '1 Year Parts Warranty', description: '', price: Math.round(productPrice * 0.04) },
                ];

                // Extended warranty for other categories
                const otherCategoryPlans = [
                    { id: 'warranty_12', name: '6 Months Extended Warranty', description: 'Extended coverage for hardware issues', price: warranty12MonthPrice },
                    { id: 'warranty_18', name: '12 Months Extended Warranty', description: 'Extended coverage for hardware issues', price: warranty18MonthPrice },
                ];

                // Adapter specific plan
                const adapterPlans = [
                    { id: 'warranty_adapter', name: '12 month instant replacement warranty', description: 'Instant replacement for any issues', price: 0 }
                ];

                // Cable specific plan
                const cablePlans = [
                    { id: 'warranty_cable', name: '6 month instant replacement warranty', description: 'Instant replacement for any issues', price: 0 }
                ];

                // Laptop specific plan (Only Dizmo Care+)
                const laptopPlans = [
                    { id: 'care_laptop', name: 'Dizmo Care+ 1 Year', description: 'Brand New Replacement Guarantee', price: Math.round(productPrice * 0.05) }
                ];

                let carePlansToShow;
                if (isAdapter) {
                    carePlansToShow = adapterPlans;
                } else if (isCable) {
                    carePlansToShow = cablePlans;
                } else if (isLaptop) {
                    carePlansToShow = laptopPlans;
                } else if (isPhoneCategory) {
                    carePlansToShow = phoneCarePlans;
                } else {
                    carePlansToShow = otherCategoryPlans;
                }

                const hideHeader = false; // Always show header

                return (
                    <div className="bg-secondary/10 rounded-xl overflow-hidden border border-border">
                        <div className="bg-black text-white p-2.5 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-accent" />
                            <span className="font-bold text-sm">Dizmo Care</span>
                        </div>

                        <div className="p-2 space-y-2">
                            {carePlansToShow.map((plan) => (
                                <label
                                    key={plan.id}
                                    className={`cursor-pointer bg-white border p-2.5 rounded-lg flex items-start gap-2 transition-all hover:shadow-sm ${selectedCarePlans.some(p => p.id === plan.id)
                                        ? "border-primary ring-1 ring-primary"
                                        : "border-border"
                                        }`}
                                >
                                    <div className={`mt-0.5 w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${selectedCarePlans.some(p => p.id === plan.id) ? "bg-black border-black" : "border-gray-300"}`}>
                                        {selectedCarePlans.some(p => p.id === plan.id) && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCarePlans.some(p => p.id === plan.id)}
                                        onChange={() => toggleCarePlan(plan)}
                                        className="hidden"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <span className="font-semibold text-xs text-foreground leading-tight">{plan.name}</span>
                                            <span className="font-bold text-xs text-foreground whitespace-nowrap">BDT {plan.price.toLocaleString()}</span>
                                        </div>
                                        {plan.description && (
                                            <span className="text-[10px] text-muted-foreground block mt-0.5 leading-tight line-clamp-2">{plan.description}</span>
                                        )}
                                    </div>
                                </label>
                            ))}

                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                                <div className="w-3.5 h-3.5 bg-green-500 rounded flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                                </div>
                                <span className="text-[10px] text-muted-foreground leading-tight">I agree to Dizmo's <a href="/terms" target="_blank" className="text-primary hover:underline">terms & conditions</a></span>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Drawer/Modal Overlay */}
            {activeDrawer && (
                <div className={`fixed inset-0 z-50 flex ${activeDrawer === 'emi' ? 'items-center justify-center p-4' : 'justify-end'}`}>
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={closeDrawer}
                    />

                    {/* Container - Modal for EMI, Sidebar for others */}
                    <div className={`
                        relative bg-background shadow-2xl p-4 md:p-6 overflow-hidden flex flex-col
                        ${activeDrawer === 'emi'
                            ? 'w-[95vw] md:w-full max-w-5xl rounded-2xl max-h-[90vh] animate-in zoom-in-95 fade-in-0'
                            : 'w-full max-w-md h-full animate-in slide-in-from-right duration-300'
                        }
                    `}>
                        <button
                            onClick={closeDrawer}
                            className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors z-10"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="overflow-y-auto flex-1">
                            {renderDrawerContent()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
