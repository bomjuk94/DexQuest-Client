import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Teams from '../components/Teams'
import { useProtectedProfile } from '../hooks/useProtectedProfile'
import { Helmet } from 'react-helmet'

const MyTeams = () => {

    const { error } = useProtectedProfile()

    const navigate = useNavigate();

    useEffect(() => {
        console.log(error);

        if (error === "sessionExpired") {
            navigate("/login?error=sessionExpired");
        }
    }, [error, navigate]);

    return (
        <>
            <Helmet>
                <title>My Teams - DexQuest</title>
                <meta name="description" content="View and manage your custom-built teams." />
            </Helmet>

            <div className='bg-primary'>
                <div
                    className='flex flex-col gap-20 my-0 mx-auto py-20 px-4 max-w-desktop'
                >
                    <section className='flex flex-col gap-16 w-full max-w-5xl mx-auto relative'>
                        <h2 className='text-4xl text-primary'>
                            My Teams
                        </h2>

                        <Teams />
                    </section>
                </div>
            </div>
        </>

    )
}

export default MyTeams