import { IconItem } from "@/types/icon.type";


export interface IconStoreModel {
    icons: IconItem[];
    addIcon: (icon: IconItem) => void;
    updateIcon: ( updatedIcon: IconItem) => void;
    deleteIcon: (name: string) => void;
    clearAllIcons: () => void;
}
