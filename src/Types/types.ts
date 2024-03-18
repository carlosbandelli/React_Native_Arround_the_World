export interface CountryData {
  index: any;
  name: {
    common: string;
    official: string;
  };
  translations: {
    por: {
      official: string;
      common: string;
    };
  };
  ccn3: string;
  capital: string[];
  population: number;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
}

