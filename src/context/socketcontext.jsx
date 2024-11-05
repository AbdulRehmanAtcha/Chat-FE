import { addMessage } from "@/lib/store/slices/chats";
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

    useEffect(() => {
        if (user) {
            console.log("Connecting with user ID:", user?._id); // Log the user ID
            socket.current = io("http://localhost:3000", {
                withCredentials: true,
                query: { userId: user?._id }
            });
            socket.current.on("connect", () => {
                console.log("Connected to socket server from client");
            });



            const hanldeRecieveMessage = (message) => {
                console.log("message Received", message)
                dispatch(addMessage(message))
            }

            socket.current.on("recieveMessage", hanldeRecieveMessage)

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