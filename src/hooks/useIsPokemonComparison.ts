type Location = {
    pathname: string
}

type useIsPokemonComparisonProps = {
    location: Location
}

export function useIsPokemonComparison({ location }: useIsPokemonComparisonProps) {
    return location.pathname === '/dexquest-comparison'
}