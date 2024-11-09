import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { closeChat } from '@/lib/store/slices/chats'
import { getColor } from '@/lib/utils'
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'

const ChatHeader = () => {
    const dispatch = useDispatch();
    const { selectedChatData, selectedChatType } = useSelector((state) => state.chats);

    return (
        <div className='h-[10vh] border-2 border-[#2f303b] flex items-center justify-between '>
            <div className='flex gap-5 items-center px-2 w-full justify-between sm:px-10'>
                <div className='flex gap-3 justify-center items-center'>
                    <div className='w-12 h-12 relative'>
                        {selectedChatType === "contact" ? <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                            {
                                selectedChatData?.profileImg?.url ? (
                                    <AvatarImage src={selectedChatData?.profileImg?.url} alt="Profile" className="object-cover w-full h-full bg-black" />
                                ) : (
                                    <div
                                        className={`h-12 w-12 text-lg flex items-center justify-center rounded-full cursor-pointer ${getColor(selectedChatData?.color)}`}
                                    >
                                        {selectedChatData?.firstName ? selectedChatData?.firstName?.slice(0, 1) : selectedChatData?.email?.slice(0, 1)}
                                    </div>
                                )
                            }
                        </Avatar>
                            :
                            <div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'>
                                #
                            </div>
                        }
                    </div>
                    <div>
                        {selectedChatType === "channel" && selectedChatData?.name}
                        {
                            selectedChatType === "contact"
                            &&
                            selectedChatData?.firstName + " " + selectedChatData?.lastName
                        }
                    </div>
                </div>
                <div className='flex items-center justify-center gap-5'>
                    <Button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent" onClick={() => dispatch(closeChat())}>
                        <IoMdClose className='text-[45px]' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
