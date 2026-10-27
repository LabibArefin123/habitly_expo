import { StyleSheet } from "react-native";
import { preloaderLayoutStyles } from "./preloader_part/preloader_layout.styles";
import { preloaderBrandStyles } from "./preloader_part/preloader_brand.styles";
import { preloaderLoadingStyles } from "./preloader_part/preloader_loading.styles";

export const preloaderStyles = StyleSheet.create({
  ...preloaderLayoutStyles,
  ...preloaderBrandStyles,
  ...preloaderLoadingStyles,
});