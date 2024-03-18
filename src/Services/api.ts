import { CountryData } from "@/Types/types";

// Função para gerar um ID único
function generateUniqueId(): string {
  // Gera e retorna um UUID aleatório
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Função para obter dados do país
export const getCountryData = async (name: string): Promise<CountryData[]> => {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Obtém a URL da API pública do ambiente Expo
    const response = await fetch(`${apiUrl}translation/${name}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do país');
    }
    const data = await response.json();

    // Adiciona o índice único a cada país
    const countriesWithIndex = data.map((country: CountryData) => ({
      ...country,
      index: generateUniqueId() // Adiciona o índice único gerado pela função
    }));

    return countriesWithIndex;
  } catch (error) {
    console.error('Erro ao buscar dados do país:', error);
    throw new Error('Erro ao buscar dados do país'); // Retorna um erro para garantir o tipo correto
  }
};