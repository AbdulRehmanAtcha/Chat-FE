import React from 'react'
import logo from "@/assets/logo.svg";
import ProfileInfo from './components/profile-info';
import NewDm from './components/new-dm';


const ContactsContainer = () => {
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
      </div>
      <div className='my-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text={"Channels"} />
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