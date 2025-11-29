"use client";

import { useState } from "react";
import { Search, X, Plus, Check } from "lucide-react";

export default function ComparePage() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            image: "https://admin.dizmo.shop/storage/media/1732185207_1726053335_iphone-16-pro-max-desert-titanium-2.jpg",
            price: 145000,
            brand: "Apple",
            specs: {
                processor: "A17 Pro",
                ram: "8GB",
                storage: "256GB",
                battery: "4422 mAh",
                camera: "48MP + 12MP + 12MP",
                display: "6.7 inch OLED"
            }
        },
        {
            id: 2,
            name: "Samsung S24 Ultra",
            image: "https://admin.dizmo.shop/storage/media/1732185207_1726053335_iphone-16-pro-max-desert-titanium-2.jpg",
            price: 135000,
            brand: "Samsung",
            specs: {
                processor: "Snapdragon 8 Gen 3",
                ram: "12GB",
                storage: "256GB",
                battery: "5000 mAh",
                camera: "200MP + 50MP + 12MP + 10MP",
                display: "6.8 inch AMOLED"
            }
        }
    ]);

    const removeProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <main className="min-h-screen flex flex-col bg-background">

            <div className="container py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Compare Products</h1>
                    <p className="text-muted-foreground">Compare features and specs to find the best device for you.</p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/30 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">No products to compare</h2>
                        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                            Add Products
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto pb-4">
                        <table className="w-full min-w-[800px] border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 text-left w-48 bg-secondary/30 rounded-tl-xl">Features</th>
                                    {products.map(product => (
                                        <th key={product.id} className="p-4 text-center w-64 border-l border-border relative group">
                                            <button
                                                onClick={() => removeProduct(product.id)}
                                                className="absolute top-2 right-2 p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg p-2 flex items-center justify-center">
                                                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                                            </div>
                                            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                                            <p className="text-primary font-bold">৳{product.price.toLocaleString()}</p>
                                        </th>
                                    ))}
                                    {products.length < 3 && (
                                        <th className="p-4 text-center w-64 border-l border-border bg-secondary/10 rounded-tr-xl">
                                            <button className="flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary w-full h-full min-h-[200px] border-2 border-dashed border-border hover:border-primary rounded-xl transition-colors">
                                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                                                    <Plus className="h-6 w-6" />
                                                </div>
                                                <span className="font-medium">Add Product</span>
                                            </button>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="p-4 font-semibold bg-secondary/10">Brand</td>
                                    {products.map(product => (
                                        <td key={product.id} className="p-4 text-center border-l border-border">{product.brand}</td>
                                    ))}
                                    {products.length < 3 && <td className="border-l border-border"></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold bg-secondary/10">Processor</td>
                                    {products.map(product => (
                                        <td key={product.id} className="p-4 text-center border-l border-border">{product.specs.processor}</td>
                                    ))}
                                    {products.length < 3 && <td className="border-l border-border"></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold bg-secondary/10">RAM</td>
                                    {products.map(product => (
                                        <td key={product.id} className="p-4 text-center border-l border-border">{product.specs.ram}</td>
                                    ))}
                                    {products.length < 3 && <td className="border-l border-border"></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold bg-secondary/10">Storage</td>
                                    {products.map(product => (
                                        <td key={product.id} className="p-4 text-center border-l border-border">{product.specs.storage}</td>
                                    ))}
                                    {products.length < 3 && <td className="border-l border-border"></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold bg-secondary/10">Battery</td>
                                    {products.map(product => (
                                        <td key={product.id} className="p-4 text-center border-l border-border">{product.specs.battery}</td>
                                    ))}
                                    {products.length < 3 && <td className="border-l border-border"></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold bg-secondary/10">Camera</td>
                                    {products.map(product => (
                                        <td key={product.id} className="p-4 text-center border-l border-border">{product.specs.camera}</td>
                                    ))}
                                    {products.length < 3 && <td className="border-l border-border"></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 font-semibold bg-secondary/10">Display</td>
                                    {products.map(product => (
                                        <td key={product.id} className="p-4 text-center border-l border-border">{product.specs.display}</td>
                                    ))}
                                    {products.length < 3 && <td className="border-l border-border"></td>}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </main>
    );
}
