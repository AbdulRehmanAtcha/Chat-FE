import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Lottie from 'react-lottie'
import { animation } from '@/lib/utils'


const NewDm = () => {
    const [openNewContactModal, setNewContactModal] = useState(false);
    const [searchContact, setSearchContact] = useState("");
    const [searchedContacts, setSearchedContacts] = useState([]);
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className='text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer
                         transition-all duration-300 text-start'
                            onClick={() => setNewContactModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3">
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewContactModal} onOpenChange={setNewContactModal}>
                <DialogContent className="bg-[#181920] border-none text-white md:w-[440px] w-[90vw] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogDescription>
                            Please select a contact
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input placeholder="Search a contact" className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => setSearchContact(e.target.value)}
                            value={searchContact}
                        />
                    </div>
                    {
                        searchedContacts?.length <= 0 &&
                        <div className='flex-1 md:flex mt-5 flex-col justify-center items-center duration-1000 transition-all'>
                            <Lottie
                                isClickToPauseDisabled={true}
                                height={100}
                                width={100}
                                options={animation}
                            />
                            <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-2xl text-xl transition-all duration-300 text-center'>
                                <h3 >
                                    Hi<span className='text-purple-500'>!</span> Search New
                                    <span className='text-purple-500 '> Contact</span>
                                </h3>
                            </div>
                        </div>

                    }
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default NewDm
