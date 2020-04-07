import { ReactElement } from "react";

class ButtonListItem {
  icon: ReactElement;
  text: string;
  click: () => void;

  constructor(icon: ReactElement, text: string, click: () => void) {
    this.icon = icon;
    this.text = text;
    this.click = click;
  }
}

export default ButtonListItem;
