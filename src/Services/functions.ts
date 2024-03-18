import { v4 as uuidv4 } from 'uuid';

import { CountryData } from "../Types/types";
import { getCountryData } from "./api";

function mapApiDataToCountryData(apiData: CountryData): CountryData {
  const uuid = uuidv4();
  return {
    index: uuid,
    name: {
      common: apiData.name.common || '',
      official: apiData.name.official || '',
    },
    translations: {
      por: {
        official: apiData.translations.por.official || '',
        common: apiData.translations.por.common || ''
      }
    },
    ccn3: apiData.ccn3 || '',
    capital: apiData.capital || [],
    population: apiData.population || 0,
    currencies: apiData.currencies || {},
    languages: apiData.languages || {},
    flags: {
      png: apiData.flags.png || '',
      svg: apiData.flags.svg || '',
      alt: apiData.flags.alt || ''
    },
    maps: {
      googleMaps: apiData.maps.googleMaps || '',
      openStreetMaps: apiData.maps.openStreetMaps || ''
    }
  };
}

export const fetchCountryData = async (countryName: string): Promise<CountryData | null> => {
  try {
    const response = await getCountryData(countryName);
    console.log("response", JSON.stringify(response, null, 2));


    if (response && response.data) {
      console.log("response.data", JSON.stringify(response.data, null, 2));
      console.log("response.data[0]", JSON.stringify(response.data[0], null, 2));
      const countryData = mapApiDataToCountryData(response.data[0]);
      console.log("countryData", countryData);
      return countryData;
    }

    const countryNameVariants = generateCountryNameVariants(countryName);
    console.log("countryNameVariants", countryNameVariants);
    for (const variant of countryNameVariants) {
      const variantResponse = await getCountryData(variant);
      console.log("variantResponse", variantResponse);
      if (variantResponse && variantResponse.data) {
        const countryData = mapApiDataToCountryData(variantResponse.data[0]);
        return countryData;
      }
    }

    return null;
  } catch (error) {
    //console.error('Erro ao buscar dados do país:', error);
    return null;
  }
};



export const generateCountryNameVariants = (countryName: string): string[] => {
  const normalizedCountryName = normalizeCountryName(countryName);
  const variants = [normalizedCountryName];
  for (let i = 0; i < normalizedCountryName.length; i++) {
    const char = normalizedCountryName[i];
    if (char.toUpperCase() !== char.toLowerCase()) {
      const accentedChars = getAccentedChars(char);
      for (const accentedChar of accentedChars) {
        const variant = normalizedCountryName.substring(0, i) + accentedChar + normalizedCountryName.substring(i + 1);
        variants.push(variant);
      }
    }
  }
  return variants;
};

const getAccentedChars = (char: string): string[] => {
  switch (char.toLowerCase()) {
    case 'a':
      return ['á', 'à', 'â', 'ä', 'ã', 'å', 'æ'];
    case 'e':
      return ['é', 'è', 'ê', 'ë'];
    case 'i':
      return ['í', 'ì', 'î', 'ï'];
    case 'o':
      return ['ó', 'ò', 'ô', 'ö', 'õ', 'ø'];
    case 'u':
      return ['ú', 'ù', 'û', 'ü'];
    case 'c':
      return ['ç'];
    default:
      return [char];
  }
};


export const normalizeCountryName = (countryName: string): string => {
  return countryName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};


export function removeAspas(url: string): string {
  return url.replace(/['"]+/g, '');
}

export function formatarPopulacao(populacao: number): string {
  return populacao.toLocaleString('pt-BR');
}





