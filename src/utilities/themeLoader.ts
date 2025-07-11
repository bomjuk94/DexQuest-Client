import { colorSchemes } from "./colours";
import type { ColourSchemeKey } from "../types/models";

const validSchemes = ['red', 'blue', 'green', 'default', 'dark'];

let scheme = localStorage.getItem("colorScheme");
if (!scheme || !validSchemes.includes(scheme)) {
    scheme = "default";
}

const selectedScheme = colorSchemes[scheme as ColourSchemeKey];
Object.entries(selectedScheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${key}`, value);
});