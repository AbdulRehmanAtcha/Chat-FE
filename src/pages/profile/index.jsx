import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { profileSchema } from '@/schema';
import { useDeletePictureMutation, useUpdatePictureMutation, useUpdateProfileMutation } from '@/services/auth';
import { toast } from 'sonner';
import { loginHandler } from '@/lib/store/slices/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { isLogin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [image, setImage] = useState(user?.profileImg?.url ? user?.profileImg?.url : null);
  const [selectedColor, setSelectedColor] = useState(user?.color || 0);
  const fileInputRef = useRef(null)

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    color: user?.color || 0
  };

  const [profile, { isSuccess, isError, error, isLoading, data }] = useUpdateProfileMutation()
  const [imageUpdate, { isSuccess: updatePictureSuccess, isError: updatePictureIsError, data: updatePictureData, error: updatePictureError, isLoading: updatPictureLoading }] = useUpdatePictureMutation()
  const [deletePicture, { isSuccess: deletePictureSucces, isError: deletePictureIsError, error: deletePictureError, data: deletePictureData, isLoading: deletePictureLoading }] = useDeletePictureMutation()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: profileSchema,
    onSubmit: (values) => {
      profile(values)
    }
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(loginHandler(data?.data?.userResponse));
      toast.success(data?.message);
      navigate("/chat")
    }
  }, [isSuccess, dispatch, data]);

  useEffect(() => {
    if (updatePictureSuccess) {
      toast.success(updatePictureData?.message);
      setImage(updatePictureData?.data?.profileImg?.url)
      dispatch(loginHandler({ ...user, profileImg: updatePictureData?.data?.profileImg }));
    }
  }, [updatePictureSuccess, updatePictureData]);

  useEffect(() => {
    if (deletePictureSucces) {
      toast.success(deletePictureData?.message);
      // console.log(deletePictureData)
      setImage(null)
      dispatch(loginHandler({ ...user, profileImg: updatePictureData?.data?.profileImg }));
    }
  }, [deletePictureSucces, deletePictureData]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message)
    }
  }, [isError])

  useEffect(() => {
    if (updatePictureIsError) {
      toast.error("Error in uploading picture")
    }
  }, [updatePictureIsError])

  useEffect(() => {
    if (deletePictureIsError) {
      toast.error("Error in deleting picture")
    }
  }, [deletePictureIsError])

  const HandleNavigate = () => {
    if (user?.profileSetup) {
      navigate("/chat")
    }
    else {
      toast.warning("Please complete profile setup first");
    }
  }

  const HandleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const HandleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      imageUpdate({ image: file });
    }
  };

  const HandleDeleteImage = async () => {
    deletePicture({ imgUrl: user.profileImg.public_id })
  }

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex justify-center items-center flex-col gap-10'>
      <form className='flex flex-col gap-10 w-[80vw] md:w-max' onSubmit={formik.handleSubmit}>
        <div>
          <IoArrowBack className='text-4xl lg:text-6xl text-white cursor-pointer' onClick={HandleNavigate} />
        </div>
        <div className='grid grid-cols-2'>
          <div className='h-full w-32 md:w-48 md:h-48 relative flex justify-center items-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {updatPictureLoading || deletePictureLoading ? (
                <div className="flex items-center justify-center w-full h-full text-lg font-medium text-gray-500">
                  <span class="btn-loader"></span>
                </div>
              ) : (
                image ? (
                  <AvatarImage src={image} alt="Profile" className="object-cover w-full h-full bg-black" />
                ) : (
                  <div
                    className={`h-32 w-32 md:w-48 md:h-48 text-5xl flex items-center justify-center rounded-full cursor-pointer ${getColor(selectedColor)}`}
                  >
                    {formik.values.firstName ? formik.values.firstName.slice(0, 1) : user?.firstName?.slice(0, 1)}
                  </div>
                )
              )}
            </Avatar>
            {
              hovered && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer ring-fuchsia-50 transition-all'
                  onClick={image ? HandleDeleteImage : HandleFileInputClick}
                >
                  {image ? <FaTrash className='text-3xl text-white cursor-pointer' /> : <FaPlus className='text-3xl text-white cursor-pointer' />}
                </div>
              )
            }
            <input ref={fileInputRef} type="file" className='hidden' onChange={HandleImageChange} name='profileImage' accept='.png, .jpg, .jpeg, .svg, .webp' />
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={user?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder="First Name"
                type="text"
                value={formik.values.firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="firstName"
                error={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder="Last Name"
                type="text"
                value={formik.values.lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="lastName"
                error={formik.touched.lastName && formik.errors.lastName}
              />
            </div>
            <div className='w-full flex gap-5'>
              {
                colors.map((item, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-100 ${item} ${selectedColor === index ? "outline outline-white outline-2" : ""}`}
                    onClick={() => {
                      setSelectedColor(index);
                      formik.setFieldValue('color', index);
                    }}
                  />
                ))
              }
            </div>
          </div>
        </div>
        <div className='w-full'>
          <Button className={"w-full bg-purple-700 hover:bg-purple-900"} type="submit" disabled={isLoading}>
            {/* Save Changes */}
            {isLoading ? <span class="btn-loader"></span> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
