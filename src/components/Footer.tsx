import { getYear } from '../utilities/getDates'

const Footer = () => {

    return (
        <footer className='flex justify-center p-4 text-secondary bg-primary-nav'>
            <p className="no-underline text-base font-normal">
                &copy; {getYear()} || Bomju Kim
            </p>
        </footer>
    )
}

export default Footer