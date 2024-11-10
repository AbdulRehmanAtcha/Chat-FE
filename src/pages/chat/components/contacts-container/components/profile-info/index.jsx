import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { logout } from '@/lib/store/slices/auth';
import { getColor } from '@/lib/utils';
import React, { useEffect } from 'react'
import { FiEdit2 } from 'react-icons/fi';
import { FaPowerOff } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/services/auth';
import { toast } from 'sonner';


const ProfileInfo = () => {
    const { isLogin, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [logoutMaker, { data, isSuccess, isError, error }] = useLogoutMutation()

    const navigate = useNavigate();


    const HandleLogout = () => {
        // dispatch(logout());
        // navigate("/login");
        logoutMaker();
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(logout());
            navigate("/login");
        }
        if (isError) {
            // navigate("/login");
            toast.error("Something went wrong in logout")
        }
    }, [isSuccess, isError])

    return (
        <div className='absolute bottom-0 h-16 flex justify-between px-2 lg:px-10 w-full bg-[#2a2b33] items-center mb-8'>
            <div className='flex gap-3 justify-center items-center'>
                <div className='w-12 h-12 relative'>
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {
                            user?.profileImg?.url ? (
                                <AvatarImage src={user?.profileImg?.url} alt="Profile" className="object-cover w-full h-full bg-black" />
                            ) : (
                                <div
                                    className={`h-12 w-12 text-lg flex items-center justify-center rounded-full cursor-pointer ${getColor(user?.color)}`}
                                >
                                    {user?.firstName?.slice(0, 1)}
                                </div>
                            )
                        }
                    </Avatar>
                </div>
                <div>
                    {user?.firstName && user?.lastName ? user?.firstName + " " + user?.lastName : ""}
                </div>
            </div>
            <div className='flex gap-5'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2 className='text-purple-500 text-xl font-medium' onClick={() => navigate("/profile")} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                            Edit Your Profile
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FaPowerOff className='text-red-500 text-xl font-medium' onClick={HandleLogout} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                            Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>
        </div>
    )
}

export default ProfileInfo
