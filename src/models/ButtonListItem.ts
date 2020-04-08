import { ReactElement } from "react";

export default interface ButtonListItem {
  icon: ReactElement;
  text: string;
  click: () => void;
}
