import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React, { useCallback, useEffect, useState } from 'react'
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
import { animation, getColor } from '@/lib/utils'
import { useSearchContactsMutation } from '@/services/contacts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch } from 'react-redux'
import { setSelectedChatData, setSelectedChatType } from '@/lib/store/slices/chats'


const NewDm = () => {
    const dispatch = useDispatch();

    const [openNewContactModal, setNewContactModal] = useState(false);
    const [searchContact, setSearchContact] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [searchedContacts, setSearchedContacts] = useState([]);


    const [search, { isError: searchContactsIsError, isLoading: searchContactsLoading, data: searchContactsData, error: searchContactsError, isSuccess: searchContactsSuccess }] = useSearchContactsMutation()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchContact.trim() !== "") {
                search({ searchTerm: searchContact })
                    .unwrap()
                    .then((data) => setSearchedContacts(data?.data?.contacts || []))
                    .catch((error) => console.error("Search error:", error));
            } else {
                setSearchedContacts([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchContact, search]);

    useEffect(() => {
        if (!openNewContactModal) {
            setSearchContact("");
        }
    }, [openNewContactModal])


    const SelectContactHandler = (contact) => {
        setNewContactModal(false);
        dispatch(setSelectedChatType("contact"));
        dispatch(setSelectedChatData(contact))
    }

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
                        searchedContacts.length > 0
                        &&
                        <ScrollArea className="h-[250px]">
                            <div className='flex flex-col gap-5'>
                                {
                                    searchedContacts?.map((item, index) => {
                                        return (
                                            <div key={index} className='flex gap-3 items-center cursor-pointer' onClick={() => SelectContactHandler(item)}>
                                                <div className='w-12 h-12 relative'>
                                                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                        {
                                                            item?.profileImg?.url ? (
                                                                <AvatarImage src={item?.profileImg?.url} alt="Profile" className="object-cover w-full h-full bg-black rounded-full" />
                                                            ) : (
                                                                <div
                                                                    className={`h-12 w-12 text-lg flex items-center justify-center rounded-full cursor-pointer ${getColor(item?.color)}`}
                                                                >
                                                                    {item?.firstName ? item?.firstName?.slice(0, 1) : item?.email?.slice(0, 1)}
                                                                </div>
                                                            )
                                                        }
                                                    </Avatar>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span>
                                                        {item?.firstName && item?.lastName ? item?.firstName + " " + item?.lastName : ""}
                                                    </span>
                                                    <span className='text-xs'>
                                                        {item?.email}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </ScrollArea>
                    }
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
