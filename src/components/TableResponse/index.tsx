import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CountryData } from "../../Types/types";
import { removeAspas, formatarPopulacao } from "../../Services/functions";
import { Button } from "../button";
import { styles } from "./style";

interface TableResponseProps {
  country: CountryData;
  onExecuteAgain: (countryName: string, showModal: boolean) => void;
  openGoogleMapsLink: (link: string) => void;
}

export function TableResponse({
  country,
  onExecuteAgain,
  openGoogleMapsLink,
}: TableResponseProps) {
  if (!country) {
    return null;
  }

  const handleExecuteAgainClick = () => {
    onExecuteAgain(country.name.official, true);
  };

  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Image
          source={{ uri: removeAspas(country.flags.svg) }}
          style={styles.flag}
        />
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{country.translations.por.official}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{country.translations.por.common}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{formatarPopulacao(country.population)}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{country.capital?.[0]}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{Object.keys(country.currencies)[0]}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>
          {country.currencies &&
            country.currencies[Object.keys(country.currencies)[0]].name}
        </Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>
          {country.currencies &&
            country.currencies[Object.keys(country.currencies)[0]].symbol}
        </Text>
      </View>
      <View style={styles.cell}>
        <Button
          type="button"
          text="Executar novamente"
          iconName="RefreshCcwDot"
          iconSize={20}
          onClick={handleExecuteAgainClick}
          style={styles.button}
        />
      </View>
      <View style={styles.cell}>
        <Button
          type="button"
          text="Google Maps"
          iconName="MapPin"
          iconSize={20}
          onClick={() => openGoogleMapsLink(country.maps.googleMaps)}
          style={styles.button}
        />
      </View>
    </View>
  );
}
