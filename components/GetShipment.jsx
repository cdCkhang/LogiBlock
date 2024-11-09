"use client";
import {useState} from "react";
import {Str1} from "@/components/index";
import Assets from "@/assets/svg/output-svgrepo-com.svg";


export default ({ getModel, setGetModel, getShipment, currentUser}) => {
    const [index,setIndex] = useState(0);
    const [submittedValue, setSubmittedValue] = useState(-1);
    
    // set shipment data. Invoke at Line 62
    const [singleShipmentData, setSingleShipmentData] = useState();
    
    const getShipmentData = async() => {
        const getData = await getShipment(index);
        setSingleShipmentData(getData);
        console.log("fetched data: ",getData);
    };
    
    console.log("after fetch: ",singleShipmentData);
    const getSubmittedValue = (e) => {
        setSubmittedValue(index);
        e.preventDefault();
    }
    const converTime = (time) => {
        const newTime = new Date(time);
        return new Intl.DateTimeFormat("en-us", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }).format(newTime);
    };
    
    const epochToDateTime = (epoch) => {
        if (epoch === 0)
            return 0;
        const date = new Date(epoch * 1000); // Convert seconds to milliseconds
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    
    return getModel ? (
        <div className={"fixed inset-0 z-10 overflow-y-auto"}>
            <div className={"fixed inset-0 w-full h-full bg-black opacity-40"}
                 onClick={() => setGetModel(false)}></div>
            <div className={"flex items-center min-h-screen px-4 py-8"}>
                <div className={"relative w-full max-w-lg px-4 mx-auto bg-white rounded-md shadow-lg"}>
                    <div className={"flex justify-end"}>
                        <button className={"mt-5 p-3 text-gray-500 rounded-md hover:bg-gray-100"}
                                onClick={() =>  setGetModel(false)}>
                            <Str1/>
                        </button>
                    </div>
                    <div className={"max-w-sm mx-auto py-3 space-y-3 text-center"}>
                        <h5 className={"text-lg font-medium text-gray-800"}>
                            Product Tracking Details
                        </h5>
                        <div className={"text-left text-sm border-b border-t p-3"}>
                            <p className={"font-bold"}>Usage guide:</p>
                            <p className={""}>1) Enter Shipment's ID to checkout details.</p>
                            <p className={""}>2) Make sure select the correct wallet.</p>
                        </div>
                        <div className={"text-left text-sm border-b pb-3"}>
                            Current selected wallet: {" "}
                            <span className={"font-bold"}>{currentUser}..</span>
                        </div>
                        <form onSubmit={(e) => getSubmittedValue(e)}>
                            <div className={"relative mt-3 "}>
                                <input type={"number"} placeholder={"ID"}
                                className={"w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border" +
                                    " focus:border-indigo-600 shadow-sm rounded-lg text-sm"}
                                onChange={(e) => setIndex(e.target.value)}/>
                            </div>
                            <button onClick={() => getShipmentData()}
                            className={"block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white" +
                                " bg-indigo-700 hover:bg-indigo-400 active:bg-indigo-500 rounded-lg ring-offset-2" +
                                " ring-indigo-600 focus:ring-2 mb-5"}>
                                Get shipment's details
                            </button>
                        </form>
                        {singleShipmentData === undefined ? (""):(
                            <div className={"text-left text-[14px] py-5 p-5"}>
                                <p className={"text-left font-bold  text-md"}> Shipment #{submittedValue} details: </p>
                                <table className={"table-auto border-separate"}>
                                    <tbody>
                                    <tr>
                                        <td className={"w-[200px] text-left bg-yellow-300 p-2 font-bold cursor-pointer"}>
                                            Sender
                                        </td>
                                        <td className={"p-2 bg-gray-100"}>
                                            {singleShipmentData.sender.slice(0, 20)}....{singleShipmentData.sender.slice(-4)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"text-left bg-green-300 p-2 font-bold cursor-pointer"}>
                                            Receiver
                                        </td>
                                        <td className={"p-2 bg-gray-100"}>
                                            {singleShipmentData.receiver.slice(0, 20)}....{singleShipmentData.receiver.slice(-4)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"text-left bg-orange-400 p-2 font-bold cursor-pointer"}>
                                            Pick up time
                                        </td>
                                        <td className={"p-2 bg-gray-100"}>
                                            {converTime(singleShipmentData.pickupTime)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"text-left bg-gray-200 p-2 font-bold cursor-pointer"}>
                                            Delivery time
                                        </td>
                                        <td className={"p-2 bg-gray-100"}>
                                            {epochToDateTime(singleShipmentData.deliveryTime)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"text-left bg-purple-300 p-2 font-bold cursor-pointer"}>
                                            Cost
                                        </td>
                                        <td className={"p-2 bg-gray-100"}>
                                            {singleShipmentData.price}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"w-[200px] text-left bg-blue-200 p-2 font-bold cursor-pointer"}>
                                            Shipment status
                                        </td>
                                        <td className={"p-2 bg-gray-100"}>
                                            {singleShipmentData.status === 0 ? "Pending" :
                                                singleShipmentData.status === 1 ? "In Transit" : "Completed"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={"text-left bg-rose-300 p-2 font-bold cursor-pointer"}>
                                            Payment status
                                        </td>
                                        <td className={"p-2 bg-gray-100"}>
                                            {" "} {singleShipmentData.isPaid ? "Completed" : "Not completed"}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ):("");
}