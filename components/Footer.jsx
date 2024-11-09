import {Fot1, Fot2} from "@/components/index"

export default () => {
    const footerNavs = [
        {
            href:"javascript:void()",
            name:"Terms"
        },
        {
            href:"javascript:void()",
            name:"License"
        },
        {
            href:"javascript:void()",
            name:"Privacy"
        },
        {
            href:"javascript:void()",
            name:"About us"
        }
    ];
    
    return (
        <footer className={"pt-10"}>
            <div className={"max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8"}>
                <div className={"justify-between sm:flex"}>
                    <div className={"space-y-6"}>
                        <img src={"https://floatui.com/logo.svg"} className={"w-32"}/>
                        <p className={"max-w-md"}>
                            Logchain is the blockchain dApp benefits the field of logistics by transparency data.
                        </p>
                        <ul className={"flex flex-warp items-center gap-4 text-sm sm:text-base"}>
                            {footerNavs.map((item,idx) => (
                                <li>
                                    <a key={idx} href={item.href}> {item.name} </a>
                                </li>))}
                        </ul>
                    </div>
                    <div className={"mt-6"}>
                        <p className={"text-gray-700 font-semibold"}> </p>
                        <div className={"flex items-center gap-3 mt-3 sm:flex text-gray-800"}>
                            <a href={"javascript:void(0)"}>Click to see Further improvements.</a>
                            <a href={"javascript:void(0)"}>App's capabilities.</a>
                        </div>
                    </div>
                </div>
                <div className={"mt-10 py-10 border-t md:text-center"}>
                    <p>Product of the mind, eager of learning and curiosity.</p>
                </div>
            </div>
        </footer>
    )
}