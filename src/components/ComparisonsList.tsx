import React, { useRef } from 'react'
import { useNavigate } from 'react-router'
import { capitalizeName } from '../utilities/capitalizeName';
import { Link } from 'react-router';
import { useProtectedProfile } from '../hooks/useProtectedProfile';
import type { Comparison } from '../types/models/Comparison';
import { removeComparison } from '../utilities/removeComparison';
import { type ComparisonsListProps } from '../types/ComparisonsListProps';
import { useComparisonRenameHandler } from '../hooks/useComparisonRenameHandler';

const ComparisonsList = ({ comparisons, comparison, comparisonNameInputs, setComparisonNameInputs, setComparisons }: ComparisonsListProps) => {

    const { token } = useProtectedProfile()
    const navigate = useNavigate()

    const formRef = useRef(null)
    const comparisonNameRef = useRef<HTMLInputElement | null>(null);
    const { handleComparisonRename } = useComparisonRenameHandler()

    const handleComparisonsRemove = async (comparison: Comparison) => {
        if (comparisons && token) {
            const updated = await removeComparison(comparison, token, comparisons)
            setComparisons(updated || [])
        }
    }

    const handleViewComparison = (id: string) => {
        if (id) {
            navigate(`/dexquest-comparison?id=${id}`)
        }
    }

    console.log('comparison', comparison.comparison);


    return (
        <div>
            <ul className='flex flex-col gap-4'>
                <p>Comparison: {capitalizeName(comparison.name)}</p>
                <li className='flex flex-col gap-4 items-center'>
                    <ul className='flex flex-col gap-3.5'>
                        <div className='flex justify-center items-center gap-3.5'>
                            {
                                comparison?.comparison?.map((pair, i) => (
                                    <React.Fragment key={pair.id}>
                                        <li className="flex flex-col items-center">
                                            <img src={pair.image} alt={capitalizeName(pair.name)} />
                                            <Link to={`/pokemon/${pair.id}`} className="hover:underline">
                                                {capitalizeName(pair.name)}
                                            </Link>
                                        </li>

                                        {i < comparison.comparison.length - 1 && (
                                            <span className="mx-2 font-bold">VS</span>
                                        )}
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </ul>

                    <div className='flex flex-col gap-2'>
                        <form
                            onSubmit={(e) => handleComparisonRename({
                                e,
                                comparisonNameInputs,
                                comparison,
                                token,
                                setComparisons
                            })}
                            ref={formRef}
                            className='flex flex-col gap-2.5'
                        >

                            <input
                                ref={comparisonNameRef}
                                className='border-2 py-1.5 px-2.5 rounded-sm input-bkgd border-primary'
                                placeholder='Comparison name...'
                                type="text"
                                value={comparisonNameInputs[comparison._id] || ''}
                                onChange={(e) =>
                                    setComparisonNameInputs({
                                        ...comparisonNameInputs,
                                        [comparison._id]: e.target.value,
                                    })
                                }
                            />

                            <input
                                type='submit'
                                value="Rename Comparison Name"
                                className='text-xs btn-text btn-bkgd-secondary cursor-pointer border-none rounded-sm py-1.5 px-2.5 hover:opacity-80'
                            />

                        </form>

                        <button
                            onClick={() => handleViewComparison(comparison._id)}
                            className='text-xs btn-bkgd-secondary btn-text py-1 px-2 rounded-sm hover:opacity-80 cursor-pointer mt-1 w-full'
                        >
                            View Comparison
                        </button>

                        <button onClick={() => handleComparisonsRemove(comparison)}
                            className='text-xs btn-bkgd-secondary btn-text py-1 px-2 rounded-sm hover:opacity-80 cursor-pointer mt-1 w-full'>
                            Delete
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ComparisonsList