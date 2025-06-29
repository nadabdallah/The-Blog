"use client";

import { usePathname } from "next/navigation";
import NavBarConatiner from "./NavBarContainer";

export function NavBar() {
    const pathname = usePathname();
    return <NavBarConatiner/>;
};