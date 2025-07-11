import type { Pokemon } from "../types/models"

export const generateChartData = (pokemon: Pokemon | null) => {
    const statLabels = ['HP', 'Attack', 'Defense', 'Speed']

    if (!pokemon?.stats) {
        return {
            statLabels,
            chartData: []
        }
    }

    const chartData = pokemon?.stats.reduce((acc: number[], stat) => {
        const isExcluded = stat.stat.name === 'special-attack' || stat.stat.name === 'special-defense';
        if (!isExcluded) {
            acc.push(stat.base_stat);
        }
        return acc;
    }, []);

    return {
        statLabels,
        chartData,
    }
}