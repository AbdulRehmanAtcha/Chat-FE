import { useSocket } from '@/context/socketcontext'
import EmojiPicker from 'emoji-picker-react'
import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr"
import { IoSend } from 'react-icons/io5'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'

const MessageBar = () => {
    const [message, setMessage] = useState("")
    const socket = useSocket()
    const { selectedChatType, selectedChatData } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.auth);

    const HandleSendMessage = async () => {
        if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
                sender: user?._id,
                content: message,
                recipient: selectedChatData?._id,
                messageType: "text",
                fileUrl: undefined
            })
        }

        else if (selectedChatType === "channel") {
            socket.emit("send-channel-message", {
                sender: user?._id,
                content: message,
                channelId: selectedChatData?._id,
                messageType: "text",
                fileUrl: undefined
            })
        }
        setMessage("")
    }

    const emojiRef = useRef();
    const [emojiPicker, setEmojiPicker] = useState(false)

    const HandleEmjoi = (emoji) => {
        setMessage((msg) => message + emoji.emoji)
    }

    useEffect(() => {
        function handleOutsideClick(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPicker(false)
            }
        }
        document.addEventListener("mousedown", handleOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [emojiRef])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            HandleSendMessage();
        }
    };
    return (
        <div className='min-h-[10vh] bg-[#1c1d25] flex flex-col sm:flex-row justify-center items-center px-4 sm:px-8 mb-[120px] sm:mb-5 gap-4 sm:gap-6'>
            <div className='flex-1 flex bg-[#282b33] rounded-md items-center gap-3 sm:gap-5 px-3 sm:pr-5 w-[95vw] sm:w-auto'>
                <input
                    type="text"
                    className='flex-1 p-3 sm:p-5 bg-transparent rounded-md focus:border-none focus:outline-none w-[95vw] sm:w-auto'
                    placeholder='Enter Your Message'
                    name='message'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    onKeyDown={handleKeyDown}
                />
                {/* <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent">
                    <GrAttachment className='text-xl' />
                </button> */}
                <div className='relative'>
                    <button
                        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent pt-1 sm:pt-2"
                        onClick={() => setEmojiPicker(!emojiPicker)}
                    >
                        <RiEmojiStickerLine className='text-2xl' />
                    </button>
                    {emojiPicker && (
                        <div className='absolute bottom-12 sm:bottom-16 right-0' ref={emojiRef}>
                            <EmojiPicker theme='dark' onEmojiClick={HandleEmjoi} autoFocusSearch={false} />
                        </div>
                    )}
                </div>
            </div>
            <button
                className="!bg-[#8417ff] rounded-md flex justify-center items-center p-4 sm:p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent hover:bg-[#741bda] focus:bg-[#741bda] w-[95vw] sm:w-auto"
                onClick={HandleSendMessage}
            >
                <IoSend className='text-2xl' />
            </button>
        </div>


    )
}

export default MessageBar
