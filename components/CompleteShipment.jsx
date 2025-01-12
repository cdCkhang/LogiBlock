"use client";

import {useState} from "react";
import {Str1} from "@/components/index";

export default ({ completeModal, setCompleteModal, completeShipment}) => {
    const [completeShip, setCompleteShip] = useState({
        receiver: "",
        index: "",
    });
    
    const changeStatus = async() => {
        completeShipment(completeShip);
        setCompleteModal(false);
        window.location.reload();
    };
    
    return completeModal ? (
        <div className={"fixed inset-0 z-10 overflow-y-auto"}>
            <div className={"fixed inset-0 w-full h-full bg-black opacity-40"}
                onClick={()=>setCompleteModal(false)}></div>
            <div className={"flex items-center min-h-screen px-4 py-8"}>
                <div className={"relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"}>
                    <div className={"flex justify-end"}>
                        <button className={"p-2 text-gray-400 rounded-md hover:bg-gray-700"}
                            onClick={() => setCompleteModal(false)}>
                            <Str1/>
                        </button>
                    </div>
                    <div className={"max-w-sm mx-auto py-3 space-y-3 text-center"}>
                        <h5 className={"text-lg font-medium text-gray-800"}>
                            Complete a shipment
                        </h5>
                        <p className={"text-left font-bold text-sm text-gray-800 border-t"}>Usage guide:</p>
                        <ol className={"text-left text-sm text-gray-600 border-b"}>
                            <li><span className={"text-gray-800 font-bold"}>1) </span>Set a shipment's status to completed.</li>
                            <li><span className={"text-gray-800 font-bold"}>2) </span>Get shipment details to make sure,
                                setting the correct shipment.</li>
                        </ol>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={"relative mt-3 "}>
                                <input type={"text"} placeholder={"Receiver's address"}
                                       className={"w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border" +
                                           " focus:border-indigo-600 shadow-sm rounded-lg text-sm"}
                                       onChange={(e) =>
                                           setCompleteShip({
                                               ...completeShip,
                                               receiver: e.target.value,
                                           })}
                                />
                            </div>
                            <div className={"relative mt-3 "}>
                                <input type={"number"} placeholder={"Shipment's ID"}
                                       className={"w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border" +
                                           " focus:border-indigo-600 shadow-sm rounded-lg text-sm"}
                                       onChange={(e) =>
                                           setCompleteShip({
                                               ...completeShip,
                                               index: e.target.value,
                                           })}
                                />
                            </div>
                            <button onClick={() => changeStatus()}
                                    className={"block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white" +
                                        " bg-indigo-700 hover:bg-indigo-400 active:bg-indigo-500 rounded-lg ring-offset-2" +
                                        " ring-indigo-600 focus:ring-2"}>
                                Confirm shipment's arrival
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : ("");
}