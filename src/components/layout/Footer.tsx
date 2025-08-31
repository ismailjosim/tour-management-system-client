import { Mail, PhoneCall, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import logoBlack from "@/assets/images/site-logo-dark.png"
import logoWhite from "@/assets/images/site-logo-light.png"
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
        <footer className="bg-muted/50 text-muted-foreground border-t">
            <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 py-12 px-4">
                {/* Logo and Description */}
                <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0">
                        <Link to='/' className="flex items-center gap-2 font-medium">
                            <img
                                src={theme === 'dark' ? logoWhite : logoBlack}
                                alt="Site logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <p className="text-sm leading-relaxed text-muted-foreground lg:w-5/6">
                            Urna ratione ante harum provident, eleifend, vulputate molestiae
                            proin fringilla, praesentium magna conubia at perferendis, pretium,
                            aenean aut ultrices.
                        </p>
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg font-semibold text-foreground">Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="space-y-3 text-sm">
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
                                        className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors justify-start"
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
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg font-semibold text-foreground">Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-sm space-y-4">
                        <p className="text-muted-foreground">Feel free to contact and reach us !!</p>
                        <div className="flex items-center gap-3">
                            <PhoneCall className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <a
                                href="tel:+01988256203"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                +01(988) 256 203
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <a
                                href="mailto:contact@traveler.com"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                contact@traveler.com
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">3146 Koontz, California</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Gallery */}
                <Card className="bg-transparent border-none shadow-none">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg font-semibold text-foreground">Gallery</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="aspect-square overflow-hidden rounded-md border border-border"
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
            <div className="border-t border-border bg-muted/30">
                <div className="container mx-auto px-4">
                    <p className="text-sm text-center py-6 text-muted-foreground">
                        © {new Date().getFullYear()} All Rights Reserved | Traveler
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
