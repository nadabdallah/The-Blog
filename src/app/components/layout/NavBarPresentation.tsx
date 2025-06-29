import {
    DarkMode as Moon, 
    LightMode as Sun,
    Menu as MenuIcon,
} from "@mui/icons-material";
import { Button } from "../ui/button";
import Link from "next/link";
import { 
    DropdownMenu, 
    DropdownMenuContent,DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";


type NavBarPresentationProps = {
    theme: string;
    toggleTheme: () => void;
    pathname?: string; 
};

export default function NavBarPresentation({pathname, theme, toggleTheme}: NavBarPresentationProps) {
    return(
        <nav className="bg-transparent backdrop-blur-lg text-[var(--text)] w-full flex justify-between drop-shadow-lg sticky top-0 z-30 px-6 py-4">
            {/* Logo and My Name */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-[var(--text)] font-bold text-sm">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">Nada Abdallah </h1>
                </div>
              </div>
            </div>
            {/* Navigation Links- Desktope */}
            <div className="hidden md:flex items-center gap-6">
                <Link className={`px-2 py-1 rounded transition-colors duration-200 ${pathname === "/" ? "text-[var(--secondary)] font-semibold" : "hover:bg-[var(--secondary)]"}`} href="/">Blog</Link>
                <Link className={`px-2 py-1 rounded transition-colors duration-200 ${pathname === "/about" ? "text-[var(--secondary)] font-semibold" : "hover:bg-[var(--secondary)]"}`} href="/about">About</Link>
                <Link className={`px-2 py-1 rounded transition-colors duration-200 ${pathname === "/newsletter" ? "text-[var(--secondary)] font-semibold" : "hover:bg-[var(--secondary)]"}`} href="/newsletter">Newsletter</Link>
            </div>
            {/* Dropdown Menu */}
            <div className="md:hidden justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-2">
                            <MenuIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        <DropdownMenuItem asChild>
                            <Link className={`px-2 py-1 rounded transition-colors duration-200 ${pathname === "/" ? "text-[var(--secondary)] font-semibold" : "hover:bg-[var(--secondary)]"}`} href="/">Blog</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link className={`px-2 py-1 rounded transition-colors duration-200 ${pathname === "/about" ? "text-[var(--secondary)] font-semibold" : "hover:bg-[var(--secondary)]"}`} href="/about">About</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link className={`px-2 py-1 rounded transition-colors duration-200 ${pathname === "/newsletter" ? "text-[var(--secondary)] font-semibold" : "hover:bg-[var(--secondary)]"}`} href="/newsletter">Newsletter</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/*Toggle Theme */}
            <Button 
                variant="ghost" 
                onClick={toggleTheme}
                data-testid="toggle-theme-button"
                title="Toggle theme"
                className="justify-start gap-3 cursor-pointer"
            >
                {theme === "dark" ? (
                    <Sun sx={{ fontSize: 20 }} />
                ) : (
                    <Moon sx={{ fontSize: 20 }} />  
                )}
                <span className="hidden">{theme === "dark"? "Light": "Dark"}</span>
            </Button>
        </nav>
    );
};