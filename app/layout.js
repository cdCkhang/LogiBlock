import { TrackingProvider } from "@/context/Tracking"
import {NavBar, Footer} from "@/components";

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={"scroll-smooth"}>
            <head>
                <title>Logistics Tracking dAPP -main</title>
                <link rel="icon" href="/blockchain.png" type="image/png"/>
            </head>
            <body>
                <TrackingProvider>
                    <NavBar/>
                    {children}
                </TrackingProvider>
                <Footer/>
            </body>
        </html>
    )
}