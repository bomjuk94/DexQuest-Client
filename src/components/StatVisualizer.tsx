import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { StatVisualizerProps } from '../types/models';

const StatVisualizer = ({ chartData, statLabels }: StatVisualizerProps) => {

    const rootStyles = getComputedStyle(document.documentElement);
    const bkgdPrimary = rootStyles.getPropertyValue("--color-backgroundChart").trim();
    const borderPrimary = rootStyles.getPropertyValue("--color-primaryHover").trim();
    const gridPrimary = rootStyles.getPropertyValue("--color-backgroundGrid").trim();
    const labels = rootStyles.getPropertyValue("--color-text").trim();

    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    );

    const data = {
        labels: statLabels,
        datasets: [
            {
                label: '',
                data: chartData,
                backgroundColor: bkgdPrimary,
                borderColor: borderPrimary,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                min: 0,
                max: 250,
                grid: {
                    color: gridPrimary,
                },
                angleLines: {
                    color: gridPrimary,
                },
                ticks: {
                    stepSize: 50,
                    color: "#000",
                },
                pointLabels: {
                    font: {
                        size: 16,
                        weight: 700,
                    },
                    color: labels,
                },
            },
        },
        plugins: {
            tooltip: {
                displayColors: false,
                callbacks: {
                    title: () => '',
                    label: (context) => `${context.label}: ${context.raw}`,
                },
            },
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="w-full max-w-90vw h-100vw sm:max-w-four-hundred sm:h-four-hundred mx-auto flex flex-col gap-9 sm:gap-0">
            <h3 className='text-lg font-semibold text-center mb-2 text-primary'>Stats Radar Chart</h3>
            <Radar options={options} data={data} />
        </div>
    )
}

export default StatVisualizer