import { useSide } from "../../context/SideBarContext";
import "./Chatsection.css";
import { PiUsersBold } from "react-icons/pi";
import { FcLikePlaceholder } from "react-icons/fc";
import { BsSend } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react'
import { useChat } from "../../context/ChatSection";
import { useEffect } from "react";

export const ChatSection = () => {
    const { activeName } = useSide();
    const { showEmoji, 
        handleEmojiClick, 
        inputText, 
        handleInputChange, 
        handleSentMessage,
        messages,
        handleEmojiSelect,
        chatContainerRef,
        usersColor,
        handleLikes,
        handleUserSelect,
        showUserList,
        filterUser,
        user_list   
    } = useChat();

    return (
        <>
            <main className="main-container">
                {activeName ? (
                    <>
                        <div className="first-container">
                            <div className="company-heading">
                                <p className="company-name">{activeName}</p>
                                <p className="about-chat-group">This Channel Is For Company Wide Center</p>
                            </div>
                            <div className="second-container">
                                <div className="count-member">{user_list.length}/100</div>
                                <div>
                                    <PiUsersBold className="user-icon" />
                                </div>
                            </div>
                        </div>
                        <hr className="horizontal-line" />
                        <div className="chat-text-container" ref={chatContainerRef }>
                            <ul className="main-ul-tag">
                                {messages.map((item, index)=>(
                                    <li className="messages-show" key={index}>
                                    <div className="name-time-box">
                                        <div className="user-name-logo" style={{backgroundColor: usersColor[item.nameLogo]}}>
                                            <span>{item.nameLogo}</span>
                                        </div>
                                        <div className="user-name-text">{item.userName}</div>
                                        <small className="time">{item.timeHour}:{item.timeMinute}</small>
                                    </div>
                                    <div className="chat-text-box">
                                        <p className="chat-text">{item.message}</p>
                                        <div className="likes-container">
                                            <small className="like-icon" onClick={()=>handleLikes(index)}>
                                                <FcLikePlaceholder />
                                            </small>
                                            <small className="like-count">{item.likes}</small>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="input-container">
                            <input type="text"
                            value={inputText}
                            onChange={handleInputChange} 
                            placeholder="write your message here..." className="input-text"
                            onKeyPress={(e)=>e.key==='Enter'?handleSentMessage():null} />
                            <button className="send-button" onClick={handleSentMessage}>
                                <BsSend className="send-icon" />
                            </button>
                            <button onClick={handleEmojiClick} className="emoji-toggle">😀</button>
                        </div>
                        <div className="emoji-picker-container">
                            <div className="emoji-picker-wrapper">
                                {showEmoji && <EmojiPicker onEmojiClick={handleEmojiSelect} className="input-emoji" />}
                            </div>
                        </div>
                        {showUserList && (
                            <ul className="user-list-dropdown">
                                {filterUser.map(user=>(
                                    <li key={user} onClick={()=>handleUserSelect(user)}>
                                        {user}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <div>No chat Room</div>
                )}
            </main>
        </>
    )
}


