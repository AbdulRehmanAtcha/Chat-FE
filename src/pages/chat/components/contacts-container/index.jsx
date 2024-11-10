import React, { useEffect } from 'react'
import logo from "@/assets/logo.svg";
import ProfileInfo from './components/profile-info';
import NewDm from './components/new-dm';
import { useGetDmContactsMutation } from '@/services/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel, setChannels, setdmContacts } from '@/lib/store/slices/chats';
import Contactlist from '@/components/ui/contactlist';
import CreateChannel from './components/create-channel';
import { useGetUserChannelsMutation } from '@/services/channel';


const ContactsContainer = () => {
  const [getContacts, { isError, isSuccess, isLoading, error, data }] = useGetDmContactsMutation();
  const [getChannels, { data: channelsData, isSuccess: channelsSuccess, isError: channelsIsError, error: channelsEror }] = useGetUserChannelsMutation()
  const { dmContacts, channels } = useSelector((state) => state.chats)
  const dispatch = useDispatch()
  useEffect(() => {
    getContacts();
    getChannels();
    const interval = setInterval(() => {
      getContacts();
      getChannels();
    }, 10000);

    return () => clearInterval(interval);
  }, [getContacts, getChannels]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setdmContacts(data?.data?.contacts))
    }
    if (isError) {
      console.log(error)
    }
  }, [isError, isSuccess])

  useEffect(() => {
    if (channelsSuccess) {
      // console.log(channelsData?.data?.channel)
      dispatch(setChannels(channelsData?.data?.channel))
    }
    if (channelsIsError) {
      console.log(channelsEror)
    }
  }, [channelsIsError, channelsSuccess])


  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
      <div className='pt-6 flex items-center pl-10 gap-x-2'>
        <img src={logo} alt="Logo" />
        <p className='text-2xl text-white'>ChatHub</p>
      </div>

      <div className='my-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text={"Direct Messages"} />
          <NewDm />
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <Contactlist contacts={dmContacts} />
        </div>
      </div>
      <div className='my-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text={"Channels"} />
          <CreateChannel />
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <Contactlist contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ContactsContainer


const Title = ({ text }) => {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm'>
      {text}
    </h6>
  )
}
