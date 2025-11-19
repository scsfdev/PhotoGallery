import { uploadPhoto } from "@services/photoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadPhoto = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => uploadPhoto(formData),
    onSuccess: (newPhoto) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      console.log("Photo uploaded successfully", newPhoto.photoGuid);

      // TODO: Navigate to the photo detail page or main page.
    },
    onError: (error) => {
      console.error("Error uploading photo:", error);
    },
  });

  return mutation;
};
