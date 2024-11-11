"use client";

import {useState, useEffect} from "react";
import Images from "@/assets/index"
import Image from "next/image";
import {Str1} from "@/components/index";


export default({
    openProfile,
    setOpenProfile,
    currentUser,
    getShipmentCount,
}) => {
    const [count, setCount] = useState();
    useEffect(() => {
        const getShipmentsData = getShipmentCount();
        
        return async()=>{
            const allData = await getShipmentsData;
            setCount(allData);
        };
    },[]);
    
    return openProfile ? (
        <div className={"fixed inset-0 z-10 overflow-y-auto"}>
            <div className={"fixed inset-0 w-full h-full bg-black opacity-40"}
                 onClick={() => setOpenProfile(false)}></div>
            <div className={"flex items-center min-h-screen px-4 py-8"}>
                <div className={"relative w-full max-w-lg px-4 mx-auto bg-white rounded-md shadow-lg"}>
                    <div className={"flex justify-end"}>
                        <button className={"mt-5 p-3 text-gray-500 rounded-md hover:bg-gray-100"}
                                onClick={() =>  setOpenProfile(false)}>
                            <Str1/>
                        </button>
                    </div>
                    <div className={"max-w-sm mx-auto py-3 space-y-3 text-center"}>
                        <div className={"flex flex-col items-center pb-10 gap-3"}>
                            <h5 className={"mb-5 text-xl font-medium text-gray-900 dark:text-white"}>
                                User Profile
                            </h5>
                            <Image
                                className={"w-24 h-24 mb-3 rounded-full shadow-lg"}
                                src={Images.avatar}
                                alt={"user-avatar"}
                            />
                            <div>
                            
                            </div>
                            <span className={"text-left text-sm text-gray-500 dark:text-gray-400"}>
                                <span
                                    className={"font-bold"}>Wallet Address: </span>{currentUser.slice(0, 20)}...{currentUser.slice(-5)}
                            </span>
                            <span className={" text-left text-sm text-gray-500 dark:text-gray-400"}>
                                <span
                                    className={"font-bold"}>Total shipments count: </span>{count}
                            </span>
                            <span className={" text-left text-sm text-gray-500 dark:text-gray-400"}>
                                <span
                                    className={"font-bold"}>Wallet Address: </span>{currentUser.slice(0, 20)}...{currentUser.slice(-5)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : ("")
}