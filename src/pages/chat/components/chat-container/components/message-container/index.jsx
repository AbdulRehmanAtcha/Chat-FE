import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { setSelectedChatMessages } from '@/lib/store/slices/chats';
import { getColor } from '@/lib/utils';
import { useGetChannelMessagesMutation, useGetMessagesMutation } from '@/services/messages';
import moment from 'moment';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const MessageContainer = () => {
    const scrollRef = useRef()
    const { selectedChatType, selectedChatData, selectedChatMessages } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.auth);
    const [getUserMessages, { data, isSuccess, isError, error, isLoading }] = useGetMessagesMutation();
    const [getChannelMessages, { data: channelData, isSuccess: isChannelSuccess, isError: isChannelError, error: channelError, isLoading: channelLoading }] = useGetChannelMessagesMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedChatData?._id && selectedChatType === "contact") {
            getUserMessages({ user2: selectedChatData._id });
        }
        else if (selectedChatType === "channel") {
            getChannelMessages({ channelId: selectedChatData?._id })
        }
    }, [selectedChatData, selectedChatType, getUserMessages, getChannelMessages]);


    useEffect(() => {
        if (isSuccess) {
            dispatch(setSelectedChatMessages(data?.data?.messages))
        } else if (isError) {
            console.log(error);
        }
    }, [isSuccess, isError, data, error]);


    useEffect(() => {
        if (isChannelSuccess) {
            dispatch(setSelectedChatMessages(channelData?.data?.messages))
            // console.log(channelData)
        } else if (isChannelError) {
            console.log(channelError);
        }
    }, [isChannelSuccess, isChannelError, channelData, channelError]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [selectedChatMessages])

    const renderMessages = () => {
        let lastDate = null;
        return selectedChatMessages?.map((message, index) => {
            // console.log(message)
            const messageDate = moment(message?.createdAt).format("YYYY-MM-DD");
            const showDate = messageDate !== lastDate;
            lastDate = messageDate
            return (
                <div key={index}>
                    {showDate && (
                        <div className='text-center text-gray-500 my-2'>
                            {moment(message.createdAt).format("LL")}
                        </div>
                    )}
                    {
                        selectedChatType === "contact" &&
                        renderDmMessages(message)
                    }
                    {
                        selectedChatType === "channel" &&
                        renderChannelMessages(message)
                    }

                </div>
            )
        });
    };


    const renderDmMessages = (message) => (
        <div className={`${message?.sender === selectedChatData?._id ? "text-left" : "text-right"}`}>
            {
                message?.messageType === "text"
                &&
                <div className={`${message?.sender !== selectedChatData?._id ?
                    "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" :

                    "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 my-1 max-w-[50%] break-words`}>
                    {message?.content}
                </div>
            }
            <div className='text-xs text-gray-600'>
                {moment(message?.createdAt).format("LT")}
            </div>
        </div>
    )

    const renderChannelMessages = (message) => {
        return (
            <div className={
                `mt-5 ${message?.sender?._id !== user?._id ? "text-left" : "text-right"}

            `}>
                {
                    message?.messageType === "text"
                    &&
                    <div className={`${message?.sender._id == user?._id ?
                        "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" :

                        "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 my-1 max-w-[50%] break-words ml-9`}>
                        {message?.content}
                    </div>
                }
                {
                    message?.sender?._id !== user?._id ? (
                        <div className='flex items-center justify-start gap-3'>
                            <Avatar className="w-8 h-8 rounded-full overflow-hidden">
                                {message?.sender?.profileImg?.url &&
                                    (
                                        <AvatarImage
                                            src={message?.sender?.profileImg?.url}
                                            alt="Image"
                                            className="object-cover w-full h-full bg-black"
                                        />
                                    )
                                }
                                <AvatarFallback
                                    className={`uppercase h-8 w-8 text-lg flex items-center justify-center rounded-full ${getColor(message?.sender?.color)}`}
                                >
                                    {
                                        message?.sender?.firstName ?

                                            message?.sender?.firstName?.split("").shift()
                                            :
                                            message?.sender?.email?.split("").shift()
                                    }
                                </AvatarFallback>
                            </Avatar>
                            <span className='text-sm text-white/60'>
                                {message?.sender?.firstName} {message?.sender?.lastName}
                            </span>
                            <span className='text-xs text-white/60'>
                                {moment(message?.createdAt).format("LT")}
                            </span>
                        </div>
                    )
                        :
                        (
                            <div className='text-xs text-white/60 mt-1'>
                                {moment(message?.createdAt).format("LT")}
                            </div>
                        )
                }
            </div>
        )
    }

    return (
        <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
            {/* Show loader if any of the messages are loading */}
            {(isLoading || channelLoading) ? (
                <div className="flex items-center justify-center w-full h-full">
                    <span class="btn-loader"></span>
                </div>
            ) : (
                renderMessages()
            )}
            <div ref={scrollRef} />
        </div>
    )
}

export default MessageContainer
