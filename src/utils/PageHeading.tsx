import { Link } from "react-router"
import { cn } from "@/lib/utils"
import shapeLight from "@/assets/images/shapeLight.png"
import shapeDark from "@/assets/images/shapeDark.png"
import { useTheme } from "@/hooks/useTheme"
import defaultBG from '@/assets/destinations/destination2.jpg'

interface PageHeadingProps {
    headTitle: string,
    sectionBackground: string
}

const PageHeading: React.FC<PageHeadingProps> = ({ headTitle, sectionBackground = defaultBG }) => {
    const { theme } = useTheme()

    return (
        <section
            className={cn(
                "relative z-[1] py-28 bg-no-repeat bg-top bg-cover bg-fixed text-center justify-center"
            )}
            style={{ backgroundImage: `url(${sectionBackground || defaultBG})` }}
        >
            {/* Decorative Shape */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 w-full h-20 pb-40 pt-28 rotate-180 origin-center bg-contain bg-repeat-x z-[1]",
                )}
                style={{ backgroundImage: `url(${theme === 'dark' ? shapeDark : shapeLight})` }}
            />

            {/* Content */}
            <div className="relative z-[1] bg-transparent lg:pb-10 md:pb-5">
                <div className="relative z-[1]">
                    <h1 className="mb-6 uppercase text-white font-bold lg:text-6xl md:text-4xl text-3xl leading-tight">
                        {headTitle}
                    </h1>
                    <nav>
                        <ul className="flex items-center justify-center gap-1 m-0 p-0 font-medium text-white">
                            <li>
                                <Link to="/" className="text-primary hover:underline">
                                    Home
                                </Link>
                            </li>
                            <span>|</span>
                            <li className="capitalize">{headTitle}</li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 w-full h-full bg-black/60" />
        </section>
    )
}

export default PageHeading
