import { Button } from '@/components/ui/button'
import React from 'react'
import { RiCloseFill } from "react-icons/ri"

const ChatHeader = () => {
    return (
        <div className='h-[10vh] border-2 border-[#2f303b] flex items-center justify-between '>
            <div className='flex gap-5 items-center'>
                <div className='flex gap-3 justify-center items-center'></div>
                <div className='flex items-center justify-center gap-5'>
                    <Button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all bg-transparent">
                        <RiCloseFill className='text-5xl' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader