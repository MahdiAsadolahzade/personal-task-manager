import { IconItems } from "../icon_data";

export const findIcon = (id: string) => {
  const foundIcon = IconItems?.find((icon) => icon.id === id);
  return foundIcon?.src;
};
