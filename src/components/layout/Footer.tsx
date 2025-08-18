import { Mail, PhoneCall, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import logoBlack from "@/assets/images/site-logo-dark.png"
import logoWhile from "@/assets/images/site-logo-light.png"
import gallery01 from "@/assets/images/gallery01.jpg"
import gallery02 from "@/assets/images/gallery02.jpg"
import gallery03 from "@/assets/images/gallery03.jpg"
import gallery04 from "@/assets/images/gallery04.jpg"
import gallery05 from "@/assets/images/gallery05.jpg"
import gallery06 from "@/assets/images/gallery06.jpg"
import { Link } from "react-router"
import { useTheme } from "@/hooks/useTheme"

const Footer = () => {
    const { theme } = useTheme()
    const images = [gallery01, gallery02, gallery03, gallery04, gallery05, gallery06]

    return (
        <footer className="bg-accent text-accent-foreground">
            <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 py-5">
                {/* Logo and Description */}
                <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0">
                        {/* <img src={logo} alt="Site logo" className="w-32" /> */}
                        <Link to='/' className="flex items-center gap-2 font-medium">
                            <img src={theme === 'dark' ? logoWhile : logoBlack} alt="Site logo" />
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0 mt-3">
                        <p className="text-sm leading-relaxed lg:w-5/6">
                            Urna ratione ante harum provident, eleifend, vulputate molestiae
                            proin fringilla, praesentium magna conubia at perferendis, pretium,
                            aenean aut ultrices.
                        </p>
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-3">
                        <CardTitle className="text-lg font-semibold">Quick Link</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="space-y-2 text-sm">
                            {[
                                "About Us",
                                "Delivery Information",
                                "Privacy Policy",
                                "Terms & Conditions",
                                "Customer Service",
                                "Return Policy",
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Button
                                        variant="link"
                                        className="p-0 h-auto text-foreground hover:text-secondary transition"
                                    >
                                        {link}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-3">
                        <CardTitle className="text-lg font-semibold">Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-sm space-y-3">
                        <p>Feel free to contact and reach us !!</p>
                        <div className="flex items-center gap-3">
                            <PhoneCall className="w-4 h-4" />
                            <a href="tel:+01988256203" className="hover:text-secondary transition">
                                +01(988) 256 203
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4" />
                            <a href="mailto:contact@traveler.com" className="hover:text-secondary transition">
                                contact@traveler.com
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            <span>3146 Koontz, California</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Gallery */}
                <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-3">
                        <CardTitle className="text-lg font-semibold">Gallery</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="aspect-square overflow-hidden rounded-lg"
                                >
                                    <img
                                        src={img}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-border">
                <p className="text-sm text-center py-6">
                    © {new Date().getFullYear()} All Rights Reserved | Traveler
                </p>
            </div>
        </footer>
    )
}

export default Footer
