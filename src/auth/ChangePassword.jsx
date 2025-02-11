import React, { useContext, useState } from 'react'
import Spinner from "../components/Spinner"
import Input from "../components/input/Input"
import { TiArrowBack } from 'react-icons/ti'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ApiContext from '../context/api/ApiContext'
import CommonContext from '../context/common/CommonContext'

const ChangePassword = () => {

    const { backendHost } = useContext(ApiContext)
    const { CustomToast, handleOnChange } = useContext(CommonContext)

    const [params] = useSearchParams()

    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            if (formData?.pass === formData?.rePass) {
                const response = await axios.post(`${backendHost}/api/common/auth/manual/password-reset/reset?token=${params.get("token")}`, formData)
                if (response?.status === 200) {
                    CustomToast("Success", response?.data?.message)
                }
            } else {
                CustomToast(null, "Password not matched.")
            }
        } catch (error) {
            console.error(error)
            const { status, data } = error.response;
            if (status === 400 || status === 404) {
                if (data?.validationError === true) {
                    data?.error.forEach(e => {
                        CustomToast("Validation Error", e?.msg)
                    })
                } else {
                    CustomToast(null, data?.message ?? "Unkown Error")
                }

            } else
                CustomToast(null, error?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-stretch min-h-[100vh] bg-purple-flower'>
            <div className='w-full flex flex-col p-5 items-center justify-center bg-[#000000a9]'>
                <div className='rounded-md p-10 pt-5 border border-neutral-50' data-aos="fade-up" style={{ backdropFilter: 'blur(10px' }}>
                    <div className="mb-5 w-full">
                        <span className="text-xl font-semibold text-neutral-50">Password Update</span>
                    </div>

                    <form className='space-y-4 block min-w-[300px] max-w-[500px]' onSubmit={handleResetPassword}>
                        <Input
                            label={"New Password"}
                            id={"pass"}
                            required={true}
                            type={"password"}
                            disabled={isLoading}
                            onChange={(e) => handleOnChange(e, setFormData)}
                        />

                        <Input
                            label={"Re-enter Password"}
                            id={"rePass"}
                            required={true}
                            type={"password"}
                            disabled={isLoading}
                            onChange={(e) => handleOnChange(e, setFormData)}
                        />

                        <button type="submit" className='flex justify-center items-center bg-neutral-900 w-full rounded-md py-2 font-medium uppercase'>
                            {isLoading ?
                                <Spinner className={'text-neutral-50 my-1'} />
                                :
                                <span className='text-white'>Update Password</span>
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

export default ChangePassword