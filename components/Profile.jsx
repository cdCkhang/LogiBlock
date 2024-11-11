"use client";

import {useState, useEffect} from "react";
import Images from "@/assets/index"
import Image from "next/image";
import {Str1} from "@/components/index";

export default({
    openProfile,
    setOpenProfile,
    currentUser,
    allShipmentsData = [],
    getShipmentCount,
    getBalance,
}) => {
    const [shipmentsData, setShipmentsData] = useState([]);
    
    const [count, setCount] = useState();
    const [balance, setBalance] = useState('0.000');
    
    useEffect(() => {
        const fetchBalance = async() => {
            const fetchedBalance = await getBalance(currentUser);
            console.log(fetchedBalance);
            setBalance(fetchedBalance);
        }
        setShipmentsData(allShipmentsData);
        console.log("From profile call: ",shipmentsData);
        const getShipmentsData = getShipmentCount();
        fetchBalance();
        
        return async()=>{
            const allData = await getShipmentsData;
            setCount(allData);
        };
    },[currentUser, getBalance]);
    
    const getShipCounts = () => {
        let pendingCount = 0;
        let in_transitCount = 0;
        let deliveredCount = 0;
        shipmentsData.map((shipment) => (
            shipment.status === 0 ? pendingCount++ :
            shipment.status === 1 ? in_transitCount++ :
            deliveredCount ++
        ))
        return[pendingCount, in_transitCount, deliveredCount];
    }
    const ShipCounts = getShipCounts();
    
    return openProfile ? (
        <div className={"fixed inset-0 z-10 overflow-y-auto"}>
            <div className={"fixed inset-0 w-full h-full bg-black opacity-40"}
                 onClick={() => setOpenProfile(false)}></div>
            <div className={"flex items-center min-h-screen px-4 py-4"}>
                <div className={"relative w-full max-w-lg px-4 mx-auto bg-white rounded-md shadow-lg"}>
                    <div className={"flex justify-end"}>
                        <button className={"mt-5 p-3 text-gray-500 rounded-md hover:bg-gray-100"}
                                onClick={() =>  setOpenProfile(false)}>
                            <Str1/>
                        </button>
                    </div>
                    <div className={"max-w-sm mx-auto py-3 space-y-1 text-center"}>
                        <div className={"flex flex-col items-center pb-10 gap-3"}>
                            <h5 className={"mb-5 text-2xl font-medium text-gray-900 dark:text-white"}>
                                User Profile
                            </h5>
                            <Image
                                className={"w-48 h-48 mb-3 rounded-full shadow-lg"}
                                src={Images.avatar}
                                alt={"user-avatar"}
                            />
                            <div className={"text-center text-[18px] text-gray-800 font-bold"}>
                                General Information
                            </div>
                            <div className={"text-left text-sm text-gray-500 dark:text-gray-400"}>
                                <div>
                                    <span className={"font-bold text-gray-800"}>Wallet Address: </span>
                                    {currentUser.slice(0, 20)}...{currentUser.slice(-5)}
                                </div>
                                <div>
                                    <span className={"font-bold text-gray-800"}>Balance (Crystal) : </span>
                                    {balance}
                                </div>
                                <div>
                                    <span className={"font-bold text-gray-800"}>Total shipments count: </span>
                                    {count}
                                </div>
                                <table className={"w-full table-auto text-sm text-left mt-5 rounded-full"}>
                                    <caption className={"text-[16px] font-bold text-gray-800 mb-3"}> Shipments Stats </caption>
                                    <thead className={"bg-gray-200 text-gray-600 font-medium border-b"}>
                                    <tr>
                                        <th className={"py-2 px-6 bg-indigo-500 text-white"}>Status</th>
                                        <th className={"py-2 px-6 bg-teal-100 text-gray-500"}>Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className={"px-6 py-1 whitespace-nowrap border-b"}>
                                            Pending
                                        </td>
                                        <td className={"text-center text-gray-800 px-6 py-1 whitespace-nowrap border-b"}>
                                            {ShipCounts[0]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"px-6 py-1 whitespace-nowrap border-b"}>
                                        In Transit
                                        </td>
                                        <td className={"text-center text-gray-800 px-6 py-1 whitespace-nowrap border-b"}>
                                            0
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"px-6 py-1 whitespace-nowrap border-b"}>
                                        Delivered
                                        </td>
                                        <td className={"text-center text-gray-800 px-6 py-1 whitespace-nowrap border-b"}>
                                            0
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : ("")
}