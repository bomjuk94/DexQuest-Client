import { type Pokemon } from "./models"

export interface GameBoyScreenProps {
    randomPoke: Pokemon
    options: Pokemon[]
}