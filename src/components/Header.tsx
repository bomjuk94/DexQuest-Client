import { Link } from 'react-router'
import Nav from './Nav'

const Header = () => {
    return (
        <div className="bg-primary-nav">
            <header className="max-w-[1000px] mx-auto grid grid-cols-3 items-center py-8 px-4 text-secondary relative w-full">
                <div
                    id="nav-anchor"
                    className="hidden md:block col-start-1"
                    style={{ width: '1px', height: '1px' }}
                ></div>

                <Link
                    to="/"
                    className="no-underline text-2xl font-bold col-start-2 col-end-3 text-secondary justify-self-center"
                >
                    DexQuest
                </Link>

                <div className="col-start-3 justify-self-end" />
            </header>
            <Nav />
        </div>
    )
}

export default Header
