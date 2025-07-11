import Gameboy from '../components/Gameboy'
import { Helmet } from 'react-helmet'

const SilhouetteGame = () => {

    return (
        <>
            <Helmet>
                <title>Silhouette Game - DexQuest</title>
                <meta name="description" content="Guess which creature is hidden behind the silhouette in this fun challenge." />
            </Helmet>

            <div className='bg-primary'>
                <div className='flex flex-col gap-20 max-w-desktop mx-auto py-20 px-4'>
                    <h2 className='text-center text-4xl text-primary'>
                        Who's That Creature?
                    </h2>

                    <Gameboy />
                </div>
            </div>
        </>

    )
}

export default SilhouetteGame