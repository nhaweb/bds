import { amenity } from "./amenity";
import { apartment } from "./apartment";
import { homePage } from "./homePage";
import { localeBlock, localeString, localeText } from "./locale";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localeString,
  localeText,
  localeBlock,
  siteSettings,
  homePage,
  apartment,
  amenity,
];
