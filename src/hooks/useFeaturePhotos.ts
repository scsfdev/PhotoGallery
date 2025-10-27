import React from "react";
import { usePhotos } from "./usePhotos";
import type { Photo } from "@types";

interface UseFeaturePhotosresult {
  featurePhotos: Photo[];
  isPending: boolean;
}

export const useFeaturePhotos = (count: number = 5): UseFeaturePhotosresult => {
  // Get data from primiary fetching hook (usePhotos)
  const { photos, isPending } = usePhotos();

  // Select feature photos
  const featurePhotos = React.useMemo(() => {
    if (!photos) return [];
    return photos.slice(0, count);
  }, [photos, count]);

  return { featurePhotos, isPending };
};
