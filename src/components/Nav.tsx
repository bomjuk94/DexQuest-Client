import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router'
import { navLinks } from '../utilities/constants.tsx'
import { useAuthStore } from '../stores/authStore'
import { MdCatchingPokemon } from 'react-icons/md'
import { TbPokeball } from 'react-icons/tb'
import { useColourSchemeStore } from '../stores/colourSchemeStore.ts'

const Nav = () => {
    const { logout } = useAuthStore()
    const location = useLocation()
    const navigate = useNavigate()
    const [showDock, setShowDock] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [leftOffset, setLeftOffset] = useState(0)
    const { getColourScheme } = useColourSchemeStore()
    const colourTheme = getColourScheme()

    useEffect(() => {
        const updateOffset = () => {
            const anchor = document.getElementById('nav-anchor')
            if (anchor) {
                const rect = anchor.getBoundingClientRect()
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
                setLeftOffset(rect.left + scrollLeft)
            }
        }

        updateOffset()
        window.addEventListener('resize', updateOffset)
        return () => window.removeEventListener('resize', updateOffset)
    }, [])

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        linkName: string,
    ) => {
        setShowDock(false)
        setExpanded(false)
        if (linkName === 'Logout') {
            e.preventDefault()
            navigate('/')
            setTimeout(() => logout(), 100)
        }
    }

    return (
        <>
            <button
                onClick={() => {
                    setShowDock(!showDock)
                    setExpanded(false)
                }}
                style={{ left: `${leftOffset}px` }}
                className="fixed top-7 z-99 p-2 text-secondary transition cursor-pointer bg-primary-nav rounded-xl"
            >
                {showDock ? (
                    <TbPokeball className="w-7 h-7 cursor-pointer" />
                ) : (
                    <MdCatchingPokemon className="w-7 h-7 cursor-pointer" />
                )}
            </button>

            {showDock && (
                <nav
                    style={{ left: `${leftOffset}px` }}
                    className={`
            fixed top-24 z-99
            flex flex-col gap-4 p-4 bg-primary-nav rounded-xl
            ${expanded ? 'w-52' : 'w-20'}
            transition-all duration-300
            bg-green-500/10 shadow-[0_0_8px_2px_rgba(255,255,255,0.4)] rounded-md p-4
          `}
                >
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className={`
              w-full flex items-center ${expanded ? 'justify-end' : 'justify-center'} px-2 py-1
              btn-text hover:text-white transition cursor-pointer
            `}
                    >
                        <div className="w-6 h-6 flex items-center justify-center">
                            {expanded ? '<' : '>'}
                        </div>
                    </button>

                    {navLinks.map(({ path, name, icon }) => {
                        const isActive = location.pathname === path

                        return (
                            <div key={path} className="group relative flex items-center">
                                <NavLink
                                    to={path}
                                    onClick={(e) => handleNavClick(e, name)}
                                    className={`
    group
    flex items-center justify-center gap-3 w-full
    p-2 rounded-md
    ${isActive && location.pathname !== '/' ? (
                                            colourTheme === 'dark'
                                                ? 'bg-white text-black hover:bg-white hover:text-black'
                                                : 'bg-gray-800 text-secondary'
                                        ) : (
                                            colourTheme === 'dark'
                                                ? 'text-white hover:bg-white hover:text-black'
                                                : 'text-secondary hover:bg-gray-800 hover:text-white'
                                        )}
    ${expanded ? 'justify-start' : 'justify-center'}
    transition-all duration-200
  `}
                                >
                                    <span className={`
    w-5 h-5 transition
    ${colourTheme === 'dark'
                                            ? isActive && location.pathname !== '/'
                                                ? 'text-black'
                                                : 'group-hover:text-black text-white'
                                            : 'group-hover:text-white'}
  `}>
                                        {icon}
                                    </span>
                                    {expanded && (
                                        <span className={`
      whitespace-nowrap text-sm transition
      ${colourTheme === 'dark'
                                                ? isActive && location.pathname !== '/'
                                                    ? 'text-black'
                                                    : 'group-hover:text-black text-white'
                                                : 'group-hover:text-white'}
    `}>
                                            {name}
                                        </span>
                                    )}
                                </NavLink>

                                {!expanded && (
                                    <span
                                        className="
                      absolute left-20 top-1/2 -translate-y-1/2
                      opacity-0 group-hover:opacity-100
                      bg-gray-900 text-white text-xs font-medium
                      px-2 py-1 rounded-md whitespace-nowrap shadow
                      transition-opacity duration-200 pointer-events-none
                    "
                                    >
                                        {name}
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </nav>
            )}
        </>
    )
}

export default Nav
















// import React, { useState, useEffect } from 'react'
// import { useNavigate, useLocation, NavLink } from 'react-router'
// import { navLinks } from '../utilities/constants.tsx'
// import { useAuthStore } from '../stores/authStore'
// import { MdCatchingPokemon } from 'react-icons/md'
// import { TbPokeball } from 'react-icons/tb'

// const Nav = () => {
//     const { logout } = useAuthStore()
//     const location = useLocation()
//     const navigate = useNavigate()
//     const [showDock, setShowDock] = useState(false)
//     const [expanded, setExpanded] = useState(false)

//     // useEffect(() => {
//     //     setExpanded(false)
//     //     setShowDock(false)
//     // }, [location])

//     const handleNavClick = (
//         e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
//         linkName: string,
//         path: string
//     ) => {
//         if (linkName === 'Logout') {
//             e.preventDefault()
//             navigate('/')
//             setTimeout(() => logout(), 100)
//         }
//     }
//     console.log(location.pathname);

//     return (
//         <>
//             {/* Pokéball toggle (top-left) */}
//             <button
//                 onClick={() => { setShowDock(!showDock); setExpanded(false) }}
//                 className="fixed top-7 left-4 z-99 p-2 text-secondary hover:text-accent transition cursor-pointer bg-primary-nav rounded-xl"
//             >
//                 {showDock ? (
//                     <TbPokeball className="w-7 h-7 cursor-pointer" />
//                 ) : (
//                     <MdCatchingPokemon className="w-7 h-7 cursor-pointer" />
//                 )}
//             </button>

//             {/* Dock Nav */}
//             {showDock && (
//                 <nav
//                     className={`
//             fixed top-24 left-4 z-99
//             flex flex-col gap-4 p-4 bg-primary-nav rounded-xl shadow-xl
//             ${expanded ? 'w-52' : 'w-20'}
//             transition-all duration-300
//           `}
//                 >
//                     {/* Expand/Collapse Arrow */}
//                     <button
//                         onClick={() => setExpanded(!expanded)}
//                         className={`
//               w-full flex items-center ${expanded ? 'justify-end' : 'justify-center'} px-2 py-1
//               btn-text hover:text-white transition cursor-pointer
//             `}
//                     >
//                         <div className="w-6 h-6 flex items-center justify-center">
//                             {expanded ? '<' : '>'}
//                         </div>
//                     </button>

//                     {/* Links */}
//                     {navLinks.map(({ path, name, icon }) => {
//                         const isActive = location.pathname === path

//                         return (
//                             <div key={path} className="group relative flex items-center">
//                                 <NavLink
//                                     to={path}
//                                     onClick={(e) => handleNavClick(e, name, path)}
//                                     className={`
//                     flex items-center justify-center gap-3 w-full
//                     p-2 rounded-md
//                     ${(isActive && location.pathname !== '/') ? 'bg-gray-800 text-secondary' : ' hover:text-secondary hover:bg-gray-800'}
//                     ${expanded ? 'justify-start' : 'justify-center'}
//                     transition-all duration-200
//                   `}
//                                 >
//                                     <span className="w-5 h-5">{icon}</span>
//                                     {expanded && <span className="whitespace-nowrap text-sm">{name}</span>}
//                                 </NavLink>

//                                 {/* Tooltip (only when collapsed) */}
//                                 {!expanded && (
//                                     <span
//                                         className="
//                       absolute left-17 top-1/2 -translate-y-1/2
//                       opacity-0 group-hover:opacity-100
//                       bg-gray-900 text-white text-xs font-medium
//                       px-2 py-1 rounded-md whitespace-nowrap shadow
//                       transition-opacity duration-200 pointer-events-none
//                     "
//                                     >
//                                         {name}
//                                     </span>
//                                 )}
//                             </div>
//                         )
//                     })}
//                 </nav>
//             )}
//         </>
//     )
// }

// export default Nav





// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router';
// import { useLocation } from 'react-router';
// import { MdCatchingPokemon } from "react-icons/md";
// import { TbPokeball } from "react-icons/tb";
// import { Link } from 'react-router';
// import { useNavStore } from '../stores/navStore';
// import { navLinks } from '../utilities/constants.tsx';
// import { useAuthStore } from '../stores/authStore';

// const Nav = () => {

//     const { logout } = useAuthStore()
//     const location = useLocation();
//     const navigate = useNavigate()
//     const [menuToggled, setMenuToggled] = useState(false)
//     const toggled = useNavStore((state) => state.toggled)
//     const setToggled = useNavStore((state) => state.setToggled)
//     const setMenuClosed = useNavStore((state) => state.setMenuClosed)

//     useEffect(() => {
//         setMenuClosed()
//     }, [location])

//     const handleMenuClick = () => {
//         setToggled()
//         setMenuToggled(!menuToggled)
//     }

//     const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, linkName: string) => {
//         if (linkName === 'Logout') {
//             e.preventDefault()
//             navigate('/')
//             setTimeout(() => {
//                 logout()
//             }, 100)
//         }
//     }

//     return (
//         <nav>
//             <button onClick={handleMenuClick}>
//                 {
//                     toggled ?
//                         <TbPokeball className='cursor-pointer w-30 h-7' />
//                         :
//                         <MdCatchingPokemon className='cursor-pointer w-30 h-7' />
//                 }
//             </button>

//             <ul className={`${toggled ? 'flex' : 'hidden'} flex-col gap-3 absolute top-[97px] left-0 right-0 items-start py-5 px-4 z-50 text-secondary bg-primary-nav`}>
//                 {
//                     navLinks.map((link) => {
//                         const isActive = location.pathname === link.path

//                         return (
//                             <li className='text-xl flex items-center gap-1.5 hover:text-brand-antique-white' key={link.path}>
//                                 {link.icon}
//                                 <Link
//                                     to={link.path}
//                                     className={`text-white ${isActive ? 'border-b-2 border-white font-semibold' : 'hover:underline'}`}
//                                     onClick={(e) => handleNavClick(e, link.name)}
//                                 >{link.name}</Link>
//                             </li>
//                         )
//                     })
//                 }
//             </ul>
//         </nav>
//     )
// }

// export default Nav