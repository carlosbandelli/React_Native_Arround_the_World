import { CountryData } from "@/Types/types";
import { generateUniqueId } from "./functions";

export const getCountryData = async (name: string): Promise<CountryData[]> => {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}translation/${name}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do país');
    }
    const data = await response.json();


    const countriesWithIndex = data.map((country: CountryData) => ({
      ...country,
      index: generateUniqueId()
    }));

    return countriesWithIndex;
  } catch (error) {
    console.error('Erro ao buscar dados do país:', error);
    throw new Error('Erro ao buscar dados do país');
  }
};