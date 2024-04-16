import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import socketIO from 'socket.io-client';

const chatContext = createContext();

export const useChat = ()=>{
    const value = useContext(chatContext);
    return value
}

export const ChatProvider = ({children})=>{
    const [showEmoji, setShowEmoji] = useState(false);
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [usersColor, setUsersColor] = useState({});
    const [showUserList, setShowUserList] = useState(false);
    const [filterUser, setFilterUser] = useState([]);
    const [cursorPosition, setCursorPosition] = useState(null);
    const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const EndPoint = 'http://localhost:4000/';
    const socket = useMemo(()=>socketIO(EndPoint),[]);

    const chatContainerRef = useRef(null);

    // Function to scroll to the bottom of the chat container
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    // Scroll to bottom on initial render and whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleEmojiClick = ()=>{
        setShowEmoji(!showEmoji)
    }

    useEffect(() => {
        socket.on('messages', (newMessage) => {
            console.log("Received message", newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });
    
        return () => {
            socket.off("messages");
        };
    }, []);

    const handleSentMessage = () => {
        if (inputText.trim() === '') {
            return;
        }
        const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
        const newMessage = {
            userName: randomUser,
            message: inputText,
            likes: 0,
            nameLogo: randomUser.slice(0, 2),
            timeHour: hour.toString().padStart(2, '0'),
            timeMinute: minutes.toString().padStart(2, '0')
        };
        const randomColor = getRandomColor();
        const user = newMessage.nameLogo;
        if (!usersColor[user]) {
            setUsersColor({
                ...usersColor,
                [user]: randomColor
            });
        }
        socket.emit('send_message', newMessage);
        setInputText("");
        scrollToBottom(); 
    };


    const handleEmojiSelect = (emojiObject)=>{
        const {emoji} = emojiObject;
        setInputText(inputText+emoji)
    }

    const handleLikes = (index)=>{
        const newMessage = [...messages]
        newMessage[index].likes++
        setMessages(newMessage)
    }

    const getRandomColor = ()=>{
        const letters = "0123456789ABCDEF";
        let color = "#";
        for(let i=0; i<6; i++){
            color += letters[Math.floor(Math.random()*letters.length)]
        }
        return color
    }

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        setCursorPosition(e.target.selectionStart); // Update cursor position state
    };

    // Handling mentions
    useEffect(() => {
        const partOfTextUpToCursor = inputText.substring(0, cursorPosition);
        const match = /@(\w*)$/.exec(partOfTextUpToCursor);
        if (match) {
            setFilterUser(user_list.filter(user => user.toLowerCase().startsWith(match[1].toLowerCase())));
            setShowUserList(true);
        } else {
            setShowUserList(false);
            setFilterUser([]);
        }
    }, [inputText, cursorPosition, user_list]);

    const handleUserSelect = (user) => {
        const newText = inputText.replace(/@[\w]*$/, `@${user} `);
        setInputText(newText);
        setCursorPosition(newText.length); // Update cursor position after inserting user
        setShowUserList(false);
    };

    return(
        <chatContext.Provider value={{showEmoji, 
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
        user_list,
        filterUser 
        }}>
            {children}
        </chatContext.Provider>
    )
}