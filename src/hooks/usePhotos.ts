import { getPhotoByGuid, getPhotos } from "@services/photoService";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const usePhotos = (id?: string) => {
  //const queryClient = useQueryClient();
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
    enabled: !!id,
  });

  return { photos, isPending, photo, isLoadingPhoto };
};
