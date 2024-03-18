import React from "react";
import { View, Text, Button, Image } from "react-native";
import { CountryData } from "../../Types/types";
import { styles } from "./style";

interface CountryCardProps {
  country: CountryData;
  onExecuteAgain: (countryName: string, showModal: boolean) => void;
  openGoogleMapsLink: (link: string) => void;
}

export function CountryCard({
  country,
  onExecuteAgain,
  openGoogleMapsLink,
}: CountryCardProps) {
  const handleExecuteAgain = (countryName: string) => {
    onExecuteAgain(countryName, false);
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: country.flags.png }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{country.translations.por.official}</Text>
        <Text style={styles.infoText}>
          Nome Comum: {country.translations.por.common}
        </Text>
        <Text style={styles.infoText}>
          Nome oficial: {country.translations.por.official}
        </Text>
        <Text style={styles.infoText}>População: {country.population}</Text>
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
        <Button
          title="Executar novamente"
          onPress={() => handleExecuteAgain(country.name.official)}
        />
        <Button
          title="Google Maps"
          onPress={() => openGoogleMapsLink(country.maps.googleMaps)}
        />
      </View>
    </View>
  );
}
