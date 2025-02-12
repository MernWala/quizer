import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { AiOutlineLogin } from 'react-icons/ai';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Input from "../input/Input"
import Spinner from "../Spinner"

const GenralHeaderFooter = () => {

    const [hasShadow, setHasShadow] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(() => {
                return window.scrollY > 40
            })
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleSubsribeNewsLetter = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            console.log(formData);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex flex-col min-h-[100vh] justify-between">
            <header className={`text-gray-400 bg-gray-900 body-font sticky top-0 ${hasShadow ? "shadow-lg" : "shadow-none"}`}>
                <div className="w-11/12 mx-auto flex flex-wrap md:px-5 py-3 flex-row items-center justify-between">
                    <Link to={"/"} className="flex title-font font-medium items-center text-white">
                        <img src="/logo192.png" alt="Quizzer Logo" width={60} />
                        <span className="ml-3 text-xl">Quizzer</span>
                    </Link>
                    <nav className="md:flex hidden md:ml-auto flex-wrap items-center text-base justify-center">
                        <NavLink className={"mr-5 hover:text-white"} to="/free-quizzes">Quizzes</NavLink>
                        <NavLink className={"mr-5 hover:text-white"} to="/pricing">Pricing</NavLink>
                        <NavLink className={"mr-5 hover:text-white"} to="/contact">Support</NavLink>
                        <NavLink className={"mr-5 hover:text-white"} to="/about">Know More</NavLink>
                        {/* <NavLink className={"mr-5 hover:text-white"} to="">Link-5</NavLink> */}
                    </nav>
                    <Link to={"/auth"} className="md:inline-flex hidden text-white items-center bg-purple-700 border-0 py-1 px-3 focus:outline-none transition-all hover:transition-all hover:bg-purple-600 rounded text-base">
                        <AiOutlineLogin className='me-1' />
                        Login
                    </Link>
                    <button type="button" className='md:hidden inline-flex'>
                        <span className="bg-purple-700 p-3 rounded-full">
                            <HiMiniBars3BottomRight className='text-xl text-white' />
                        </span>
                    </button>
                </div>
            </header>

            <Outlet />

            <footer className="text-gray-400 body-font bg-purple-flower">
                <div className='bg-gray-950 bg-opacity-75'>
                    <div className="w-11/12 md:px-5 md:py-16 py-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                            <Link to={"/"} className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                                <img src="/logo192.png" alt="Quizzer Logo" width={60} />
                                <span className="ml-3 text-xl">Quizzer</span>
                            </Link>
                            <div className='mt-5'>
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Social Connections</h2>
                                <nav className="list-none flex gap-3 md:justify-start justify-center">
                                    <li>
                                        <Link to="/" target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white'>
                                            <FaXTwitter size={25} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white'>
                                            <FaInstagram size={25} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white'>
                                            <FaFacebook size={25} />
                                        </Link>
                                    </li>
                                </nav>
                            </div>
                        </div>
                        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                            <div className="lg:w-1/5 sm:w-1/2 w-full px-4">
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Quick Links</h2>
                                <nav className="list-none mb-10 space-y-1">
                                    <li>
                                        <Link to="/free-quizzes" className="text-gray-400 hover:text-white">Quizzes</Link>
                                    </li>
                                    <li>
                                        <Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact" className="text-gray-400 hover:text-white">Support</Link>
                                    </li>
                                    <li>
                                        <Link to="/about" className="text-gray-400 hover:text-white">Know More</Link>
                                    </li>
                                </nav>
                            </div>
                            <div className="lg:w-1/5 sm:w-1/2 w-full px-4">
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Quizzes</h2>
                                <nav className="list-none mb-10 space-y-1">
                                    <li>
                                        <Link to="/" className="text-gray-400 hover:text-white">Quiz Test</Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="text-gray-400 hover:text-white">Test Series</Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="text-gray-400 hover:text-white">Prepare Exam</Link>
                                    </li>
                                </nav>
                            </div>
                            <div className="lg:w-1/5 sm:w-1/2 w-full px-4">
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">More Links</h2>
                                <nav className="list-none mb-10 space-y-1">
                                    <li>
                                        <Link to="/" className="text-gray-400 hover:text-white">Join as Partner</Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="text-gray-400 hover:text-white">Our Partners</Link>
                                    </li>
                                </nav>
                            </div>
                            <div className="lg:w-2/5 sm:w-1/2 w-full px-4 mb-10">
                                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Our Newsletter</h2>
                                <form onSubmit={handleSubsribeNewsLetter}>
                                    <div className="flex">
                                        <Input
                                            label='Email Id'
                                            id='email'
                                            required={true}
                                            type={"email"}
                                            disabled={isLoading}
                                            onChange={(e) => setFormData({ email: e.target.value })}
                                        />

                                        <button type="submit" className='px-2 border border-gray-800 bg-gray-900 ms-2 rounded-md shadow-md text-sm font-medium hover:text-white transition-colors hover:transition-colors'>
                                            {isLoading ?
                                                <Spinner />
                                                :
                                                "Submit"
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 bg-opacity-75" style={{ backdropFilter: 'blur(5px)' }}>
                    <div className="w-11/12 mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-400 text-sm text-center sm:text-left user-select-none">
                            © {new Date().getFullYear()} Quizzer — All Right Reserved
                        </p>
                        <span className="sm:inline-flex hidden sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            <Link to={"/legal/terms-conditions"} className="hover:text-white text-gray-400"> Terms &amp; Conditions</Link>
                            <Link to={"/legal/privacy-policy"} className="hover:text-white ml-4 text-gray-400">Privacy Policy</Link>
                        </span>
                    </div>
                </div>
            </footer>
        </main>
    )
}

export default GenralHeaderFooter