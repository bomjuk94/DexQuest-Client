import React from 'react'
import Switch from "react-switch";
import { useThemeStore } from '../stores/themeStore';
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";

const ThemeToggle = () => {

    const checked = useThemeStore((state) => state.checked)
    const toggleTheme = useThemeStore((state) => state.changeTheme)
    const toggleChecked = useThemeStore((state) => state.changeChecked)

    const handleThemeChange = () => {
        toggleTheme()
        toggleChecked()
    }

    return (
        <div className='col-start-3 col-end-4'>
            <Switch
                onChange={handleThemeChange}
                checked={checked}
                offColor='#00bfff'
                onColor='#7c3aed'
                offHandleColor='#000'
                onHandleColor='#ffcc0'
                uncheckedIcon={<FaSun />}
                checkedIcon={<FaMoon />}
                className='switch-icon'
            />
        </div>
    )
}

export default ThemeToggle