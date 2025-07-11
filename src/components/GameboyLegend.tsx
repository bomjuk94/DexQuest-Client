import { gameBoyLegend } from '../utilities/constants.tsx'

const GameboyLegend = () => {

    return (
        <div className='mt-8 max-w-four-hundred flex flex-col gap-5 dashboard-card-bkgd py-5 px-4 rounded-xl'>
            <p className='text-primary'>
                Keyboard Shortcuts
            </p>
            <ul className='grid grid-cols-4 gap-x-3.5 gap-y-3'>
                {
                    gameBoyLegend.map((legend) =>
                        <li className='text-xs text-primary w-max' key={legend}>
                            {legend}
                        </li>
                    )
                }
            </ul>
            <div id="shortcut-info" className="sr-only">
                Keyboard Shortcuts: [A/B/C/D] Answer – [Enter] Next – [H] Hint – [R] Reset – [Q] Quit – [S] Start – [M] Mute
            </div>
        </div>
    )
}

export default GameboyLegend