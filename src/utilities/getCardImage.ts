export const getCardImage = (pokemon: any) =>
    pokemon.sprites?.other?.['official-artwork']?.front_default ??
    pokemon.sprites?.front_default ??
    pokemon.image ??
    '';
