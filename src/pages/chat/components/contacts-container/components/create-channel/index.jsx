import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useGetAllContactsMutation } from '@/services/contacts'
import { Button } from '@/components/ui/button'
import MultipleSelector from '@/components/ui/multipleselect'
import { useAddChannelMutation } from '@/services/channel'
import { useDispatch, useSelector } from 'react-redux'
import { addChannel, setChannels } from '@/lib/store/slices/chats'


const CreateChannel = () => {
    const dispatch = useDispatch();
    const { channels } = useSelector((state) => state.chats);


    const [openNewChannelModal, setOpenNewChannelModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [channelName, setChannelName] = useState("")
    const [fetching, { isError, isLoading, data, error, isSuccess }] = useGetAllContactsMutation()
    const [addChannelToDb, { data: createChannelData, isSuccess: createChannelSuccess, isError: createChannelIsError, error: createChannelError, isLoading: addChannelLoading }] = useAddChannelMutation();

    useEffect(() => {
        fetching().unwrap()
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setAllContacts(data?.data?.contacts)
        }
    }, [isSuccess])

    const CreateChannel = async () => {
        if (channelName !== "" && selectedContacts?.length > 0) {
            await addChannelToDb({ name: channelName, members: selectedContacts?.map((item) => item?.value) })
        }
    }

    useEffect(() => {
        if (createChannelSuccess) {
            dispatch(addChannel(createChannelData?.data?.channel))
            setChannelName("");
            setSelectedContacts([]);
            setOpenNewChannelModal(false)
        }
    }, [createChannelSuccess, createChannelData])

    useEffect(() => {
        if (createChannelIsError) {
            console.log(createChannelError)
        }
    }, [createChannelIsError])

    if (isLoading) return <span class="btn-loader"></span>;
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className='text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer
                         transition-all duration-300 text-start'
                            onClick={() => setOpenNewChannelModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3">
                        Create New Channel
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewChannelModal} onOpenChange={setOpenNewChannelModal}>
                <DialogContent className="bg-[#181920] border-none text-white md:w-[440px] w-[90vw] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogDescription>
                            Please select details for new channel
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input placeholder="Channel Name" className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => setChannelName(e.target.value)}
                            value={channelName}
                        />
                    </div>
                    <div>
                        <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white" defaultOptions={allContacts} placeholder="All Contacts" value={selectedContacts} onChange={setSelectedContacts}
                            emptyIndicator={
                                <p className='text-center text-lg leading-10 text-gray-600'>No Results Found</p>
                            }
                        />
                    </div>
                    <div>
                        <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
                            onClick={CreateChannel}
                        >
                            {addChannelLoading ? <span class="btn-loader"></span> : "Create Channel"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateChannel
