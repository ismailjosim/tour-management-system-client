import type { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import TopHeader from "./TopHeader"


interface IPros {
    children: ReactNode
}

export default function CommonLayout({ children }: IPros) {
    return (
        <section className="min-h-screen flex-col flex">
            <TopHeader />
            <Navbar />
            <div className="grow-1">
                {children}
            </div>
            <Footer />
        </section>
    )
}
