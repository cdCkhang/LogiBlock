export default ({ setCreateShipmentModel, allShipmentData }) => {
    const convertTime = (time) => {
        const newTime = new Date(time);
        const dateTime = Intl.DateTimeFormat("en-us",{
            year:"numeric",
            month:"2-digit",
            day:"2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }).format(newTime);
        
        return dateTime;
    };
    
    const epochToDateTime = (epoch) => {
        if (epoch === 0)
            return 0
        const date = new Date(epoch * 1000); // Convert seconds to milliseconds
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    
    console.log(allShipmentData);
    
    return (
        <div id ={"history"} className={"max-w-screen-xl mx-auto px-4 md:px-8"}>
            <div className={"items-start justify-between md:flex "}>
                <div className={"max-w-lg"}>
                    <h5 className={"text-gray-800 text-xl font-bold sm:text-2xl"}>
                        Tracking history
                    </h5>
                    <p className={"text-gray-600 mt-2 text-[18px]"}>
                        View or create a new tracking record for your products.
                    </p>
                </div>
                <div className={"mt-3 md:mt-0"}>
                    <p onClick={() => setCreateShipmentModel(true)}
                       className={"inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700" +
                           " active:bg-gray-900 md:text-sm rounded-lg md:inline-flex cursor-pointer select-none"}>
                        Add Tracking
                    </p>
                </div>
            </div>
            <div className={"mt-12 shadow-sm border rounded-lg overflow-auto"}>
                <table className={"w-full table-auto text-sm text-left"}>
                    <thead className={"bg-gray-200 text-gray-600 font-medium border-b"}>
                    <tr>
                        <th className={"py-3 px-6 bg-yellow-200"}>Sender</th>
                        <th className={"py-3 px-6 bg-green-200"}>Receiver</th>
                        <th className={"py-3 px-6 bg-red-300"}>Pick up time</th>
                        <th className={"py-3 px-6 bg-orange-200"}>Distance</th>
                        <th className={"py-3 px-6 bg-purple-300"}>Price</th>
                        <th className={"py-3 px-6 bg-blue-300"}>Delivery time</th>
                        <th className={"py-3 px-6 bg-indigo-400"}>Paid status</th>
                        <th className={"py-3 px-6 bg-green-500"}>Shipment's status</th>
                    </tr>
                    </thead>
                    {allShipmentData && allShipmentData.length > 0 ? (
                        <tbody className={"text-gray-600 divide-y"}>
                        {allShipmentData.map((shipment, idx) => (
                            <tr key={idx} className={"even:bg-gray-100"}>
                                <td className={"px-6 py-4 whitespace-nowrap"}>
                                    {shipment.sender.slice(0, 15)}...{shipment.sender.slice(-3)}
                                </td>
                                <td className={"px-6 py-4 whitespace-nowrap"}>
                                    {shipment.receiver.slice(0, 15)}...{shipment.receiver.slice(-3)}
                                </td>
                                <td className={"px-6 py-4 whitespace-nowrap"}>
                                    {convertTime(shipment.pickupTime)}...
                                </td>
                                <td className={"px-6 py-4 whitespace-nowrap"}>
                                    {shipment.distance} Km
                                </td>
                                <td className={"px-6 py-4 whitespace-nowrap"}>
                                    {shipment.price}
                                </td>
                                <td className={"px-6 py-4 whitespace-nowrap"}>
                                    {epochToDateTime(shipment.deliveryTime) === 0 ? "Awaiting Arrival."
                                        : epochToDateTime(shipment.deliveryTime)}
                                </td>
                                <td className={"px-6 py-4 whitespace-nowrap"}>
                                    {shipment.isPaid ? "Completed" : "Not Complete"}
                                </td>
                                <td className={"px-6 py-4 whitespace-nowrap"}>
                                    {shipment.status === 0 ? "Pending 📤"
                                        : shipment.status === 1 ? "In Transit 🚚"
                                            : "Delivered ✔️"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    ) : (
                        <tbody>
                        <tr>
                            <td colSpan="8" className="text-center text-lg text-gray-600 py-4">No tracking record found</td>
                        </tr>
                        </tbody>
                    )}
                </table>
            </div>
        
        </div>
    )
}