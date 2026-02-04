/**
 * Helper function to extract a valid image URL from a product object.
 * Handles cases where the image might be in 'image_path' (string) or 'images' (array or object).
 *
 * @param {Object} product - The product object from the API
 * @returns {string|null} - A valid image URL or null if none found
 */
export const getProductImage = (product) => {
    // 1. Try image_path if it's a valid string
    if (typeof product.image_path === 'string' && product.image_path) {
        return product.image_path;
    }

    // 2. Try images (array or object)
    if (product.images) {
        if (Array.isArray(product.images) && product.images.length > 0) {
            return product.images[0];
        } else if (typeof product.images === 'object' && product.images !== null) {
            const values = Object.values(product.images);
            if (values.length > 0) {
                return values[0];
            }
        }
    }

    // 3. Fallback or return null
    return null;
};
