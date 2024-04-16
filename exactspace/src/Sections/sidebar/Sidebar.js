import { CiCirclePlus } from "react-icons/ci";
import "./Sidebar.css";
import { useSide } from "../../context/SideBarContext";
import { useChat } from "../../context/ChatSection";
import { useEffect, useState } from "react";
export const Sidebar = () => {
    const { companyText, handleChatRoom } = useSide();
    const {messages, usersColor} = useChat();
    const [lastUserDetails, setLastUserDetails] = useState({name: null, color:null, logoName: null});

    useEffect(()=>{
        if(messages.length>0){
            const lastMessage = messages[messages.length-1];
            const userColor = usersColor[lastMessage.nameLogo];
            setLastUserDetails({name: lastMessage.userName, color: userColor, logoName: lastMessage.nameLogo});
        }
    },[messages, usersColor])
    return (
        <>
            <aside className="main-side-box">
                <div className="name-box">
                    <div className="name-logo" style={{backgroundColor: lastUserDetails.color}}>
                        <span className="logo-text">{lastUserDetails.logoName}</span>
                        <div className="dot"></div>
                    </div>
                    <div className="name-container">
                        <p className="user-name">{lastUserDetails.name}</p>
                        <span className="user-company">Teleperfomance</span>
                    </div>
                </div>
                <div className="second-text-container">
                    <div className="conversation-text">Conversation</div>
                    <div className="icon-container">
                        <CiCirclePlus
                            className="circle-icon"
                        />
                    </div>
                </div>
                {companyText.map((item) => (
                    <div className="third-container" onClick={()=>handleChatRoom(item.companyName)} key={item.id}>
                        <div className="hash-container">
                            <span className="hash-text">{item.hash}</span>
                        </div>
                        <div className="company-name-text">{item.companyName}</div>
                    </div>
                ))}
            </aside>
        </>
    )
}