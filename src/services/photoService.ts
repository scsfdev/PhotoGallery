import type { Photo } from "@types";
import api from "./api";

export const getPhotos = async (): Promise<Photo[]> => {
  const response = await api.get<Photo[]>("/photos");
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