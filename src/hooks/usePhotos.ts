import { getPhotoByGuid, getPhotos } from "@services/photoService";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const usePhotos = (id?: string, catId?: string) => {
  //const queryClient = useQueryClient();   // <<-- Chap 59 use for update.
  const location = useLocation();

  // 1. Query for Photo List (includes category filtering logic)
  const { data: photos, isPending } = useQuery({
    queryKey: ["photos", catId],
    queryFn: async () => {
      return await getPhotos(catId);
    },

    // staleTime: 1000 * 60 * 5, // 5 minutes (caching for 5 minutes)

    // Ensure this query only runs on the main page if a single photo ID isn't provided.
    enabled: !id && location.pathname === "/",
  });

  // 2. Query for Single Photo
  const { data: photo, isLoading: isLoadingPhoto } = useQuery({
    queryKey: ["photos", id],
    queryFn: async () => {
      return await getPhotoByGuid(id!);
    },
    enabled: !!id, // If id is empty, disable this query hook.
  });

  // For Create with response, Chapter 70

  return { photos, isPending, photo, isLoadingPhoto };
};
