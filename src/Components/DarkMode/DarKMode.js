"use client"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react";
import styles from './DarkMode.module.scss';
import clsx from "clsx";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
export default function DarKMode() {
     const [mounted, setMounted] = useState(false);
     const { theme, setTheme } = useTheme();

     useEffect(() => {
          setMounted(true);
     }, []);

     if (!mounted) {
          return null;
     }
     const handleToggleTheme = () => {
          if (theme === "light" || theme === "system") {
               setTheme("dark")
          } else {
               setTheme("light")
          }
     }
     console.log(theme);
     return (
          <div className={clsx(styles.darkMode)}>
               <input
                    className={clsx(styles.darkModeInput)}
                    type='checkbox'
                    id='darkmode-toggle'
                    onChange={handleToggleTheme}
                    defaultChecked={theme === "dark"}
               />
               <label className={clsx(styles.darkModeLabel)} htmlFor='darkmode-toggle'>
                    <MdLightMode className={clsx(styles.sun)} />
                    <MdDarkMode className={clsx(styles.moon)} />
               </label>
          </div>
     )
}
