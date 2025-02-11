import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ApiContext from '../context/api/ApiContext'
import CommonContext from '../context/common/CommonContext'
import { GoCheckCircleFill } from 'react-icons/go'

const AccountVerify = () => {

    const [params] = useSearchParams()
    const [state, setState] = useState(null)
    const { backendHost } = useContext(ApiContext)
    const { CustomToast } = useContext(CommonContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (params.get("token") && params.get("accountVerify") === "true") {
            setState(<>Verifying Account <Spinner /></>)
            axios.get(
                `${backendHost}/api/common/auth/manual/verify?token=${params.get("token")}`
            ).then((response) => {
                if (response?.data?.verify === true) {
                    setState(() => {
                        return <>
                            Account verified <GoCheckCircleFill />
                        </>
                    })

                    CustomToast("Success", "Account verification succes. Redirecting to login page")

                    setTimeout(() => {
                        navigate("/auth", { replace: true })
                    }, 3000);
                }
            }).catch((error) => {
                console.error(error)
                setState({ error: true, msg: JSON.stringify(error?.response?.data) || error?.message || "Unkown Error" })
            })
        }
    }, [params, backendHost, CustomToast, navigate])


    return (
        <div className='flex flex-col justify-center items-center min-h-[100vh] bg-purple-flower'>
            {!state?.error &&
                <div className='flex items-center justify-center bg-[#00000080] p-4 rounded-md' style={{ backdropFilter: 'blur(10px' }}>
                    <span className="text-lg text-white font-medium tracking-wide flex items-center gap-2 justify-center">{state}</span>
                </div>
            }

            {state?.error &&
                <div className='md:w-1/2 w-11/12 mt-5 flex items-center justify-center bg-[#00000080] p-4 rounded-md' style={{ backdropFilter: 'blur(10px' }}>
                    <span className="text-lg text-white font-medium tracking-wide flex items-center gap-2 justify-center text-center">{state?.msg}</span>
                </div>
            }
        </div>
    )
}

export default AccountVerify