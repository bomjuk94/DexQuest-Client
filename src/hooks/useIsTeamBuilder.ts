
type Location = {
    pathname: string
}

type useIsTeamBuilderProps = {
    location: Location
}

export function useIsTeamBuilder({ location }: useIsTeamBuilderProps) {
    return location.pathname === '/team-builder'
}