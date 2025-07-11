import type { SetStateAction } from "react"

export type Sprites = Record<string, string | null>
export type OtherSprites = { other: Sprites }
export type EntryType = {
    name: string,
    url: string,
    base_stat?: number,
}
export type StatDetails = {
    base_stat: number,
    effort: number,
    stat: EntryType
}
export type PokemonType = {
    type: EntryType
}
export type PokemonAbilities = {
    ability: EntryType
}
export type PokemonMoves = {
    move: EntryType
}
export type PokemonFlavourText = {
    flavor_text: string
}
export type StatsValues = {
    hp: { min: string, max: string },
    attack: { min: string, max: string },
    defense: { min: string, max: string },
    speed: { min: string, max: string }
}
export type StatName = keyof StatsValues;
export type Type = 'grass' | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'
export type SpeciesType = {
    name: string,
    url: string,
}
export type EvolvesTo = {
    evolves_to: EvolvesTo[],
    species: SpeciesType
}
export type EvolutionChain = {
    chain: EvolvesTo
}
export type Pokemon = {
    id: number,
    name: string,
    hp: number,
    attack: number,
    defense: number,
    weight: number,
    type: string,
    other: OtherSprites
    sprites: {
        other?: {
            'official-artwork'?: {
                front_default: string | null
            }
        }
    },
    stats: StatDetails[],
    types: PokemonType[],
    abilities: PokemonAbilities[],
    moves: PokemonMoves[],
    flavor_text_entries: PokemonFlavourText[],
    requirement: string,
    current: boolean,
    branchIndex: number,
    borderColor: string,
}
type PokemonBaseProps<T extends keyof Pokemon = keyof Pokemon> = {
    pokemon: Pick<Pokemon, T>;
};
export type PokemonListProps = {
    pokemonList: Pokemon[],
    paginationReady: boolean,
    setLoading: React.Dispatch<SetStateAction<boolean>>,
}
export type PokemonPreviewProps = PokemonBaseProps<'name' | 'id' | 'sprites' | 'stats' | 'types' | 'requirement' | 'current'>
export type PokemonEvolutionProps = {
    pokemonEvolutions: Pokemon[] | null | undefined,
    isBranching: boolean,
}
export type PokemonCardProps = {
    context?: 'home' | 'detail' | 'team builder',
}
export type ModalPayload = {
    showModal: boolean
}
export type AdvancedFiltersResetPayload = {
    resetFilters: boolean
}
export type StatVisualizerProps = {
    chartData: number[],
    statLabels: string[],
    bgColour?: string,
    bordercolor?: string,
}
export type GamePhasesTypeKey = 'start' | 'booting' | 'tally' | 'quit'
export type GamePhasesTypeVal = 'start started' | 'start ended' | 'booting started' | 'booting ended' | 'tally started' | 'tally ended' | 'quit started' | 'quit ended'
export type GamePhasesType = {
    start: { val: string },
    booting: { val: string },
    tally: { val: string },
    quit: { val: string },
}