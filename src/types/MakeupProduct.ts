export interface MakeupProductType  {
    id: string,
    name: string
    description: string,
    brand: string,
    category: string,
    product_type: string,
    price: string,
    price_sign: string,
    currency: string,
    api_featured_image?: string,
    product_link?: string,
    image_link?: string,
    product_colors?: [] | null,
    tag_list?: [] | null,
    rating?: string | number| null,
}