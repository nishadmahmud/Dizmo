"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Modal from "./Modal";
import PaymentMethodForm from "./PaymentMethodForm";
import {
    ShoppingBag,
    Headset,
    MapPin,
    CreditCard,
    Shield,
    Truck,
    CheckCircle,
    AlertCircle,
    Phone,
    Mail,
    User,
    Home,
    Building,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useStore from "../CustomHooks/useStore";
import { userId } from "../(home)/utils/constants";

const DeliveryForm = ({ cartItems, cartTotal, setShippingFee, paymentMethods }) => {

    const date = new Date().toISOString();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [payment, setPayment] = useState("Cash");
    const [isCod, setIsCod] = useState(true);
    const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [userEmail, setUserEmail] = useState(null);
    const userData = JSON.parse(localStorage.getItem("user"));
    const [invoice, setInvoice] = useState(null);
    const [isSSL, setIsSSL] = useState(false);
    const [loading, setLoading] = useState(false)
    const customer_id = userData?.id;
    const customer_phone = userData?.mobile_number;
    const [location, setLocation] = useState("inside");
    const shippingFee = location === "inside" ? 80 : 130;
    const { setToken, googleLogin, setUserInfo } = useStore();
    useEffect(() => {
        setShippingFee(shippingFee);
    }, [location, setShippingFee, shippingFee]);

    const modal = useState(false)
    const onClose = () => {
        modal[1](false);
    };
    const searchParams = useSearchParams();
    const intendedUrl = searchParams.get("redirect");

    const [reload, setReload] = useState(false)

    const [formData, setFormData] = useState({
        country: "Bangladesh",
        email: userEmail || "",
        fullName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        postalCode: "",
        phone: "",
        billCountry: "",
        billfullName: "",
        billLastName: "",
        billAddress: "",
        billApartment: "",
        billCity: "",
        billPostalCode: "",
        billPhone: "",
    });

    const [selectedMethodId, setSelectedMethodId] = useState(null);

    const handleClose = () => setShowPaymentModal(false);

    const [orderSchema, setOrderSchema] = useState({
        pay_mode: payment,
        paid_amount: 0,
        user_id: 188,
        sub_total: Number(cartTotal) + shippingFee,
        vat: 0,
        tax: 0,
        discount: 0,
        product: cartItems.map((item) => ({
            product_id: item.id,
            qty: item.quantity,
            price: item.retails_price,
            mode: 1,
            size: 1,
            sales_id: 3,
            imei_id: item?.imeis ? item?.imeis[0]?.id : null,
            product_variant_id: item.variantId
        })),
        delivery_method_id: 1,
        delivery_info_id: 1,
        delivery_customer_name: formData.fullName + formData.lastName,
        delivery_customer_address: formData.address || formData.billAddress,
        delivery_customer_phone: formData?.phone ? formData?.phone : "N/A",
        delivery_fee: shippingFee,
        payment_method: paymentMethods?.data?.data.map((item) => ({
            payment_type_category_id: item.payment_type_category[0]?.id,
            payment_type_id: item.payment_type_category[0]?.payment_type_id,
            payment_amount: 0,
        })),
        variants: [],
        imeis: cartItems.map((item) => {
            if (item?.imeis && item?.imeis.length > 0) {
                return Number.parseInt(item?.imeis[0].imei);
            } else {
                return null;
            }
        }),
        created_at: date,
        customer_id: customer_id || null,
        customer_name: `${formData.fullName}+${formData.lastName}`,
        customer_phone: customer_phone || formData?.phone ? formData?.phone : "N/A",
        sales_id: userId,
        wholeseller_id: 1,
        status: 3,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        setOrderSchema((prev) => ({
            ...prev,
            ["customer_name"]: `${updatedFormData.fullName}`,
            ["delivery_customer_name"]: `${updatedFormData.fullName}`,
            ["delivery_customer_address"]: updatedFormData.address || updatedFormData.billAddress,
            ["customer_phone"]: customer_phone || updatedFormData?.phone ? updatedFormData?.phone : "N/A",
            ["delivery_customer_phone"]: updatedFormData?.phone ? updatedFormData?.phone : "N/A",
            ["customer_id"]: customer_id,
        }));
    };

    function handlePayment(e) {
        const value = e.target.value;
        setPayment(value);

        // Update the pay_mode in orderSchema
        setOrderSchema((prev) => ({
            ...prev,
            pay_mode: value,
        }));

        // Set the appropriate flags based on payment method
        if (value === "cash") {
            setIsCod(true);
            setIsSSL(false);
        } else if (value === "ssl") {
            setIsCod(false);
            setIsSSL(true);
        } else {
            setIsCod(false);
            setIsSSL(false);
        }
    }

    const getProductName = () => {
        const name = cartItems.map((item) => `${item.name}`).join(",");
        return name;
    };

    const handleBillingChange = (e) => {
        setBillingSameAsShipping(e.target.value === "same");
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserEmail(user?.email || null);
        }
    }, []);



    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (err) {
            console.error("Failed to parse user from localStorage", err);
        }
    }, []);

    // spining wheel code

    //  const [isModalOpen, setIsModalOpen] = useState(false);
    // const [wonPrize, setWonPrize] = useState("");

    // const handleSpinComplete = (prize) => {
    //   setWonPrize(prize);
    //   setIsModalOpen(true);
    // };


    // const [showWheelModal, setShowWheelModal] = useState(false);
    // const [mustSpin, setMustSpin] = useState(false);
    // const [prizeNumber, setPrizeNumber] = useState(0);
    // const [result, setResult] = useState("");
    // const [prizeName, setPrizeName] = useState("");
    // const [invoiceId, setInvoiceId] = useState(null);



    const sslPayment = (invoice) => {
        setPayment("ssl");
        const sslSchema = {
            user_id: 188,
            amount: Number(cartTotal) + orderSchema.delivery_fee,
            customer_name:
                `${formData.fullName}` ||
                `${formData.billfullName}`,
            customer_email: userEmail,
            customer_phone: formData.phone || formData.billPhone,
            customer_address: formData.address || formData.billAddress,
            customer_city: formData.city || formData.billCity,
            customer_country: "Bangladesh",
            product_name: getProductName(),
            invoice_id: invoice,
            product_category: "Electronics",
        };

        const hasEmptyField = Object.values(sslSchema).some((value) => !value);
        if (!hasEmptyField) {

            axios
                .post(`${process.env.NEXT_PUBLIC_API}/payment/initiate`, sslSchema)
                .then((res) => {
                    window.open(res.data.url, "_self");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        // else if (!schema.amount){
        //   toast.error('Product Price Must be Greater than 0')
        // }
        else {
            toast.error("Please fill everything first");
        }
    };

    const handleCmsPayment = async () => {
        try {
            // Make sure orderSchema has the correct payment mode
            const updatedOrderSchema = {
                ...orderSchema,
                pay_mode: payment,
                // discount: couponDiscount,
                // coupon_code: couponCode,
            };

            // console.log(updatedOrderSchema);
            // return;

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/public/ecommerce-save-sales`,
                updatedOrderSchema
            );

            if (response?.data.status === 200) {
                setLoading(false);
                const invoiceId = response?.data?.data?.invoice_id;
                setInvoice(invoiceId);
                // Check payment method to determine next steps

                if (!isSSL) {
                    toast.success("Order placed successfully!");
                    setTimeout(() => {
                        router.push(`/payment-success/${invoiceId}`);
                    }, 1000);
                } else if (payment === "ssl") {
                    sslPayment(invoiceId);
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error("Error occurred. Please try again.");
            console.log(error);
        }
    };


    const handleOrderComplete = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error("Add Some Products First to the cart");
            return;
        }
        setLoading(true);
        handleCmsPayment();
    };



    //   const [spinCount, setSpinCount] = useState(0);
    //   const handleSpinClick = () => {
    //   const nextTimeIndex = prizeData.findIndex((item) => item.option === "10% off");
    //   const cashPrizeIndex = prizeData.findIndex((item) => item.option === "50% off");

    //   const newSpinCount = spinCount + 1;
    //   setSpinCount(newSpinCount);

    //   if (newSpinCount === 60) {
    //     setPrizeNumber(cashPrizeIndex); 
    //   } else {
    //     setPrizeNumber(nextTimeIndex); 
    //   }

    //   setMustSpin(true);
    //   setResult("");
    // };


    //   const handleSpinEnd = () => {
    //   const selectedPrize = prizeData[prizeNumber]?.image?.uri || "Unknown";
    //   const selectedPrizeName = prizeData[prizeNumber]?.option || "Unknown";
    //   setPrizeName(selectedPrizeName)
    //   setResult(selectedPrize);
    //   setMustSpin(false);
    //   setShowWheelModal(false)
    //   setIsModalOpen(true);
    // };

    // const handleModalClose = () => {
    //   setIsModalOpen(false);
    //   setTimeout(() => {
    //     router.push(`/payment-success/${invoiceId}`);
    //   }, 500);
    // };

    const handleGoogleLogin = async () => {
        try {
            const response = await googleLogin();
            const result = response.user;
            axios
                .post(`${process.env.NEXT_PUBLIC_API}/public/check-customer-user`, {
                    email: result.email,
                    user_id: 188,
                })
                .then((res) => {
                    if (!res.data.status) {
                        axios
                            .post(
                                `${process.env.NEXT_PUBLIC_API}/customer-registration`,
                                {
                                    first_name:
                                        result.displayName.split(" ").length > 2
                                            ? result.displayName.split(" ").slice(0, 1).join(" ")
                                            : result.displayName.split(" ").slice(0).join(" "),
                                    last_name: result.displayName.split(" ").slice(1).join(" "),
                                    phone: result.phone,
                                    email: result.email,
                                    password: result.uid,
                                    user_id: String(userId),
                                },
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }
                            )
                            .then((res) => {
                                if (res.data.status === 200) {
                                    axios
                                        .post(
                                            `${process.env.NEXT_PUBLIC_API}/customer-login`,
                                            { email: result.email, password: result.uid, user_id: String(userId) },
                                            {
                                                headers: { "Content-Type": "application/json" },
                                            }
                                        )
                                        .then((res) => {
                                            setReload(true);
                                            if (intendedUrl) {
                                                router.push(intendedUrl);
                                            }
                                            if (modal) {
                                                onClose();
                                            }
                                            setToken(res.data.token);
                                            toast.success("Login Successful!");
                                            setUserInfo(res.data.customer);
                                            localStorage.setItem(
                                                "user",
                                                JSON.stringify(res.data.customer)
                                            );
                                            localStorage.setItem("token", res.data.token);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        axios
                            .post(`${process.env.NEXT_PUBLIC_API}/customer-login`, {
                                email: result.email,
                                password: result.uid,
                                user_id: String(userId)
                            })
                            .then((res) => {
                                setReload(true);
                                if (intendedUrl) {
                                    router.push(intendedUrl);
                                } else {
                                    console.log('error');
                                }
                                if (modal) {
                                    onClose();
                                }
                                setToken(res.data.token);
                                setUserInfo(res.data.customer);
                                toast.success("Login Successful!");
                                localStorage.setItem("user", JSON.stringify(res.data.customer));
                                localStorage.setItem("token", res.data.token);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const handlePaymentMethod = (item) => {
        setShowPaymentModal(true);
        if (item.payment_type_category && item.payment_type_category.length > 0) {
            setPayment(item.payment_type_category[0].payment_category_name);
            setSelectedMethodId(item.payment_type_category[0].id);
        } else {
            setPayment(item.value);
            setSelectedMethodId(item.category_id);
        }
        setOrderSchema((prevSchema) => {
            return {
                ...prevSchema,
                payment_method: [
                    {
                        payment_type_category_id:
                            item.payment_type_category?.[0]?.id || item.category_id,
                        payment_type_id:
                            item.payment_type_category?.[0]?.payment_type_id || item.id,
                        account_number:
                            item.payment_type_category?.[0]?.account_number ||
                            item.account_number,
                    },
                ],
            };
        });
    };

    const handleAmount = (e) => {
        const amount = e.target.value;
        const updatedMethod = [...orderSchema.payment_method];
        const existingMethodIndex = updatedMethod.findIndex(
            (item) => item.payment_type_category_id === selectedMethodId
        );
        updatedMethod[existingMethodIndex].payment_amount = Number.parseInt(amount);
    };

    const handleRefId = (e) => {
        const refId = e.target.value;
        const updatedMethod = [...orderSchema.payment_method];
        const existingMethodIndex = updatedMethod.findIndex(
            (item) => item.payment_type_category_id === selectedMethodId
        );
        updatedMethod[existingMethodIndex].ref_id = refId;
    };

    return (
        <div className="space-y-4">
            {/* Customer Support Banner */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex justify-center items-center gap-3 w-full">
                <button
                    onClick={handleGoogleLogin}
                    className="gap-2 flex items-center text-sm font-semibold text-[#232323]"
                >
                    <FcGoogle color="black" size={20} /> Continue With Google
                </button>

                {/* Divider line */}
                <div className="h-5 w-px bg-gray-300"></div>

                <span className="text-black font-medium">or</span>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col justify-center items-center gap-1 w-full">
                {/* <h1 className="text-gray-800 font-bangla text-center text-sm font-medium">⚠️গ্যাজেট অর্ডারের জন্য ৩০০ টাকা ও ফোন কুরিয়ারের জন্য ২০৪০৳ এডভান্স করে অর্ডার কনফার্ম করতে হবে</h1> */}
                <h1 className="text-gray-800 font-bangla text-center text-sm font-medium">বিকাশ - 01824512127 এ সেন্ড মানি করুন, রেফারেন্সে আপনার অর্ডার id টি লিখে দিন</h1>
            </div>

            <form onSubmit={handleOrderComplete} className="space-y-8">
                {/* Delivery Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Delivery Information
                            </h2>
                            <p className="text-sm text-gray-600">
                                Where should we deliver your order?
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Country/Region */}
                        {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country/Region
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors bg-white"
              >
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div> */}

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User className="inline h-4 w-4 mr-1" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                defaultValue={formData.fullName}
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:text-black dark:bg-white rounded-lg focus:ring-2 transition-colors"
                            />
                        </div>

                        {/* Phone */}
                        <div className="block text-sm font-medium text-gray-700 mb-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Phone className="inline h-4 w-4 mr-1" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                                className="w-full dark:text-black dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                            />
                        </div>
                        {/* Last Name */}
                        {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div> */}

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Home className="inline h-4 w-4 mr-1" />
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="House number and street name"
                                required
                                className="w-full dark:text-black dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                            />
                        </div>

                        {/* Apartment */}
                        {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="inline h-4 w-4 mr-1" />
                Apartment, Suite, etc. (Optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div> */}

                        {/* City */}
                        <div className="hidden">
                            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                <Building size={18}></Building>
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value="n/a"
                                // onChange={handleChange}
                                placeholder="Enter your city"
                                required
                                className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                            />
                        </div>

                        {/* Postal Code */}
                        {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Enter postal code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div> */}

                    </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <Truck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                Shipping Method
                            </h3>
                            <p className="text-sm text-gray-600">
                                Choose your preferred delivery option
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${location === "inside"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="shipping"
                                value="inside"
                                checked={location === "inside"}
                                onChange={() => setLocation("inside")}
                                className="sr-only"
                            />
                            <div className="flex items-center space-x-4 flex-1">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${location === "inside"
                                        ? "border-blue-500"
                                        : "border-gray-300"
                                        }`}
                                >
                                    {location === "inside" && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">
                                            Inside Dhaka
                                        </span>
                                        <span className="font-semibold text-gray-900">৳80</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Delivery within 1-2 business days
                                    </p>
                                </div>
                            </div>
                        </label>

                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${location === "outside"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="shipping"
                                value="outside"
                                checked={location === "outside"}
                                onChange={() => setLocation("outside")}
                                className="sr-only"
                            />
                            <div className="flex items-center space-x-4 flex-1">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${location === "outside"
                                        ? "border-blue-500"
                                        : "border-gray-300"
                                        }`}
                                >
                                    {location === "outside" && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">
                                            Outside Dhaka
                                        </span>
                                        <span className="font-semibold text-gray-900">৳130</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Delivery within 3-5 business days
                                    </p>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/*<div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free returns within 7 days</span>
            </div>
          </div>*/}
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <CreditCard className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                Payment Method
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center">
                                <Shield className="h-4 w-4 mr-1" />
                                All transactions are secure and encrypted
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${payment === "Cash"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value="Cash"
                                checked={payment === "Cash"}
                                onChange={(e) => {
                                    handlePayment(e);
                                    setIsCod(true);
                                }}
                                className="sr-only"
                            />
                            <div className="flex items-center space-x-4 flex-1">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payment === "Cash" ? "border-blue-500" : "border-gray-300"
                                        }`}
                                >
                                    {payment === "Cash" && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium text-gray-900">
                                        Cash on Delivery
                                    </span>
                                    <p className="text-sm text-gray-600">
                                        Pay when you receive your order
                                    </p>
                                </div>
                            </div>
                        </label>

                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${payment === "online"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value="online"
                                checked={payment === "online"}
                                onChange={(e) => {
                                    handlePayment(e);
                                    setIsCod(false);
                                }}
                                className="sr-only"
                            />
                            <div className="flex items-center space-x-4 flex-1">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payment === "online" ? "border-blue-500" : "border-gray-300"
                                        }`}
                                >
                                    {payment === "online" && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium text-gray-900">
                                        Online Payment
                                    </span>
                                    <p className="text-sm text-gray-600">
                                        Credit Card / Mobile Banking / Net Banking
                                    </p>
                                </div>
                            </div>
                        </label>
                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${payment === "ssl"
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value="ssl"
                                checked={payment === "ssl"}
                                onChange={(e) => {
                                    handlePayment(e);
                                    setIsCod(false);
                                }}
                                className="sr-only"
                            />
                            <div className="flex items-center space-x-4 flex-1">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payment === "ssl" ? "border-blue-500" : "border-gray-300"
                                        }`}
                                >
                                    {payment === "ssl" && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium text-gray-900">
                                        SSL Payment
                                    </span>
                                    {/* <p className="text-sm text-gray-600">
                    Credit Card / Mobile Banking / Net Banking
                  </p> */}
                                </div>
                            </div>
                        </label>
                    </div>

                    {!isCod && !isSSL && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            {paymentMethods?.data?.data &&
                                paymentMethods?.data?.data?.length > 0 ? (
                                (() => {
                                    const otherMethods = paymentMethods?.data?.data?.filter(
                                        (item) => item?.type_name !== "Cash" && item?.type_name !== "SSL"
                                    );

                                    return otherMethods.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {otherMethods.map((item) => (
                                                <div
                                                    onClick={() => handlePaymentMethod(item)}
                                                    key={item.id}
                                                    className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all border-2 ${item?.payment_type_category[0]
                                                        ?.payment_category_name === payment
                                                        ? "border-blue-500 bg-blue-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                >
                                                    <Image
                                                        src={item?.icon_image || "/placeholder.svg"}
                                                        alt={
                                                            item?.payment_type_category[0]
                                                                ?.payment_category_name
                                                        }
                                                        height={40}
                                                        width={40}
                                                        className="rounded-md h-12 w-12 mb-2"
                                                    />
                                                    <span className="text-xs font-medium text-center">
                                                        {
                                                            item?.payment_type_category[0]
                                                                ?.payment_category_name
                                                        }
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2 text-sm text-amber-700">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>Only Cash On Delivery is available right now</span>
                                        </div>
                                    );
                                })()
                            ) : (
                                <div className="text-sm text-gray-700">
                                    <p>
                                        You won&apos;t be redirected to a Payment Link immediately
                                        due to stock limitation at real time. After your order is
                                        placed, our team will call you with stock confirmation in
                                        real time and will provide an SSL Wireless Cel-Tel
                                        Secure Payment Link. You can proceed with the payment then.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}


                </div>

                {/* Billing Address */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <Mail className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                Billing Address
                            </h3>
                            <p className="text-sm text-gray-600">
                                Select the billing address that matches your payment method
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${billingSameAsShipping
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="billingAddress"
                                value="same"
                                checked={billingSameAsShipping}
                                onChange={handleBillingChange}
                                className="sr-only"
                            />
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${billingSameAsShipping
                                        ? "border-blue-500"
                                        : "border-gray-300"
                                        }`}
                                >
                                    {billingSameAsShipping && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <span className="font-medium text-gray-900">
                                    Same as shipping address
                                </span>
                            </div>
                        </label>

                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${!billingSameAsShipping
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="billingAddress"
                                value="different"
                                checked={!billingSameAsShipping}
                                onChange={handleBillingChange}
                                className="sr-only"
                            />
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!billingSameAsShipping
                                        ? "border-blue-500"
                                        : "border-gray-300"
                                        }`}
                                >
                                    {!billingSameAsShipping && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <span className="font-medium text-gray-900">
                                    Use a different billing address
                                </span>
                            </div>
                        </label>
                    </div>

                    {!billingSameAsShipping && (
                        <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        placeholder="Enter Your First Name"
                                        className="w-full px-4 py-3 dark:bg-white border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                                        type="text"
                                        name="billfullName"
                                        onChange={handleChange}
                                        value={formData.billfullName}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        placeholder="Enter Your Last Name"
                                        className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                                        type="text"
                                        name="billLastName"
                                        onChange={handleChange}
                                        value={formData.billLastName}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <input
                                        placeholder="Enter Your Full Address"
                                        className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                                        type="text"
                                        name="billAddress"
                                        onChange={handleChange}
                                        value={formData.billAddress}
                                        required
                                    />
                                </div>

                                {/* <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billApartment"
                    onChange={handleChange}
                    value={formData.billApartment}
                  />
                </div> */}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        placeholder="Enter Your City"
                                        className="w-full px-4 py-3 dark:bg-white border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                                        type="text"
                                        name="billCity"
                                        onChange={handleChange}
                                        value={formData.billCity}
                                        required
                                    />
                                </div>

                                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code (optional)
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billPostalCode"
                    onChange={handleChange}
                    value={formData.billPostalCode}
                  />
                </div> */}

                                <div className="block text-sm font-medium text-gray-700 mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone (optional)
                                    </label>
                                    <input
                                        placeholder="Enter Your Phone Number"
                                        className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                                        type="text"
                                        name="billPhone"
                                        onChange={handleChange}
                                        value={formData.billPhone}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Complete Order Button */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <button
                        type="submit"
                        className="w-full bg-[#EB0439] hover:bg-[#ff0238] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#EB0439] focus:ring-offset-2"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <ShoppingBag className="h-5 w-5" />
                            <span>Complete Order</span>
                        </div>
                    </button>

                    <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <Shield className="h-4 w-4" />
                        <span>
                            Your payment information is protected by 256-bit SSL encryption
                        </span>
                    </div>
                </div>
            </form>

            {showPaymentModal && (
                <Modal
                    title={"Payment Info"}
                    content={
                        <PaymentMethodForm
                            totalAmount={cartTotal}
                            methodName={payment}
                            selectedMethodId={selectedMethodId}
                            methods={paymentMethods.data.data}
                            firstValueFunction={handlePaymentMethod}
                            paymentMethodSelection={orderSchema.payment_method}
                            setOrderSchema={setOrderSchema}
                            onAmountUpdate={handleAmount}
                            onRefIdUpdate={handleRefId}
                            setSelectedMethodId={setSelectedMethodId}
                            onClose={handleClose}
                        />
                    }
                    onClose={handleClose}
                />
            )}

            {/* <Dialog
        open={showWheelModal}
        onClose={() => {}}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-transparent flex flex-col items-center">
            <div className="relative">

              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={prizeData}
                backgroundColors={["#008080", "#ffffff"]}
                textColors={["#000000", "#008080"]}
                outerBorderColor={["#000000", "#ffffff"]}
                outerBorderWidth={2}
                radiusLineColor="#008080"
                radiusLineWidth={1}
                fontSize={14}
                textDistance={70}
                onStopSpinning={handleSpinEnd}
                perpendicularText={true}
                isOnlyOnce={false}
              />

              <button
                onClick={handleSpinClick}
                className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-5 py-2 flex items-center gap-1 rounded-full text-lg font-semibold shadow hover:bg-gray-900"
              >
               
                Play
              </button>
            </div>
           
          </Dialog.Panel>
        </div>
      </Dialog>

      <PrizeModal
      invoiceId={invoiceId}
      prizeName={prizeName}
  isOpen={isModalOpen}
  onClose={handleModalClose}
  prize={result}
/> */}

        </div>
    );
};

export default DeliveryForm;

