import { createContext, useContext, useState } from "react";

const sideContext = createContext();

export const useSide = () => {
    const value = useContext(sideContext);
    return value
}

export const SidebarProvider = ({ children }) => {
    const [activeName, setActiveName] = useState(null);
    const companyText = [
        {
            id: 1,
            companyName: "Poland Office",
            hash: "#"
        },
        {
            id: 2,
            companyName: "Introduction",
            hash: "#"
        },
        {
            id: 3,
            companyName: "India Office",
            hash: "#"
        }
    ]

    const handleChatRoom = (roomname)=>{
        setActiveName(roomname);
    }
    return (
        <sideContext.Provider value={{ companyText, handleChatRoom, activeName }}>
            {children}
        </sideContext.Provider>
    )
}