"use client";

import {useState} from "react";
import {Str1} from "@/components/index"

export default ({ startModal, setStartModal, startShipment, currentUser}) => {
    const [getProduct, setGetProduct] = useState({
        receiver: "",
        sender:"",
    });
    
    const startShipping = () => {
        startShipment(getProduct);
        setStartModal(false);
        window.location.reload();
    };
    
    return startModal ? (
        <div className={"fixed inset-0 z-10 overflow-y-auto"}>
            <div className={"fixed inset-0 w-full h-full bg-black opacity-40"}
            onClick={() => setStartModal(false)}></div>
            <div className={"flex items-center min-h-screen px-4 py-8"}>
                <div className={"relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"}>
                    <div className={"flex justify-end"}>
                        <button className={"p-2 text-gray-400 rounded-md hover:bg-gray-100"}
                        onClick={()=>setStartModal(false)}>
                            <Str1/>
                        </button>
                    </div>
                    <div className={"max-w-sm mx-auto py-3 space-y-3 text-center"}>
                        <h5 className={"text-md font-medium text-gray-800"}>
                            Start shipping product
                        </h5>
                        
                        <ol className={"text-left text-sm border-b border-t p-4"}>
                            <li className={"font-bold"}> Usage Info:</li>
                            <li>1) Check for shipment's ID in Get Shipment.</li>
                            <li>2) Start shipping will update Shipment's status to [In Transit].</li>
                        </ol>
                        <div className={"text-left text-sm border-b pb-3"}>
                            Current selected wallet: {" "}
                            <span className={"font-bold"}>{currentUser}..</span>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={"relative mt-4 text-[16px]"}>
                                <input type={"text"}
                                       placeholder={"Receiver's address"}
                                       className={"w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none" +
                                           " border focus:border-indigo-500 shadow-sm rounded-lg"}
                                       onChange={(e) =>
                                           setGetProduct({
                                               ...getProduct,
                                               receiver: e.target.value,
                                           })
                                       }
                                />
                            </div>
                            <div className={"relative mt-3 text-[16px]"}>
                                <input type={"text"}
                                       placeholder={"Shipment's ID"}
                                       className={"w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none" +
                                           " border focus:border-indigo-500 shadow-sm rounded-lg"}
                                       onChange={(e) =>
                                           setGetProduct({
                                               ...getProduct,
                                               index: e.target.value,
                                           })
                                       }
                                />
                            </div>
                            <button onClick={() => startShipping()}
                                    className={"block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white" +
                                        " bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2" +
                                        " ring-indigo-600 focus:ring-2"}>
                                Start shipping
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : ("")
}
