import { addChannelInChannelList, addContactInDmList, addMessage } from "@/lib/store/slices/chats";
import { createContext, useContext, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);


export const useSocket = () => {
    return useContext(SocketContext)
}


export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { selectedChatType, selectedChatData } = useSelector((state) => state.chats);
    console.log(import.meta.env.VITE_SOCKET_URL)

    useEffect(() => {
        if (user) {
            console.log("Connecting with user ID:",user); // Log the user ID
            socket.current = io(
                import.meta.env.VITE_SOCKET_URL
                ||
                "http://localhost:3000", {
                withCredentials: true,
                query: { userId: user?._id },
                transports: ['websocket','polling'],
                secure: true,
                reconnectionAttempts: 5,
                timeout: 10000
            });
            socket.current.on("connect", () => {
                console.log("Connected to socket server from client");
            });



            const hanldeRecieveMessage = (message) => {
                dispatch(addMessage(message))
                dispatch(addContactInDmList(message))
            }

            const hanldeRecieveChannelMessage = (message) => {
                dispatch(addMessage(message))
                dispatch(addChannelInChannelList(message))
            }

            socket.current.on("recieveMessage", hanldeRecieveMessage)
            socket.current.on("recieve-channel-message", hanldeRecieveChannelMessage)

            return () => {
                socket.current.disconnect();
            };
        } else {
            console.log("No user logged in, socket not connected.");
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
}