import { colorSchemes } from "./colours";
import type { ColourSchemeKey } from "../types/models";

export function switchTheme(scheme: string) {
    const selectedScheme = colorSchemes[scheme as ColourSchemeKey];
    Object.entries(selectedScheme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value);
    });
    localStorage.setItem("colorScheme", scheme);
}
