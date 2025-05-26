import { getGlobalUrls } from "./configs";
import { Product } from "./types";

const { url_api } = getGlobalUrls();

async function getProducts(): Promise<Product[]> {
    const url = `${url_api}/api/products`;

    const response = await fetch(url, {
        method: "GET",
        cache: 'no-store'
    });

    if (response.ok) {
        if (response.status === 200) {
            const data: Product[] = await response.json();
            return data;
        }
        return [];
    } else {
        throw new Error('Failed to fetch products');
    }
    
}

async function createProduct(product: Product): Promise<Response> {
    const url = `${url_api}/api/create-product`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
        cache: 'no-store'
    });

    if (response.ok) {
        const response_json = await response.json();
        console.log(response_json);
        return response_json;
    } else {
        throw new Error('Failed to create product');
    }
}


export function handlesAPIProducts() {
    return {
        getProducts: getProducts,
        createProduct: createProduct
    }
}