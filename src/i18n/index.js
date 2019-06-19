import en from "./en.json";
import ro from "./ro.json";

const langs = {
  en,
  ro
};

export default function(lang = "ro") {
  return import(`./${lang}.json`);
}
