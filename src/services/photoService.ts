import type { Photo } from "@types";
import api from "./api";

export const getPhotos = async (catId?: string): Promise<Photo[]> => {
  const url = catId ? `/photos?categoryId=${catId}` : "/photos";
  const response = await api.get<Photo[]>(url);
  return response.data;
};

export const getPhotoByGuid = async (photoGuid: string): Promise<Photo> => {
  const response = await api.get<Photo>(`/photos/${photoGuid}`);
  return response.data;
};

export const uploadPhoto = async (formData: FormData): Promise<Photo> => {
  const response = await api.post<Photo>("/photos/upsert", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};