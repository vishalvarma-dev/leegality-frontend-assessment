import { baseUrl } from "../utils/constent";
import type { Product, ProductsResponse } from "../types/product";

export const getProducts = async (
  params?: { limit?: number; skip?: number }
): Promise<ProductsResponse> => {
  const url = new URL(`${baseUrl}/products`);   
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url , {
    headers : {
      "Content-Type": "application/json",
    }
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const getProductsByCategory = async (
  category: string,
  params?: { limit?: number; skip?: number }
): Promise<ProductsResponse> => {
  const url = new URL(`${baseUrl}/products/category/${category}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${baseUrl}/products/${id}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const getProductsBySearch = async (
  search: string,
  params?: { limit?: number; skip?: number }
): Promise<ProductsResponse> => {
  const url = new URL(`${baseUrl}/products/search?q=${search}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const getCategories = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}/products/categories`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};


export const GetProductCategorieList = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}/products/category-list`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};