import React, { useContext, useState } from 'react'
import Input from "../components/input/Input"
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import Spinner from '../components/Spinner'
import axios from 'axios'
import ApiContext from "../context/api/ApiContext"
import CommonContext from "../context/common/CommonContext"

const ManualAuth = () => {

    const { backendHost } = useContext(ApiContext)
    const { handleOnChange, CustomToast } = useContext(CommonContext)
    const [varient, setVarient] = useState('LOGIN')
    const navigate = useNavigate()

    const toggleVarient = () => {
        if (!isLoading) {
            setVarient((prev) => {
                return prev === "LOGIN" ? "REGISTER" : "LOGIN"
            })
        }
    };

    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const response = await axios.post(`${backendHost}/api/common/auth/manual/${varient === "LOGIN" ? 'signin' : 'register'}`,
                { ...formData, role: 'client' }, { withCredentials: true }
            );

            if (response?.status === 201 || response?.status === 200) {
                if (response?.data?.register === true) {
                    if (response?.data?.mail === true) {
                        CustomToast(null, 'Registration Success! Check you email for account verification.')
                        e.target.reset()
                    } else {
                        CustomToast(null, 'Registration Success but, Faild to sent verification email')
                    }
                } else {
                    CustomToast(null, "Login Success! Redirecting to dashboard...")
                    e.target.reset()
                    switch (response?.data?.user?.role) {
                        case "client": {
                            navigate("/dashboard/client")
                            break;
                        }

                        case "admin": {
                            navigate("/dashboard/admin")
                            break;
                        }

                        default: {
                            return
                        }
                    }
                }
            }

        } catch (error) {
            console.error(error);
            if (error.response) {
                const { status, data } = error.response;
                if (status === 403) {
                    CustomToast("Error", data.error)
                } else {
                    if (data?.validationError === true) {
                        data?.error?.forEach(e => {
                            CustomToast('Validation Error', e.msg)
                        })
                    } else {
                        CustomToast("Unknown Error", JSON.stringify(data))
                    }
                }
            } else {
                CustomToast(null, "Network error! Please try again later.")
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-stretch min-h-[100vh] bg-purple-flower'>
            <div className='lg:w-1/2 lg:flex hidden p-5' data-aos="fade-right">
                {/* TODO: Insert a proper graphics and typography stuff */}
            </div>

            <div className='lg:w-1/2 w-full flex flex-col p-5 lg:border-s-2 items-center justify-center bg-[#000000a9]'>
                <div className='rounded-md p-10 pt-5 border border-neutral-50' style={{ backdropFilter: 'blur(10px' }}>
                    <div className="mb-7 w-full" data-aos="fade-right">
                        <span className="text-3xl font-bold text-neutral-50">{varient}</span>
                    </div>

                    <form className='space-y-4 block min-w-[300px] max-w-[500px]' onSubmit={handleFormSubmit} data-aos="zoom-in">
                        {varient === "REGISTER" &&
                            <Input
                                label={"Username"}
                                id={"name"}
                                required={true}
                                type={"text"}
                                disabled={isLoading}
                                onChange={(e) => handleOnChange(e, setFormData)}
                            />
                        }

                        <Input
                            label={"Email ID"}
                            id={"email"}
                            required={true}
                            type={"text"}
                            disabled={isLoading}
                            onChange={(e) => handleOnChange(e, setFormData)}
                        />

                        <Input
                            label={"Password"}
                            id={"pass"}
                            required={true}
                            type={"password"}
                            disabled={isLoading}
                            autoComplete='current-password'
                            onChange={(e) => handleOnChange(e, setFormData)}
                        />

                        {varient === "LOGIN" &&
                            <Link to={"/auth/recover"} className='text-sm text-white ps-1 underline'>Forgot Password?</Link>
                        }

                        <button type="submit" className='flex justify-center items-center bg-neutral-900 w-full rounded-md py-2 font-medium uppercase'>
                            {isLoading ?
                                <Spinner className={'text-neutral-50 my-1'} />
                                :
                                <span className='text-white'>{varient}</span>
                            }
                        </button>
                    </form>

                    <div className='mt-5 text-center' data-aos="zoom-in">
                        <button type='button' className='text-sm font-light text-neutral-50 user-select-none' onClick={toggleVarient}>
                            {varient === "LOGIN" ?
                                <>New user? <span className='underline'>Register</span></>
                                :
                                <>Already registered? <span className='underline'>Login</span></>
                            }
                        </button>
                    </div>

                    <div className='mt-7 flex flex-col' data-aos="zoom-in">
                        <div className="flex items-center content-center gap-2 mx-auto">
                            <p className='m-0 w-[80px] border'></p>
                            <span className='text-white text-sm'>OR</span>
                            <p className='m-0 w-[80px] border'></p>
                        </div>

                        <div className="mt-7">
                            <button type='button' className='flex bg-neutral-50 items-center justify-center gap-2 py-2 font-medium rounded-md cursor-pointer w-full'>
                                <FcGoogle className='text-2xl' /> <span className='user-select-none'>Continue with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualAuth
