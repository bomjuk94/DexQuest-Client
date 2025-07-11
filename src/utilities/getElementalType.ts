import type { Type } from '../types/models/Pokemon'
import grassIcon from '../assets/elementalTypes/grass.svg'
import normalIcon from '../assets/elementalTypes/normal.svg'
import fireIcon from '../assets/elementalTypes/fire.svg'
import waterIcon from '../assets/elementalTypes/water.svg'
import electricIcon from '../assets/elementalTypes/electric.svg'
import iceIcon from '../assets/elementalTypes/ice.svg'
import fightingIcon from '../assets/elementalTypes/fighting.svg'
import poisonIcon from '../assets/elementalTypes/poison.svg'
import groundIcon from '../assets/elementalTypes/ground.svg'
import flyingIcon from '../assets/elementalTypes/flying.svg'
import psychicIcon from '../assets/elementalTypes/psychic.svg'
import bugIcon from '../assets/elementalTypes/bug.svg'
import rockIcon from '../assets/elementalTypes/rock.svg'
import ghostIcon from '../assets/elementalTypes/ghost.svg'
import dragonIcon from '../assets/elementalTypes/dragon.svg'
import darkIcon from '../assets/elementalTypes/dark.svg'
import steelIcon from '../assets/elementalTypes/steel.svg'
import fairyIcon from '../assets/elementalTypes/fairy.svg'


export const typeIcons: Record<Type, string> = {
    grass: grassIcon,
    normal: normalIcon,
    fire: fireIcon,
    water: waterIcon,
    electric: electricIcon,
    ice: iceIcon,
    fighting: fightingIcon,
    poison: poisonIcon,
    ground: groundIcon,
    flying: flyingIcon,
    psychic: psychicIcon,
    bug: bugIcon,
    rock: rockIcon,
    ghost: ghostIcon,
    dragon: dragonIcon,
    dark: darkIcon,
    steel: steelIcon,
    fairy: fairyIcon,
}

export const isElementalType = (type: string): type is Type => {
    return type in typeIcons
}