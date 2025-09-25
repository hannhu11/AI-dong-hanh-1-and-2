import { ColorScheme } from "../ISetting";
import { ISpriteConfig } from "../ISpriteConfig";

export interface ISettingStoreVariables {
    language: string;
    theme: ColorScheme;
    allowPetAboveTaskbar: boolean;
    allowAutoStartUp: boolean;
    allowPetInteraction: boolean;
    allowPetClimbing: boolean;
    allowOverridePetScale: boolean;
    petScale: number;
    city: string;
    pets: ISpriteConfig[];
    defaultPet: ISpriteConfig[];
}

export interface ISettingStoreState extends ISettingStoreVariables{
    setLanguage: (newLanguage: string) => void;
    setTheme: (newTheme: ColorScheme) => void;
    setAllowPetAboveTaskbar: (newBoolean: boolean) => void;
    setAllowAutoStartUp: (newBoolean: boolean) => void;
    setAllowPetInteraction: (newBoolean: boolean) => void;
    setAllowPetClimbing: (newBoolean: boolean) => void;
    setAllowOverridePetScale: (newBoolean: boolean) => void;
    setPetScale: (petScale: number) => void;
    setCity: (newCity: string) => void;
    setPets: (newPets: ISpriteConfig[]) => void;
    setDefaultPet: (newDefaultPet: ISpriteConfig[]) => void;
}

export interface ISettingTabState {
    page: number;
    setPage: (page: number) => void;
}

export interface IPetStateStore {
    petStates: Record<string, Array<string>>;
    setPetStates: (newPetStates: Record<string, Array<string>>) => void;
    storeDictPetStates: (petName: string, petState: Array<string>) => void;
}