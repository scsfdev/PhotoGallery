import type { Category } from "@types";
import api from "./api";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};

export const getcategoryById = async (catGuid: string): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${catGuid}`);
  return response.data;
};
