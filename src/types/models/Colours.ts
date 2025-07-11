export type ColourSchemeKey = 'red' | 'blue' | 'green' | 'default' | 'dark'
export type ColourScheme = {
    primary: string
    backgroundNav: string
    primaryHover: string
    accent: string
    background: string
    inputBackground: string
    btnBackground: string
    btnBackgroundSecondary: string
    backgroundCard: string
    text: string
    cardText: string
    textLink: string
    textSecondary: string
    inputText: string
    btnText: string
    backgroundSecondary: string
    backgroundChart: string
    backgroundGrid: string
    btnAddedBackground: string
    dashboardCardBackground: string
}
export type ColourSchemes = Record<ColourSchemeKey, ColourScheme>