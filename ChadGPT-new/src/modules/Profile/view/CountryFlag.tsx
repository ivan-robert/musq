import { Image } from "react-native";

const FLAGS_BASE_URL = "https://flagcdn.com/";

const getCountryCode = (countryCode: string) => {
  if (countryCode === "en") return "us";
  const [language, country] = countryCode
    .split("-")
    .map((code) => code.toLowerCase());
  if (!country) return language;
  return country;
};

type FLAG_SIZE = "16x12" | "20x15" | "32x24" | "64x48" | "128x96" | "256x192";

type Props = {
  countryCode: string;
  size: FLAG_SIZE;
};
export const CountryFlag: React.FC<Props> = ({ countryCode, size }) => {
  return (
    <Image
      source={{
        uri: `${FLAGS_BASE_URL}${size}/${getCountryCode(countryCode)}.png`,
      }}
      style={{
        width: parseInt(size.split("x")[0]),
        height: parseInt(size.split("x")[1]),
      }}
    />
  );
};
