import moment from "moment"
import {
    CalendarDays,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react"

const TopHeader = () => {
    const day = moment().format("dddd")
    const date = moment().format("LL")

    return (
        <div className="hidden lg:block bg-primary text-white py-2">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side: Date */}
                <div className="flex gap-2 text-sm">
                    <div className="flex items-center gap-2 pr-2 border-r border-white">
                        <CalendarDays className="w-4 h-4" />
                        <span>{day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>{date}</span>
                    </div>
                </div>

                {/* Right side: Social Icons */}
                <div className="flex items-center gap-4 text-lg">
                    <a
                        href="#"
                        className="pr-3 border-r border-white hover:text-secondary transition-colors duration-300"
                        aria-label="Facebook"
                    >
                        <Facebook className="w-4 h-4" />
                    </a>
                    <a
                        href="#"
                        className="pr-3 border-r border-white hover:text-secondary transition-colors duration-300"
                        aria-label="Twitter"
                    >
                        <Twitter className="w-4 h-4" />
                    </a>
                    <a
                        href="#"
                        className="pr-3 border-r border-white hover:text-secondary transition-colors duration-300"
                        aria-label="Instagram"
                    >
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a
                        href="#"
                        className="hover:text-secondary transition-colors duration-300"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
