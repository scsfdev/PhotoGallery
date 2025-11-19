import { countryApi } from "./api";

// // Define the shape of the value for each country code (e.g., DZ: { country: "Algeria", ...})
// interface CountryDetail {
//   country: string;
//   region: string;
// }

// // Define the shape of the 'data' object, where keys are country codes (strings)
// // and values are CountryDetail objects.
// interface CountriesData {
//   [code: string]: CountryDetail;
// }

// // Define the shape of the entire API response object
// interface CountryApiResponse {
//   data: CountriesData;
//   // You can omit other fields like status, total, etc., if they are not used
// }

interface CountryItem {
  name: string;
}

interface CountryApiResponse {
  data: CountryItem[];
}

export const getCountries = async (): Promise<string[]> => {
  try {
    const response = await countryApi.get<CountryApiResponse>("/countries");
    const countriesData = response.data.data;

    // const countryNames = Object.keys(countriesData).map((code) => {
    //   return countriesData[code].country;
    // });
    
    const countryNames = countriesData.map((country) => country.name);
    countryNames.sort();
    return countryNames;
  } catch (error) {
    console.log(error);
    return [];
  }
};
