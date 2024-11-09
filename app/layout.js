import { TrackingProvider } from "@/context/Tracking"
import {NavBar, Footer} from "@/components";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>Logistics Tracking dAPP</title>
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