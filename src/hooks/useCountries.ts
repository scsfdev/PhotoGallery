import { getCountries } from "@services/generalApi";
import { useQuery } from "@tanstack/react-query";

export const useCountries = () => {
  const { data: countries, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      return await getCountries();
    },
  });

  return { countries, isPending };
};
