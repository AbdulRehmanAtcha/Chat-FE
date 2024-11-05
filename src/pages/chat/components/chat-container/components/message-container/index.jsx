import { setSelectedChatMessages } from '@/lib/store/slices/chats';
import { useGetMessagesMutation } from '@/services/messages';
import moment from 'moment';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const MessageContainer = () => {
    const scrollRef = useRef()
    const { selectedChatType, selectedChatData, selectedChatMessages } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.auth);
    const [getUserMessages, { data, isSuccess, isError, error }] = useGetMessagesMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedChatData?._id && selectedChatType === "contact") {
            getUserMessages({ user2: selectedChatData._id });
        }
    }, [selectedChatData, selectedChatType, getUserMessages]);


    useEffect(() => {
        if (isSuccess) {
            dispatch(setSelectedChatMessages(data?.data?.messages))
            console.log(data);
        } else if (isError) {
            console.log(error);
        }
    }, [isSuccess, isError, data, error]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [selectedChatMessages])

    const renderMessages = () => {
        let lastDate = null;
        return selectedChatMessages?.map((message, index) => {
            const messageDate = moment(message?.timestamp).format("YYYY-MM-DD");
            const showDate = messageDate !== lastDate;
            lastDate = messageDate
            return (
                <div key={index}>
                    {showDate && (
                        <div className='text-center text-gray-500 my-2'>
                            {moment(message.timestamp).format("LL")}
                        </div>
                    )}
                    {
                        selectedChatType === "contact" &&
                        renderDmMessages(message)
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
                {moment(message?.timestamp).format("LT")}
            </div>
        </div>
    )

    return (
        <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
            {renderMessages()}
            <div ref={scrollRef} />
        </div>
    )
}

export default MessageContainer
