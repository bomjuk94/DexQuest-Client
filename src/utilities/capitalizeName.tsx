function capitalizeName(name: string) {
    if (!name) return 'Unknown';
    return `${name[0].toUpperCase()}${name.slice(1)}`;
}
export { capitalizeName }