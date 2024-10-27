import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
    <div>
      Chatttt
    </div>
  )
}

export default Chat
