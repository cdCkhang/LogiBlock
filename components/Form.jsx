"use client";

import {useState} from "react"

export default ({
    setCreateShipmentModel,
    createShipmentModel,
    createShipment
}) => {
    const text = {
        usageGuide:{
            headline: "Add new tracking for your shipment",
            info: "Usage guide:",
            step1:"Double check the current connected wallet address and the recipient's address.",
            step2: "Fill in all the fields and click to confirm new tracking.\n"
        },
        components:{
            buttonConfirm : "Create new tracking"
        }
    }
    const [shipment,setShipment] = useState({
        receiver: "",
        pickupTime: "",
        distance: "",
        price: "",
    });
    
    
    const [date,setDate] = useState('');
    const [IsUseCurrentTime,setIsCurrentTime] = useState(false);
    
    const handleTimeInputSelection = (e) => {
        const calendarInput = document.getElementById("timeField");
        if (e.target.value === "timeStamp"){
              setIsCurrentTime(true);
              setDate(Date.now());
              calendarInput.value="";
        }
        else{
              setIsCurrentTime(false);
        }
    };
    
    const createItem = async() => {
        try{
            console.log(shipment);
            console.log(date);
            await createShipment(shipment);
            setCreateShipmentModel(false);
            // window.location.reload();
        }catch(error){
            console.log(">> Form module error:  create Item to error: ",error)
        }
    };
    
    const handleSubmission = () => {
        const dateNow = IsUseCurrentTime ? Date.now() : date
        setShipment({
            ...shipment,
            pickupTime: dateNow,
        })
        createItem();
    }
    
    return createShipmentModel ? (
        <div className={"fixed inset-0 z-10 overflow-y-auto"}>
            <div className={"fixed inset-0 w-full h-full bg-black opacity-40"}
                 onClick={() => setCreateShipmentModel(false)}> </div>
            <div className={"flex items-center min-h-screen px-5 py-2"}>
                <div className={"relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"}>
                    <div className={"flex justify-end"}>
                        <button className={"p-2 text-gray-400 rounded-md hover:bg-gray-100"}
                                onClick={() => setCreateShipmentModel(false)}>
                            <svg
                                xmlns={"https://www.w3.org/2000/svg"}
                                className={"w-5 h-5 mx-auto"}
                                viewBox={"0 0 13 13"}
                                fill={"currentColor"}>
                                <polyline className="arrow" fill="none" stroke="currentColor"
                                          points="1 1,6.5 6.5,12 1"/>
                                <polyline className="arrow" fill="none" stroke="currentColor"
                                          points="1 12,6.5 6.5,12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className={"max-w-sm mx-auto py-8 space-y-3 text-center"}>
                        <h5 className={"text-xl font-medium text-gray-800"}>
                            {text.usageGuide.headline}
                        </h5>
                        <p className={"text-left font-bold text-sm text-gray-800 border-t"}>{text.usageGuide.info}</p>
                        <ol className={"text-left text-sm text-gray-600 border-b"}>
                            <li><span className={"font-bold"}>1)</span> {text.usageGuide.step1}</li>
                            <li><span className={"font-bold"}>2)</span> {text.usageGuide.step2}</li>
                        </ol>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={"relative mt-5"}>
                                <input type={"text"} placeholder={"Receiver's address"}
                                       className={"w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none" +
                                           " border focus:border-indigo-600 shadow-sm rounded-lg text-sm"}
                                       onChange={(e) =>
                                           setShipment({
                                               ...shipment,
                                               receiver: e.target.value,
                                           })}>
                                </input>
                            </div>
                            <div className={"flex text-sm align-middle mt-3 mb-1 gap-5"}>
                                <div className={"flex text-sm align-middle"}>
                                    <input type={"radio"}
                                           name={"timeInput"}
                                           id={"manualTime"}
                                           value={"manualTime"}
                                           checked={!IsUseCurrentTime}
                                           onChange={(e) => handleTimeInputSelection(e)}/>
                                    <label className={"ml-1"} htmlFor={"manualTime"}>
                                        Enter manually
                                    </label>
                                </div>
                                <div className={"flex text-sm align-middle"}>
                                    <input type={"radio"}
                                           name={"timeInput"}
                                           id={"timeStamp"}
                                           value={"timeStamp"}
                                           checked={IsUseCurrentTime}
                                           onChange={(e) => handleTimeInputSelection(e)}/>
                                    <label className={"ml-1"}
                                           htmlFor={"timeStamp"}>
                                        Use current timestamp
                                    </label>
                                </div>
                            </div>
                            <div className={"relative"}>
                                <input id={"timeField"} type={"date"} placeholder={"Pick-up time"}
                                       className={`w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-non` +
                                           ` border focus:border-indigo-600 shadow-sm rounded-lg text-sm
                                           ${IsUseCurrentTime ?
                                               "cursor-not-allowed text-gray-300 readonly disabled:opacity-40":
                                               ""} `}
                                            onChange={(e) =>
                                                {const timestamp = new Date(e.target.value).getTime();
                                                setDate(timestamp)}}>
                                </input>
                            </div>
                            <div className={"relative mt-3"}>
                                <input type={"text"}
                                       placeholder={"Current distance"}
                                       className={"w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none" +
                                           " border focus:border-indigo-600 shadow-sm rounded-lg text-sm"}
                                       onChange={(e) =>
                                           setShipment({
                                               ...shipment,
                                               distance: e.target.value,
                                           })}>
                                </input>
                            </div>
                            <div className={"relative mt-3"}>
                                <input type={"text"} placeholder={"Product cost"}
                                       className={"w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none" +
                                           " border focus:border-indigo-600 shadow-sm rounded-lg text-sm"}
                                       onChange={(e) =>
                                           setShipment({
                                               ...shipment,
                                               price: e.target.value,
                                           })}>
                                </input>
                            </div>
                            <button onClick={() => handleSubmission()}
                                    className={"block w-full mt-3 py-3 px-4 font-medium text-sm text-center " +
                                        "text-white bg-indigo-600 hover:bg-indigo-400 active:bg-indigo-700 " +
                                        "rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"}>
                                {text.components.buttonConfirm}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : ("")
}