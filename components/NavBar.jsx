"use client"
import {useEffect, useState, useContext} from "react";

import {TrackingContext} from "@/context/Tracking";
import {Nav1, Nav2, Nav3} from "@/components/index"
import Images from "@/assets/index";
import Image from "next/image";

import "../app/globals.css";

export default() => {
    const {currentUser, connectWallet, disconnectWallet, getBalance} = useContext(TrackingContext);
    
    const [state, setState] = useState(false);
    const [balance, setBalance] = useState("0.000");
    
    const navigation = [
        {title:"Tracking history",path:"#history"},
        {title:"Serivces",path:"#services"},
        {title:"Docs",path:"#"},
        {title:"Source",path:"#"}
    ];
    
    useEffect(() => {
        const fetchBalance = async() => {
            const fetchedBalance = await getBalance(currentUser);
            setBalance(fetchedBalance);
        };
        
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        }
        
        fetchBalance();
    }, [currentUser, getBalance]);
    
    return (
        <nav
            className={`bg-white pb-5 md:text-sm ${
                state ?
                "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border:none md:mx-2 md:mt-0"
                : "" }`}>
            <div className={"gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8 select-none border-b"}>
                <div className={"flex items-center justify-between py-5 md:block"}>
                    <a href={"javascript:void(0)"}>
                        <Image
                            width={220}
                            height={100}
                            quality={100}
                            priority={true}
                            src={Images.brandicon} alt={""}/>
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
                                <li key={idx} className={"text-gray-700 text-md hover:text-gray-900 hover:scale-110 text-[1.1em]"}>
                                    <a href={item.path} className={"block"}>
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={"flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0"}>
                        {currentUser ? (
                            <div className={"flex items-start gap-2 mt-8"}>
                                <div className={"flex flex-col"}>
                                    <p className={"flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium " +
                                        " bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gray-800 active:bg-gray-900 rounded-full md:inline-flex"}>
                                        Connected Wallet: {currentUser.slice(0, 10)}...{currentUser.slice(-5)}
                                    </p>
                                    <div className={`mt-1 text-right mr-5`}>
                                        <span className={"font-bold text-gray-500"}>Balance (CRST):
                                            <span className={"font-bold text-gray-800 text-lg"}> {balance} </span>
                                        </span>
                                    </div>
                                </div>
                                <button onClick={() => disconnectWallet()}
                                        className={"flex items-center justify-center text-white px-2 py-2 text-sm bg-gray-800 hover:bg-gray-500 rounded-lg ml-2"}>
                                    Disconnect Wallet
                                </button>
                            </div>
                        
                        ) : (
                            <button
                                onClick={() => connectWallet()}
                                className={"flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium" +
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