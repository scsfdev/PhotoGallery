import { getCategories, getcategoryById } from "@services/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useCategories = (catGuid?: string) => {
  const { data: categories, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getCategories();
    },

    enabled: !catGuid,
  });

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["categories", catGuid],
    queryFn: async () => {
      return await getcategoryById(catGuid!);
    },
    enabled: !!catGuid,
  });

  return { categories, isPending, category, isLoadingCategory };
};
