import { getCountryData } from "@/Services/api";
import { CountryData } from "@/Types/types";
import { theme } from "@/theme";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import unorm from "unorm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatarPopulacao, removeAspas } from "@/Services/functions";

interface CountryCardProps {
  country: CountryData;
  onPress: () => void;
  onOpenGoogleMaps: () => void;
  onDelete: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onPress,
  onOpenGoogleMaps,
  onDelete,
}) => {
  if (!country || Object.keys(country).length === 0) {
    return <Text style={styles.error}>Erro: País não encontrado.</Text>;
  }

  const handleDelete = () => {
    onDelete();
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: country.flags.png }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{country.translations.por.official}</Text>
        <Text style={styles.infoText}>
          Nome Comum: {country.translations.por.common}
        </Text>
        <Text style={styles.infoText}>
          Nome oficial: {country.translations.por.official}
        </Text>
        <Text style={styles.infoText}>
          População: {formatarPopulacao(country.population)}
        </Text>
        <Text style={styles.infoText}>Capital: {country.capital?.[0]}</Text>
        <Text style={styles.infoText}>
          Moeda internacional: {Object.keys(country.currencies)[0]}
        </Text>
        <Text style={styles.infoText}>
          Moeda nacional:{" "}
          {country.currencies &&
            country.currencies[Object.keys(country.currencies)[0]].name}
        </Text>
        <Text style={styles.infoText}>
          Símbolo:{" "}
          {country.currencies &&
            country.currencies[Object.keys(country.currencies)[0]].symbol}
        </Text>
        <Button title="Executar novamente" onPress={onPress} />
        <Button title="Abrir no Google Maps" onPress={onOpenGoogleMaps} />
        <Button title="Deletar país" onPress={handleDelete} />
      </View>
    </TouchableOpacity>
  );
};

const App: React.FC = () => {
  const [countryName, setCountryName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CountryData[]>([]);

  const generateCountryNameVariations = (countryName: string): string[] => {
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

  const searchCountry = async () => {
    try {
      const variations = generateCountryNameVariations(countryName);
      let foundValidResult = false;

      for (const variation of variations) {
        const searchData = await getCountryData(variation);
        if (searchData) {
          const firstValidResult = Array.isArray(searchData)
            ? searchData[0]
            : searchData;
          console.log("País encontrado:", firstValidResult);
          setSearchResults((prevResults) => [...prevResults, firstValidResult]);
          saveDataToStorage([...searchResults, firstValidResult]);
          foundValidResult = true;
          break;
        }
      }

      if (!foundValidResult) {
        console.log("Nenhum país válido encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar país:", error);
    }
  };

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("searchResults");
      if (savedData !== null) {
        setSearchResults(JSON.parse(savedData));
        console.log(
          "Dados carregados do armazenamento:",
          JSON.parse(savedData)
        );
      }
    } catch (error) {
      console.error("Erro ao carregar dados do armazenamento:", error);
    }
  };

  const saveDataToStorage = async (data: CountryData[]) => {
    try {
      await AsyncStorage.setItem("searchResults", JSON.stringify(data));
      console.log("Dados salvos com sucesso no armazenamento:", data);
    } catch (error) {
      console.error("Erro ao salvar dados no armazenamento:", error);
    }
  };

  function generateUniqueId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const handleSearchAgain = (country: CountryData) => {
    const newCountry = { ...country, index: generateUniqueId() };
    setSearchResults((prevResults) => [...prevResults, newCountry]);
  };

  const handleOpenGoogleMaps = (country: CountryData) => {
    const googleMapsUrl = removeAspas(country.maps.googleMaps);
    Linking.openURL(googleMapsUrl);
  };

  const deleteCountry = async (country: CountryData) => {
    const updatedResults = searchResults.filter(
      (item) => item.index !== country.index
    );
    setSearchResults(updatedResults);
    saveDataToStorage(updatedResults);
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o nome do país"
        value={countryName}
        onChangeText={setCountryName}
        style={styles.input}
      />
      <Button title="Buscar" onPress={searchCountry} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => (
          <CountryCard
            country={item}
            onPress={() => handleSearchAgain(item)}
            onOpenGoogleMaps={() => handleOpenGoogleMaps(item)}
            onDelete={() => deleteCountry(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  cardContainer: {
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    backgroundColor: theme.colors.white,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: theme.fonts.size.heading.md,
    marginBottom: 8,
  },
  infoText: {
    fontSize: theme.fonts.size.body.sm,
    color: theme.colors.white,
    marginBottom: 4,
  },
  actionButton: {
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  card: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
});

export default App;
