import React, { useContext, useState } from 'react'
import Spinner from "../components/Spinner"
import Input from "../components/input/Input"
import { TiArrowBack } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import ApiContext from '../context/api/ApiContext'
import CommonContext from "../context/common/CommonContext"
import axios from 'axios'

const RecoverLinkGenerate = () => {

    const { backendHost } = useContext(ApiContext)
    const { CustomToast, handleOnChange } = useContext(CommonContext)

    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.post(`${backendHost}/api/common/auth/manual/password-reset/send`, formData)

            if (!response?.data?.error && response?.data?.token && response?.data?.mail === true) {
                CustomToast("Mail Sent", "Please check your email for account recovery")
                e.target.reset()
            } else {
                CustomToast(null, "Something gets wrong! Please try again later.")
            }

        } catch (error) {
            console.error(error)
            if (error?.response?.data?.networkError === true) {
                CustomToast("Network Error", "Server is not connected with internet.")
            } else {
                CustomToast(null, JSON.stringify(error?.response?.data?.error) ?? JSON.stringify(error?.message) ?? <>Network Error</>)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-stretch min-h-[100vh] bg-purple-flower'>
            <div className='w-full flex flex-col p-5 items-center justify-center bg-[#000000a9]'>
                <div className='rounded-md p-10 pt-5 border border-neutral-50' data-aos="fade-up" style={{ backdropFilter: 'blur(10px' }}>
                    <div className="mb-5 w-full">
                        <span className="text-xl font-semibold text-neutral-50">Account Recovery</span>
                    </div>

                    <form className='space-y-4 block min-w-[300px] max-w-[500px]' onSubmit={handleFormSubmit}>
                        <Input
                            label={"Email ID"}
                            id={"email"}
                            required={true}
                            type={"text"}
                            disabled={isLoading}
                            onChange={(e) => handleOnChange(e, setFormData)}
                        />

                        <button type="submit" className='flex justify-center items-center bg-neutral-900 w-full rounded-md py-2 font-medium uppercase'>
                            {isLoading ?
                                <Spinner className={'text-neutral-50 my-1'} />
                                :
                                <span className='text-white'>Send Recovery Link</span>
                            }
                        </button>
                    </form>

                    <div className='mt-5 text-center'>
                        <Link to="/auth" className="text-neutral-50 inline-flex items-center gap-1 text-sm">
                            <TiArrowBack className='text-lg' />
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecoverLinkGenerate