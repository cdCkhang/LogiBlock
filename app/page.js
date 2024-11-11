"use client"
import {useEffect, useState, useContext} from "react";
import './globals.css'
import {
    Table,
    Form,
    Services,
    Profile,
    CompleteShipment,
    GetShipment,
    StartShipment,
    HelpModal,
    ImageSlider,
} from "@/components/index";
import {TrackingContext} from "@/context/Tracking";
import Image from "next/image";


const index = () => {
    const {
        currentUser,
        createShipment,
        getAllShipment, // return epoch
        completeShipment,
        getShipments,
        startShipment,
        getShipmentCount,
        disconnectWallet,
    } = useContext(TrackingContext);
    
    // User state variable
    const [getHelpModal, setHelpModal] =useState(false);
    const [createShipmentModel, setCreateShipmentModel] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [startModal,setStartModal] = useState(false);
    const [completeModal,setCompleteModal] = useState(false);
    const [getModel, setGetModel] = useState(false);
    // Data state variable
    const [allShipmentsData,setAllShipmentsData] = useState()
    
    useEffect(() => {
        const getCampaignData = getAllShipment();
        
        return async() => {
            const allData = await getCampaignData;
            setAllShipmentsData(allData);
        }
    }, []);
    
    return (
        <div className="text-xl scroll-smooth">
            <ImageSlider/>
            <HelpModal
                getHelpModal={getHelpModal}
                setHelpModal={setHelpModal}
                />
            <Services
                setOpenProfile={setOpenProfile}
                setCompleteModal={setCompleteModal}
                setGetModel={setGetModel}
                setStartModal={setStartModal}
                setHelpModal={setHelpModal}
            />
            <Table
                setCreateShipmentModel={setCreateShipmentModel}
                allShipmentData={allShipmentsData}
            />
            <Form
                createShipmentModel={createShipmentModel}
                createShipment={createShipment}
                setCreateShipmentModel={setCreateShipmentModel}
            />
            <Profile
                openProfile={openProfile}
                setOpenProfile={setOpenProfile}
                currentUser={currentUser}
                getShipmentCount={getShipmentCount}
            />
            <CompleteShipment
                completeModal={completeModal}
                setCompleteModal={setCompleteModal}
                completeShipment={completeShipment}
            />
            <GetShipment
                getModel={getModel}
                setGetModel={setGetModel}
                currentUser={currentUser}
                getShipment={getShipments}
            />
            <StartShipment
                startModal={startModal}
                setStartModal={setStartModal}
                currentUser={currentUser}
                startShipment={startShipment}
            />
        </div>
    )
}

export default index;