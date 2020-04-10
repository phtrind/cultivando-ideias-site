import Language from "../models/Language";
import EnglishIcon from "./../assets/icons/english.svg";
import PortugueseIcon from "./../assets/icons/portuguese.svg";
import SpanishIcon from "./../assets/icons/spanish.svg";

const Languages: Language[] = [
  {
    id: "en-US",
    name: "English",
    icon: EnglishIcon,
  },
  {
    id: "pt-BR",
    name: "Português",
    icon: PortugueseIcon,
  },
  {
    id: "es-ES",
    name: "Español",
    icon: SpanishIcon,
  },
];

export default Languages;
