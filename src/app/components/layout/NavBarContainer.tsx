import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import NavBarPresentation from "./NavBarPresentation";

export default function NavBarContainer() {
    const pathname = usePathname();
    const{theme, toggleTheme} = useTheme();

    return (
        <NavBarPresentation theme={theme} toggleTheme={toggleTheme} pathname={pathname}/>
    );
};