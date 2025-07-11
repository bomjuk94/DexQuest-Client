import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary-nav btn-text hover:bg-secondary transition-shadow shadow-lg cursor-pointer"
                aria-label="Scroll to top"
            >
                <FaArrowUp className="w-4 h-4" />
            </button>
        )
    )
}

export default ScrollToTopButton
