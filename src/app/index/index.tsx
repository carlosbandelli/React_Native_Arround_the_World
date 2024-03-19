// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   Alert,
//   Linking,
// } from "react-native";
// import { v4 as uuidv4 } from "uuid";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import {
//   fetchCountryData,
//   generateCountryNameVariants,
//   normalizeCountryName,
// } from "../../Services/functions";
// import { ExportCSVButton } from "../../Services/convertcsv";

// import { Table } from "../../components/Table";
// import { Header } from "../../components/Header";
// import { Title } from "../../components/title";
// import { Form } from "../../components/Form";
// import { Loading } from "../../components/Loading";
// import { Input } from "../../components/input";
// import { Button } from "../../components/button";
// import { CountryCardContainer } from "../../components/countryCardContainer";
// import { PanelsTopLeft, SquareAsterisk } from "lucide-react";
// import { styles } from "./styles";
// import { CountryData } from "@/Types/types";

// export default function Index() {
//   const [countryName, setCountryName] = useState("");
//   const [searchHistory, setSearchHistory] = useState([] as CountryData[]);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState(false);
//   const [offline, setOffline] = useState(false);
//   const [showEmptyFieldModal, setShowEmptyFieldModal] = useState(false);
//   console.log("countryName", countryName);

//   const handleCountryNameChange = (text: string) => {
//     setCountryName(text);
//   };

//   const openGoogleMapsLink = (link: string) => {
//     Linking.openURL(link);
//   };

//   const handleExecuteAgain = async (countryName: string) => {
//     try {
//       setLoading(true);
//       setApiError(false);

//       let countryToUpdateIndex: number = -1;

//       for (let i = 0; i < searchHistory.length; i++) {
//         const country = searchHistory[i];
//         if (country.name.official === countryName) {
//           countryToUpdateIndex = i;
//           break;
//         }
//       }

//       if (countryToUpdateIndex !== -1) {
//         const newUuid = uuidv4();

//         setSearchHistory((prevSearchHistory) => {
//           const updatedSearchHistory = [...prevSearchHistory];
//           updatedSearchHistory[countryToUpdateIndex] = {
//             ...updatedSearchHistory[countryToUpdateIndex],
//             index: newUuid,
//           };
//           updatedSearchHistory.push({
//             ...searchHistory[countryToUpdateIndex],
//           });
//           return updatedSearchHistory;
//         });
//       }
//     } catch (error) {
//       // Handle error
//       setApiError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log("handleSubmit", countryName);
//       const normalizedCountryName = normalizeCountryName(countryName);
//       console.log("normalizedCountryName", normalizedCountryName);
//       const countryNameVariants = generateCountryNameVariants(
//         normalizedCountryName
//       );

//       let foundExactMatch = false;

//       for (const variant of countryNameVariants) {
//         const response = await fetchCountryData(variant);
//         console.log("variant", response);
//         if (response) {
//           setSearchHistory((prevSearchHistory) => [
//             ...prevSearchHistory,
//             response,
//           ]);
//           if (variant === normalizedCountryName) {
//             foundExactMatch = true;
//           }
//           break;
//         }
//       }

//       if (
//         !foundExactMatch &&
//         !countryNameVariants.includes(normalizedCountryName)
//       ) {
//         // console.error('Erro: País não encontrado.');
//       }
//     } catch (error) {
//       // console.error('Erro ao buscar informações do país:', error);
//       setApiError(true);
//     } finally {
//       setCountryName("");
//     }
//   };

//   // useEffect(() => {
//   //   const handleOnline = () => {
//   //     setOffline(false);
//   //   };

//   //   const handleOffline = () => {
//   //     setOffline(true);
//   //   };

//   //   // Add event listeners for online/offline status
//   //   return () => {
//   //     // Remove event listeners
//   //   };
//   // }, []);

//   useEffect(() => {
//     const saveData = async () => {
//       try {
//         await AsyncStorage.setItem(
//           "searchHistory",
//           JSON.stringify(searchHistory)
//         );
//       } catch (error) {
//         console.error("Erro ao salvar dados:", error);
//       }
//     };

//     saveData();
//   }, [searchHistory]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const savedData = await AsyncStorage.getItem("searchHistory");
//         if (savedData !== null) {
//           setSearchHistory(JSON.parse(savedData));
//         }
//       } catch (error) {
//         console.error("Erro ao carregar dados:", error);
//       }
//     };

//     loadData();
//   }, []);

//   // const processFileData = (data: any) => {
//   //   if (data && data.maps && data.maps.googleMaps) {
//   //     openGoogleMapsLink(data.maps.googleMaps);
//   //   } else {
//   //     console.error("Link do Google Maps não encontrado no arquivo.");
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <Header title="Consulta de Informações de Países" />
//       <View style={styles.main}>
//         <View>
//           <Input
//             value={countryName}
//             onChange={handleCountryNameChange}
//             placeholder="Digite o nome do país"
//           />
//           <Button text={"Buscar"} onPress={handleSubmit} />
//         </View>
//         <View style={styles.viewModeContainer}>
//           <Title title="Histórico de Consultas" />
//         </View>
//         <View style={styles.content}>
//           <CountryCardContainer
//             countries={searchHistory}
//             onExecuteAgain={handleExecuteAgain}
//             openGoogleMapsLink={openGoogleMapsLink}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

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

  const searchCountry = async () => {
    try {
      const data = await getCountryData(countryName);
      console.log(data);
      setSearchResults((prevResults) => [...prevResults, ...data]);
      saveDataToStorage([...searchResults, ...data]);
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
