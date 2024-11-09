import { setSelectedChatData, setSelectedChatMessages, setSelectedChatType } from '@/lib/store/slices/chats'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './avatar'
import { getColor } from '@/lib/utils'

const Contactlist = ({ contacts, isChannel = false }) => {
    const { selectedChatData, selectedChatType } = useSelector((state) => state.chats)
    const dispatch = useDispatch()

    const HandleClick = (contact) => {
        if (isChannel) {
            dispatch(setSelectedChatType("channel"))
        }
        else {
            dispatch(setSelectedChatType("contact"))
        }
        dispatch(setSelectedChatData(contact))
        if (selectedChatData && selectedChatData._id !== contact._id) {
            dispatch(setSelectedChatMessages([]))
        }
    }

    return (
        <div className='mt-5 '>
            {contacts?.map((item, index) => {
                return (
                    <div key={index} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && selectedChatData?._id === item?._id ? "bg-[#8417ff] hover:bg-[#8417ff]" : "hover:bg-[#f1f1f111]"}`}
                        onClick={() => HandleClick(item)}
                    >
                        <div className='flex gap-5 items-center justify-start text-neutral-300'>
                            {
                                !isChannel &&
                                <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                    {
                                        item?.profileImg?.url ? (
                                            <AvatarImage src={item?.profileImg?.url} alt="Profile" className="object-cover w-full h-full bg-black" />
                                        ) : (
                                            <div
                                                className={`${selectedChatData && selectedChatData?._id === item?._id ? "bg-[#ffffff22] border-2 border-white/70" : `${getColor(item?.color)}`} uppercase h-10 w-10 text-lg flex items-center justify-center rounded-full cursor-pointer`}
                                            >
                                                {item?.firstName ? item?.firstName?.slice(0, 1) : item?.email?.slice(0, 1)}
                                            </div>
                                        )
                                    }
                                </Avatar>

                            }
                            {
                                isChannel &&
                                <div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'>
                                    #
                                </div>
                            }
                            {
                                isChannel ?
                                    <span>{item?.name}</span>
                                    :
                                    <span>
                                        {item?.firstName} {item?.lastName}
                                    </span>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Contactlist
