export type PokeTeamMember = {
    id: number
    image: string
    name: string
}
export type PokeTeam = {
    _id: string
    name: string
    team: PokeTeamMember[]
}
export type Teams = PokeTeam[]
export type Team = {
    id: number
    name: string | ''
    image: string | ''
    isTeamMember: boolean
}