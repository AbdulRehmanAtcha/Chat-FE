import EmojiPicker from 'emoji-picker-react'
import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr"
import { IoSend } from 'react-icons/io5'
import { RiEmojiStickerLine } from 'react-icons/ri'

const MessageBar = () => {
    const [message, setMessage] = useState("")
    const HandleSendMessage = () => { }
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
    return (
        <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-5 gap-6'>
            <div className='flex-1 flex bg-[#282b33] rounded-md items-center gap-5 pr-5'>
                <input type="text" className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none' placeholder='Enter Your Message' name='message' onChange={(e) => setMessage(e.target.value)} value={message} />
                <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent">
                    <GrAttachment className='text-xl' />
                </button>
                <div className='relative'>
                    <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent pt-2" onClick={() => setEmojiPicker(!emojiPicker)}>
                        <RiEmojiStickerLine className='text-2xl' />
                    </button>
                    <div className='absolute bottom-16 right-0' ref={emojiRef}>
                        <EmojiPicker theme='dark' open={emojiPicker} onEmojiClick={HandleEmjoi} autoFocusSearch={false} />
                    </div>
                </div>
            </div>
            <button className="!bg-[#8417ff] rounded-md flex justify-center items-center p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent hover:bg-[#741bda] focus:bg-[#741bda] " onClick={HandleSendMessage}>
                <IoSend className='text-2xl' />
            </button>

        </div>
    )
}

export default MessageBar
