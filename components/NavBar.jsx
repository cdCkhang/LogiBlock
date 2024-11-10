"use client"
import {useEffect, useState, useContext} from "react";

import {TrackingContext} from "@/context/Tracking";
import {Nav1, Nav2, Nav3} from "@/components/index"

import "../app/globals.css";

export default() => {
    const [state, setState] = useState(false);
    const {currentUser, connectWallet} = useContext(TrackingContext);
    
    const navigation = [
        {title:"Main",path:"#"},
        {title:"Services",path:"#"},
        {title:"Packages",path:"#"},
        {title:"ERC-20",path:"https://ethereum.org/vi/developers/docs/standards/tokens/erc-20/"}
    ];
    
    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, []);
    
    return (
        <nav
            className={`bg-white pb-5 md:text-sm ${
                state ?
                "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border:none md:mx-2 md:mt-0"
                : "" }`}>
            <div className={"gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8 select-none"}>
                <div className={"flex items-center justify-between py-5 md:block"}>
                    <a href={"javascript:void(0)"}>
                        <img src={"https://floatui.com/logo.svg"}
                            width={120}
                            height={50}
                            alt={"app logo"}/>
                    </a>
                    <div className={"md:hidden"}>
                        <button
                            className={"menu-btn text-gray-200 hover:text-blue-900"}
                            onClick={() => setState(!state)}>
                            {state ? <Nav1/> : <Nav2/>}
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                    state ? "block":"hidden"}`}>
                    <ul className={"justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0"}>
                        {navigation.map((item,idx) => {
                            return (
                                <li key={idx} className={"text-gray-700 hover:text-gray-900 hover:scale-110"}>
                                    <a href={item.path} className={"block"}>
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={"flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0"}>
                        {currentUser ? (
                            <p className={"flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium"+
                                " bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gray-800 active:bg-gray-900 rounded-full md:inline-flex"}>
                                Connected Wallet: {currentUser.slice(0,15)}...{currentUser.slice(-4)}
                            </p>
                        ):(
                            <button
                                onClick={() => connectWallet()}
                                className={"flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium"+
                                    " bg-gray-800 hover:gray-500 hover:text-white active:bg-gray-900 rounded-full md:inline-flex"}>
                                Connect Wallet
                                <Nav3/>
                            </button>)}
                    </div>
                </div>
            </div>
        </nav>
    );
};