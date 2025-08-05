import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link } from "react-router"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"


const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Destination", href: "/destinations" },
    { label: "Packages", href: "/packages" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Cart", href: "/cart" },
    { label: "Login/Register", href: "/login" },
]

const Header: React.FC = () => {
    return (
        <header className="border-b shadow-sm">
            <div className="container mx-auto flex items-center justify-between py-4 px-0">
                <Link to="/" className="text-2xl font-bold uppercase text-primary">
                    Traveler
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-4">
                            {navLinks.map(({ label, href }) => (
                                <NavigationMenuItem key={href}>
                                    <Link
                                        to={href}
                                        className="text-sm font-medium uppercase text-foreground hover:text-primary transition"
                                    >
                                        {label}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Mobile Dropdown */}
                <div className="lg:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {navLinks.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    to={href}
                                    className="block px-4 py-2 text-sm text-secondary hover:text-primary"
                                >
                                    {label}
                                </Link>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default Header
