import {Fot1, Fot2} from "@/components/index"
import Image from "next/image"
import Images from "assets/index";

export default () => {
    const footerNavs = [
        {
            href:"#",
            name:"Terms"
        },
        {
            href:"#",
            name:"License"
        },
        {
            href:"#",
            name:"Privacy"
        },
        {
            href:"#",
            name:"About us"
        }
    ];
    
    return (
        <footer className={"pt-10 mt-6"}>
            <div className={"max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 border-t pt-5"}>
                <div className={"justify-between sm:flex"}>
                    <div className={"space-y-6"}>
                        <Image
                            width={150}
                            quality={100}
                            priority={true}
                            src={Images.brandicon}
                            alt={""}
                        />
                        <p className={"max-w-md"}>
                            <span className={"text-gray-900 font-bold italic"}>LogiBlock </span>
                            is an innovative blockchain dApp designed to benefits the logistics industry by data's
                            transparency, traceability and efficiency.
                        </p>
                        <ul className={"flex flex-warp items-center gap-4 text-sm sm:text-base"}>
                            {footerNavs.map((item, idx) => (
                                <li>
                                    <a key={idx} href={item.href}> {item.name} </a>
                                </li>))}
                        </ul>
                    </div>
                    <div className={"mt-6"}>
                        <p className={"text-gray-700 font-semibold"}></p>
                        <div className={"flex items-center gap-3 mt-3 sm:flex text-gray-800 underline"}>
                            <a href={"javascript:void(0)"}>Show further improvements</a>
                        </div>
                    </div>
                </div>
                <div className={"mt-10 py-10 md:text-center"}>
                    <p>Final Year project 2024 - Blockchain applications in Logistics Industry</p>
                </div>
            </div>
        </footer>
    )
}