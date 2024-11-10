import React, { useEffect } from 'react'
import handshake from "../../../assets/handshake.svg";
import logo from "../../../assets/logo.svg";
import { Form, Formik } from 'formik';
import { loginSchema } from '@/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/services/auth';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginHandler } from '@/lib/store/slices/auth';


const Login = () => {
    const [login, { isError, isLoading, isSuccess, error, data }] = useLoginMutation()
    const dispatch = useDispatch();
    const initialValues = {
        email: "",
        password: ""
    }
    const SubmitHandler = (values) => {
        login({ email: values.email, password: values.password });
    }
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
          dispatch(loginHandler(data?.data?.userResponse));
          toast.success(data?.message);
      
          if (data?.data?.userResponse) {
            if (data?.data?.userResponse?.profileSetup === false) {
              navigate("/profile");
            } else if (data?.data?.userResponse?.profileSetup === true) {
              navigate("/chat");
            }
          }
        }
      }, [isSuccess, data, dispatch, navigate]);      

    useEffect(() => {
        if (isError && error) {
            toast.error(error?.data?.message ? error?.data?.message : "Something went wrong")
        }
    }, [isError])
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='bg-[#222227] w-screen md:w-[40vw] lg:w-[30%] flex flex-col justify-center items-center'>
                <div className='flex items-center gap-x-3 py-5'>
                    <img src={logo} alt="Logo" />
                    <p className='text-2xl text-white'>ChatHub</p>
                </div>
                <img src={handshake} alt="Handshake" className='w-[70%] md:w-[90%]' />
            </div>
            <div className='bg-[#F9F9FA] w-screen md:w-[60vw] lg:w-[70%] flex justify-center items-center flex-col gap-y-5 py-5 md:py-0'>
                <h2 className='text-xl md:text-3xl font-bold text-[#212121] text-center'>WELCOME BACK MEMBER</h2>
                <h3 className='text-base md:text-xl font-medium text-[#424242] text-center'>LOG IN TO CONTINUE</h3>
                <Formik
                    initialValues={initialValues}
                    onSubmit={SubmitHandler}
                    validationSchema={loginSchema}
                >
                    {({ values, handleChange, handleBlur, errors, touched }) => (
                        <Form style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", rowGap: "1.25rem", flexDirection: "column" }}>
                            <div className='w-[96%] md:w-[60%] 2xl:w-[40%]'>
                                <Input
                                    error={touched.email && errors.email}
                                    placeholder="Email"
                                    type="email"
                                    value={values.email}
                                    className={"h-14 text-base"}
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className='w-[96%] md:w-[60%] 2xl:w-[40%]'>
                                <Input
                                    error={touched.password && errors.password}
                                    placeholder="Password"
                                    type="password"
                                    value={values.password}
                                    className={"h-14 text-base"}
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className='w-[96%] md:w-[60%] 2xl:w-[40%]'>
                                <Button type="submit" className={"w-full h-[72px] text-base bg-[#222227]"} disabled={isLoading}>
                                    {/* Proceed to my Account */}
                                    {/* <span class="btn-loader"></span> */}
                                    {isLoading ? <span class="btn-loader"></span> : "Proceed to my Account"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className='w-[96%] md:w-[60%] 2xl:w-[40%] flex justify-start lg:justify-end'>
                    <p className='tex-[#424242] text-sm'>Not a member yet? <span className='font-semibold text-md text-[#212121]'><Link to={"/register"}>JOIN NOW</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default Login
