import unorm from "unorm";

import { CountryData } from "../Types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function generateUniqueId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}

export const generateCountryNameVariations = (countryName: string): string[] => {
  const variations: string[] = [];
  variations.push(countryName);

  const normalized = unorm.nfd(countryName);
  const withoutAccents = normalized.replace(/[\u0300-\u036f]/g, "");
  if (withoutAccents !== countryName) {
    variations.push(withoutAccents);
  }

  const asciiVariants: Record<string, string> = {
    á: "a",
    à: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    é: "e",
    è: "e",
    ê: "e",
    ë: "e",
    í: "i",
    ì: "i",
    î: "i",
    ï: "i",
    ó: "o",
    ò: "o",
    ô: "o",
    õ: "o",
    ö: "o",
    ø: "o",
    ú: "u",
    ù: "u",
    û: "u",
    ü: "u",
    ñ: "n",
    ç: "c",
  };

  const withAsciiEquivalents = normalized.replace(
    /[\u0300-\u036f]/g,
    (match) => asciiVariants[match] || match
  );
  if (withAsciiEquivalents !== normalized) {
    variations.push(withAsciiEquivalents);
  }

  return variations;
};

export const saveDataToStorage = async (data: CountryData[]) => {
  try {
    await AsyncStorage.setItem("searchResults", JSON.stringify(data));
    console.log("Dados salvos com sucesso no armazenamento:", data);
  } catch (error) {
    console.error("Erro ao salvar dados no armazenamento:", error);
  }
};


export function removeAspas(url: string): string {
  return url.replace(/['"]+/g, '');
}

export function formatarPopulacao(populacao: number): string {
  return populacao.toLocaleString('pt-BR');
}





