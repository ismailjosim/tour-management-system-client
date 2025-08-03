import type { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"


interface IPros {
    children: ReactNode
}

export default function CommonLayout({ children }: IPros) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
