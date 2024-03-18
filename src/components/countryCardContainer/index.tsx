import React from "react";
import { View } from "react-native";
import { CountryData } from "../../Types/types";
import { CountryCard } from "../countryCard";
import { styles } from "./style";

interface CountryCardContainerProps {
  countries: CountryData[];
  onExecuteAgain: (countryName: string, showModal: boolean) => void;
  openGoogleMapsLink: (link: string) => void;
}

export function CountryCardContainer({
  countries,
  onExecuteAgain,
  openGoogleMapsLink,
}: CountryCardContainerProps) {
  return (
    <View style={styles.container}>
      {countries.map((country: CountryData, index) => (
        <CountryCard
          key={index}
          country={country}
          onExecuteAgain={onExecuteAgain}
          openGoogleMapsLink={openGoogleMapsLink}
        />
      ))}
    </View>
  );
}
