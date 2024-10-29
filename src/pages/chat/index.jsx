import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatsContainer from './components/chat-container';
import EmptyContainer from './components/empty-container';
import ContactsContainer from './components/contacts-container';

const Chat = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Chat")
  }, [])
  const { isLogin, user } = useSelector((state) => state.auth);

  const [toastShown, setToastShown] = useState(false);
  useEffect(() => {
    if (isLogin && user?.profileSetup === false && !toastShown) {
      toast.warning("Please complete the profile setup");
      setToastShown(true);
      navigate("/profile");
    }
  }, [isLogin, user, toastShown, navigate]);

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      {/* <EmptyContainer /> */}
      {/* <ChatsContainer /> */}
    </div>
  )
}

export default Chat
