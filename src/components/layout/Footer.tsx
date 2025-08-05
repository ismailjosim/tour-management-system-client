
import { Mail, PhoneCall, MapPin } from "lucide-react"
import logo from "@/assets/images/site-logo.png"
import gallery01 from "@/assets/images/gallery01.jpg"
import gallery02 from "@/assets/images/gallery02.jpg"
import gallery03 from "@/assets/images/gallery03.jpg"
import gallery04 from "@/assets/images/gallery04.jpg"
import gallery05 from "@/assets/images/gallery05.jpg"
import gallery06 from "@/assets/images/gallery06.jpg"

const Footer = () => {
    const images = [gallery01, gallery02, gallery03, gallery04, gallery05, gallery06]

    return (
        <footer className="bg-accent text-white">
            <div className="pt-20 container mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                {/* Logo and Description */}
                <div>
                    <img src={logo} alt="Site logo" />
                    <p className="text-base text-justify lg:w-5/6 mt-2">
                        Urna ratione ante harum provident, eleifend, vulputate molestiae
                        proin fringilla, praesentium magna conubia at perferendis, pretium,
                        aenean aut ultrices.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-base">
                    <h3 className="font-semibold text-lg mb-2">Quick Link</h3>
                    <ul className="space-y-1">
                        <li><button className="hover:text-secondary transition">About Us</button></li>
                        <li><button className="hover:text-secondary transition">Delivery Information</button></li>
                        <li><button className="hover:text-secondary transition">Privacy Policy</button></li>
                        <li><button className="hover:text-secondary transition">Terms & Conditions</button></li>
                        <li><button className="hover:text-secondary transition">Customer Service</button></li>
                        <li><button className="hover:text-secondary transition">Return Policy</button></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="text-base">
                    <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
                    <p className="mb-3">Feel free to contact and reach us !!</p>
                    <div className="flex items-center gap-3 mb-2">
                        <PhoneCall className="w-4 h-4" />
                        <a href="tel:+01988256203" className="hover:text-secondary transition">+01(988) 256 203</a>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:contact@traveler.com" className="hover:text-secondary transition">contact@traveler.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4" />
                        <span>3146 Koontz, California</span>
                    </div>
                </div>

                {/* Gallery */}
                <div>
                    <h3 className="font-semibold text-lg mb-2">Gallery</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {images.map((img, index) => (
                            <div key={index} className="aspect-square overflow-hidden rounded-lg">
                                <img
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full hover:scale-105 transition-all ease-in-out h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <p className="text-base text-center pb-10 pt-10">
                © {new Date().getFullYear()} All Rights Reserved | Traveler
            </p>
        </footer>
    )
}

export default Footer
