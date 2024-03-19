import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Button, FlatList, Linking } from "react-native";

import { getCountryData } from "@/Services/api";
import { CountryData } from "@/Types/types";
import {
  generateCountryNameVariations,
  generateUniqueId,
  removeAspas,
  saveDataToStorage,
} from "@/Services/functions";
import { CountryCard } from "@/components/countryCard";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const App: React.FC = () => {
  const [countryName, setCountryName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CountryData[]>([]);

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
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Digite o nome do país"
        value={countryName}
        onChangeText={setCountryName}
        style={styles.input}
      />
      <Button title="Buscar" onPress={searchCountry} />
      <FlatList
        data={searchResults}
        showsHorizontalScrollIndicator={false}
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
    </SafeAreaView>
  );
};

export default App;
