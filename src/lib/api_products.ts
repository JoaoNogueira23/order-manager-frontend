import { getGlobalUrls } from "./configs";
import { Product } from "./types";

const { url_api } = getGlobalUrls();

async function getProducts(page?: number, limit?: number): Promise<Product[]> {
    let url = `${url_api}/api/products`;
    const params = new URLSearchParams();
    if (page !== undefined) params.set('page', String(page));
    if (limit !== undefined) params.set('limit', String(limit));
    const query = params.toString();
    if (query) {
        url = `${url}?${query}`;
    }

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
    const url = `http://localhost:8080/api/create-product`;
    console.log('Creating product:', product);
    console.log('JSON product', JSON.stringify([product]));
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([product]),
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