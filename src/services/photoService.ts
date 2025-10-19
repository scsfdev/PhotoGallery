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
