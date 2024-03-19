import { View, Text, Button, TouchableOpacity, Image } from "react-native";

import { styles } from "./style";
import { CountryData } from "@/Types/types";
import { formatarPopulacao } from "@/Services/functions";

interface CountryCardProps {
  country: CountryData;
  onPress: () => void;
  onOpenGoogleMaps: () => void;
  onDelete: () => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({
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
