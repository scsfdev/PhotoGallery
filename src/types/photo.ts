import type { PhotoCategory } from "./category";
import type { PhotoLike } from "./photoLike";

export interface Photo {
  photoGuid: string;
  url: string;
  title: string;
  description: string;
  location: string;
  dateTaken: Date;
  country: string;
  likesCount: number;
  photoLikes: PhotoLike[];
  photoCategories: PhotoCategory[];
}

export interface PhotoResult {
  items: Photo[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
