// Server-side layout for category pages — provides OG metadata
// The actual page.js in this folder is a "use client" component,
// so we use this layout to export generateMetadata on its behalf.

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const categoriesEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES;
    const storeId = process.env.NEXT_PUBLIC_STORE_ID;

    let categoryName = "Category";
    let categoryImage = "/dizmo.jpg";

    try {
        const res = await fetch(
            `${apiBaseUrl}${categoriesEndpoint}/${storeId}`,
            { cache: "no-store" }
        );

        if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
                const cat = data.data.find(
                    (c) => c.category_id.toString() === slug
                );
                if (cat) {
                    categoryName = cat.name;
                    if (cat.banner) {
                        categoryImage = cat.banner;
                    }
                }
            }
        }
    } catch (e) {
        // Fallback to defaults on error
    }

    return {
        title: `${categoryName} - Dizmo`,
        description: `Browse the best ${categoryName} products at Dizmo Bangladesh.`,
        openGraph: {
            title: `${categoryName} - Dizmo`,
            description: `Browse the best ${categoryName} products at Dizmo Bangladesh.`,
            images: [{ url: categoryImage }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${categoryName} - Dizmo`,
            description: `Browse the best ${categoryName} products at Dizmo Bangladesh.`,
            images: [categoryImage],
        },
    };
}

export default function CategoryLayout({ children }) {
    return children;
}
