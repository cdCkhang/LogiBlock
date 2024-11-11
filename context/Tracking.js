"use client";
import React , {useState, useEffect} from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";

import tracking from "/context/Tracking.json"
const ContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ContractABI = tracking.abi;
    
// --- GET user's contract
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
    
export const TrackingContext = React.createContext();


export const TrackingProvider = ({ children }) => {
        
    const dAppName = "Logistics Product Tracking App"
    const [currentUser, setCurrentUser] = useState("");
        
    const createShipment = async(items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price } = items;
        try{
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseEther(price.toString()),
                {
                    value: ethers.utils.parseEther(price.toString())
                });
            await createItem.wait();
            console.log(createItem);
        } catch(error) {
            console.log("Error: ", error);
        }
    };
        
    const getAllShipment = async() => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
                
            const shipments = await contract.getAllTransaction();
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status
            }));
                
            return allShipments;
        } catch(error) {
            console.log(">> Error in function[getAllShipment]: ",error)
        }
    };
        
    const getShipmentCount = async() => {
        try{
            if(!window.ethereum){
                return "Install metamask"
            }
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipmentCount = await contract.getShipmentCount(accounts[0]);
            return shipmentCount.toNumber();
        }  catch(error) {
            console.log("error at getShipmentCount: ",error)
        }
    }
        
    const completeShipment = async(completeShip) => {
        console.log(completeShip);
            
        const {receiver, index} = completeShip;
        try {
            if (!window.ethereum) return "Install metamask";
                
            const accounts = await window.ethereum.request({
                method:"eth_accounts"
            });
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
                
            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index,
                {
                    gasLimit: 300000
                });
            transaction.wait();
            console.log(transaction);
        } catch(error){
            console.log("Error at completeShipment", error);
        }
    };
        
    const getShipments = async(index) => {
        console.log(index * 1);
        try{
            if(!window.ethereum) return "Install metamask";
                
            const accounts = await window.ethereum.request({
                method:"eth_accounts"
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipments(accounts[0],index * 1);
                
            const singleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid:shipment[7]
            };
            return singleShipment;
        } catch(error){
            console.log("error at getting shipment: ",error);
        }
    }
        
    const startShipment = async(getProduct) =>{
        const {receiver, index} = getProduct;
            
        try{
            if(!window.ethereum) return "Install metamask"
            const accounts = await window.ethereum.request({
                method:"eth_accounts"
            });
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(
                accounts[0],
                receiver,
                index * 1
            );
            shipment.wait();
            console.log(shipment);
        }catch(error){
            console.log("Error in function startShipment: ",error);
        }
    }
        
    const checkIfWalletConnected = async() => {
            try{
                if (!window.ethereum) return "Install metamask";
                
                const accounts = await window.ethereum.request({
                   method:"eth_accounts"
                });
                
                if (accounts.length){
                    setCurrentUser(accounts[0]);
                }else{
                    return "No account associated."
                }
            }catch(error){
                console.log("Error in function checkIfWalletConnected: ",error);
            }
        }
        const connectWallet = async() => {
        try{
            if (!window.ethereum) return "Install MetaMask";
                
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setCurrentUser(accounts[0]);
        }catch(error){
            return "Account connection went wrong";
        }
    };
 
    // Function to get and format balance
    const getBalance = async (address) => {
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            
            // Get balance in Wei
            const balance = await provider.getBalance(address);
            
            // Convert Wei to ETH and format it
            const formattedBalance = ethers.utils.formatEther(balance);
            
            return parseFloat(formattedBalance).toFixed(4);
        } catch (error) {
            console.log("Error getting balance: ", error);
            return "0.0000";
        }
    };
        
    const disconnectWallet = async () => {
        const web3Modal = new Web3Modal();
        web3Modal.clearCachedProvider();
        
        const itemsToRemove = [
            'walletconnect',
            'WALLETCONNECT_DEEPLINK_CHOICE',
            'connectorId',
            'WEB3_CONNECT_CACHED_PROVIDER',
            'wagmi.store',
            'wagmi.wallet',
            'wagmi.connected',
            'wagmi.account',
            'wagmi.injected.shimDisconnect',
            '-walletlink:https://www.walletlink.org:version',
            '-walletlink:https://www.walletlink.org:session:id',
            '-walletlink:https://www.walletlink.org:session:secret',
            '-walletlink:https://www.walletlink.org:session:linked'
        ];
        
        itemsToRemove.forEach(item => {
            if(localStorage.getItem(item)) {
                localStorage.removeItem(item);
            }
        });
        sessionStorage.clear();
        setCurrentUser(null);
        
        setTimeout(() => {
            window.location.reload();
        },200);
        
    };
    
    const checkAccountChanges = async() => {
        // Add Listeners for Accounts Changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setCurrentUser(accounts[0]);
                } else {
                    setCurrentUser(null);
                }
            });
            
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }
        
        // Cleanup function to remove listeners
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', () => {});
                window.ethereum.removeListener('chainChanged', () => {});
            }
        };
    }
    useEffect(() => {
        checkIfWalletConnected();
        checkAccountChanges();
       
        }, []);
        
    return (
        <TrackingContext.Provider
            value = {{
                connectWallet,
                createShipment,
                getAllShipment,
                completeShipment,
                getShipments,
                startShipment,
                getShipmentCount,
                getBalance,
                disconnectWallet,
                dAppName,
                currentUser
        }}
        >
            {children}
        </TrackingContext.Provider>
    )
}
    
    
