import { type ReactNode } from "react";

import type { StatName } from "../types/models"
import { MdFavorite } from "react-icons/md";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";

export const elementalTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy', 'stellar'
]
export const statsRange: StatName[] = ['hp', 'attack', 'defense', 'speed']
type navLinks = {
    path: string
    name: string
    icon: ReactNode
}
export const navLinks: navLinks[] = [
    {
        path: '/favourites',
        name: 'Favourites',
        icon: <MdFavorite className="w-5 h-5" />,
    },
    {
        path: '/team-builder',
        name: 'Team Builder',
        icon: <FaScrewdriverWrench />,

    },
    {
        path: '/my-teams',
        name: 'My Teams',
        icon: <FaUsers />,

    },
    {
        path: '/dexquest-comparison',
        name: 'DexQuest Comparison',
        icon: <FaBalanceScale />,

    },
    {
        path: '/silhouette-game',
        name: 'Silhouette Game',
        icon: <FaGamepad />,

    },
    {
        path: '/profile',
        name: 'Profile',
        icon: <FaUser />,

    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <MdSpaceDashboard />,

    },
    {
        path: '/login',
        name: 'Login',
        icon: <RiLoginCircleFill />,

    },
    {
        path: '/',
        name: 'Logout',
        icon: <RiLogoutCircleFill />,

    },
]
export const borderColors = [
    'border-red-400',
    'border-blue-400',
    'border-green-400',
    'border-yellow-400',
    'border-purple-400',
    'border-pink-400',
    'border-indigo-400',
    'border-transparent',
]
export const gameBoyLegend = [
    '[A/B/C/D] Answer',
    '[Enter] Next',
    '[H] Hint',
    '[R] Reset',
    '[Q] Quit',
    '[S] Start',
    '[M] Mute',
]

export const btnOptions = ['a', 'b', 'c', 'd'];
export const btnColours = [
    'bg-brand-dark-fire',
    'bg-brand-green',
    'bg-brand-dark-water',
    'bg-brand-dark-psychic',
];

export const tallyScoreBtnOptions = [
    {
        name: 'Save and Play Again',
        action: 'save-play',
    },
    {
        name: 'Play Again Without Saving',
        action: 'nosave-play',
    },
    {
        name: 'Save and Quit',
        action: 'save-quit',
    },
]