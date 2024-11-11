"use client";

import {Str1} from "@/components/index";
import Image from "next/image";

export default function HelpModal({getHelpModal, setHelpModal})  {
    const items = [
        {
            name:"Add tracking",
            desc:"Register a new tracking for shipment to the blockchain."
        },
        {
            name:"Get Shipment",
            desc:"Check out full details of a shipment using ID."
        },
        {
            name:"Start Shipment",
            desc:"Update the shipment's status from Pending to In Transit (Shipping)."
        },
        {
            name:"Complete Shipment",
            desc:"Confirm a shipment's arrival. Update from status from  In Transit to Delivered."
        },
        {
            name:"User Profile",
            desc:"Check current stats of selected wallet address."
        },
        {
            name:"Shipment Counts",
            desc:"View shipment's details based on ID."
        },
        {
            name:"Send Shipment",
            desc:"View shipment's details based on ID."
        }
    ]
    return getHelpModal ? (
        <div className={"fixed inset-0 z-10 overflow-y-auto"}>
            <div className={"fixed inset-0 w-full h-full bg-black opacity-40"}
                 onClick={() => setHelpModal(false)}></div>
            <div className={"items-center min-h-screen px-4 py-8"}>
                <div className={"relative w-full max-w-xl p-4 mx-auto bg-white rounded-md shadow-lg"}>
                    <div className={"flex justify-end"}>
                        <button className={"p-2 text-gray-400 rounded-md hover:bg-gray-100"}
                                onClick={() => setHelpModal(false)}>
                            <Str1/>
                        </button>
                    </div>
                    <div className={"max-w-sm mx-auto py-3 space-y-3 text-center"}>
                        <h5 className={"text-md font-medium text-gray-800 border-b pb-3"}>
                            Quick Overview
                        </h5>
                        <table className={"table-auto w-full text-sm text-left border-separate"}>
                            <tbody className={"border cursor-pointer"}>
                            {items.map((item) => (
                                <tr className={"text-gray-800 font-medium border-b border-t"}>
                                    <td className={"w-[200px] bg-gray-200 hover:bg-indigo-800 hover:text-white p-2 border text-[15px] tdcus"}> {item.name} </td>
                                    <td className={"w-[240px] p-2 tdcus text-gray-500 text-[14px]"}> {item.desc} </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <p className={"text-sm text-left border-t border-b p-2"}>For a full documented instructions,
                            or any issues encountered please visit:
                            <span className={"italic"}> https://logi-block.com/helps.org</span></p>
                    </div>
                </div>
            </div>
        </div>
    ) : ("")
}