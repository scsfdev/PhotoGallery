import { getPhotoByGuid, getPhotos } from "@services/photoService";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const usePhotos = (id?: string) => {
  //const queryClient = useQueryClient();   // <<-- Chap 59 use for update.
  const location = useLocation();

  const { data: photos, isPending } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      return await getPhotos();
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes (caching for 5 minutes)
    enabled: !id && location.pathname === "/",
  });

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
