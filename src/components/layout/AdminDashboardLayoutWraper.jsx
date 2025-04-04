import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Avatar, Drawer, SpeedDial, SpeedDialAction, Tooltip } from '@mui/material';
import { AiOutlineLogout } from 'react-icons/ai';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { GoDotFill } from 'react-icons/go';
import { TbMessageReportFilled } from 'react-icons/tb';
import { IoIosHelpCircle } from 'react-icons/io';
import { IoSettings } from 'react-icons/io5';
import { LuChevronsLeft } from 'react-icons/lu';
import SidebarItem from './SidebarItem';
import { BsPersonFillGear, BsThreeDotsVertical } from 'react-icons/bs';
import { GrOverview } from 'react-icons/gr';
import { FaChartPie, FaFolderOpen } from 'react-icons/fa';
import { FaFolderTree } from 'react-icons/fa6';


const DashboardLayoutWraper = () => {

    const [sidebar, setSidebar] = useState(false);

    const [dateTime, setDateTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const navigate = useNavigate()

    return (
        <React.Fragment>
            <Drawer open={sidebar} onClose={() => setSidebar(false)} className='backdrop-brightness-50' sx={{ "& .MuiDrawer-paper": { backgroundColor: "#111827" } }}>
                <div className='min-w-80 relative h-full flex flex-col'>
                    <div className='sticky top-0 bg-gray-900 shadow-md'>
                        <button type="button" onClick={() => setSidebar(false)} className='absolute right-0 mt-6 rounded-s-full py-1 px-2 text-white text-opacity-50 hover:text-opacity-100 bg-gray-800 transition-all hover:transition-all'>
                            <LuChevronsLeft size={30} />
                        </button>

                        <div className='px-5 pt-3 pb-2 border-b border-gray-800'>
                            <Link to={"/"} className="inline-flex title-font font-medium items-center text-white">
                                <img src="/logo192.png" alt="Quizzer Logo" width={60} />
                                <span className="ml-3 text-xl">Quizzer</span>
                            </Link>
                        </div>
                    </div>

                    <div className="py-5 px-3 max-h-[calc(100vh-84px-88px)] overflow-auto">
                        <ul>
                            {/* <SidebarItem to={"/"} hasChild={true} title='Dropwown Menu'>
                                <SubMenuItem to="/"> Child - 1 </SubMenuItem>
                                <SubMenuItem to="/"> Child - 2 </SubMenuItem>
                                <SubMenuItem to="/"> Child - 3 </SubMenuItem>
                            </SidebarItem> */}

                            <SidebarItem to={"/dashboard/admin"}> Overview </SidebarItem>
                            <SidebarItem to={"/dashboard/admin/quiz"}> Quiz </SidebarItem>
                            <SidebarItem to={"/dashboard/admin/series"}> Series </SidebarItem>
                            <SidebarItem to={"/dashboard/admin/analyze"}> Analysis </SidebarItem>
                        </ul>
                    </div>

                    <div className="mt-auto px-3 py-4 absolute bottom-0 w-full">
                        <div className='flex items-end p-2 bg-gray-800 rounded-md'>
                            <div className='flex items-center gap-3 w-full'>
                                <Avatar alt="Account Name" src="/placeholder.png" />
                                <span className='text-white text-lg font-medium text-truncate max-w-[65%]'>Account Name Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis repellendus ut est minus animi. Esse ullam dignissimos sed aliquid quae dolorum. Accusamus, corrupti magni. Dolorem dolorum blanditiis molestiae voluptatum iure.</span>
                            </div>
                            <div className='relative'>
                                <SpeedDial
                                    FabProps={{ className: "!h-fit !w-fit !bg-transparent !shadow-none" }}
                                    sx={{ position: 'absolute', bottom: 0, right: -9 }}
                                    icon={<BsThreeDotsVertical className='text-xl' />}
                                    ariaLabel="Quick Action"
                                >
                                    <SpeedDialAction
                                        icon={<BsPersonFillGear />}
                                        tooltipTitle="Account Settings"
                                        onClick={() => navigate("/a")}
                                    />
                                    <SpeedDialAction
                                        icon={<BsPersonFillGear />}
                                        tooltipTitle={"Account Settings"}
                                        onClick={() => navigate("/b")}
                                    />
                                    <SpeedDialAction
                                        icon={<BsPersonFillGear />}
                                        tooltipTitle={"Account Settings"}
                                        onClick={() => navigate("/c")}
                                    />
                                </SpeedDial>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>

            <div className='fixed top-0 h-14 bg-gray-900 text-white flex z-50 w-full'>
                <div className="flex w-full">
                    <div className="h-14 w-14 flex-shrink-0 bg-gray-950">
                        <Tooltip title={"Expand Sidebar"} placement='right'>
                            <button type="button" onClick={() => setSidebar(true)} className='h-full w-full flex items-center justify-center text-white cursor-pointer text-xl text-opacity-50 hover:text-opacity-100'>
                                <span>
                                    <HiMiniBars3CenterLeft />
                                </span>
                            </button>
                        </Tooltip>
                    </div>
                    <div className='w-[calc(100vw-3.5rem)] flex items-center flex-[1]'>
                        <div className='lg:w-1/2 w-full flex lg:justify-start justify-center ps-4 lg:pe-0 pe-4'>
                            <span className='font-medium text-lg tracking-wider text-truncate block w-full'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi adipisci nobis itaque cum voluptatum ullam. Perferendis, itaque. Magnam non quia incidunt laudantium ab similique nesciunt? Quisquam aperiam quia sequi odit!
                            </span>
                        </div>

                        <div className='w-1/2 lg:flex hidden items-center justify-end'>
                            <span className='flex items-center justify-center font-medium text-sm user-select-none'>
                                <span>
                                    {((dateTime.getHours() % 12) || 12).toString().padStart(2, "0")}
                                    :
                                    {dateTime.getMinutes().toString().padStart(2, "0")}

                                    <span className='ms-1'>
                                        {dateTime.getHours() >= 12 ? "PM" : "AM"}
                                    </span>
                                </span>
                                <span className='mx-1'>
                                    <GoDotFill size={10} />
                                </span>
                                <span>
                                    {weekDays[dateTime.getDay()]}, {monthsNames[dateTime.getMonth()]} {dateTime.getDate()}
                                </span>
                            </span>

                            <div className='flex gap-2 mx-4'>
                                <Tooltip title={"Help"}>
                                    <Link to={"/contact"} className='hover:bg-gray-800 p-2 rounded-full text-xl text-white text-opacity-50 hover:text-opacity-100'>
                                        <IoIosHelpCircle />
                                    </Link>
                                </Tooltip>

                                <Tooltip title={"Report Problem"}>
                                    <Link to={"/report-problem"} className='hover:bg-gray-800 p-2 rounded-full text-xl text-white text-opacity-50 hover:text-opacity-100'>
                                        <TbMessageReportFilled />
                                    </Link>
                                </Tooltip>

                                <Tooltip title={"Account settings"}>
                                    <button type="button" className='hover:bg-gray-800 p-2 rounded-full text-xl text-white text-opacity-50 hover:text-opacity-100'>
                                        <IoSettings />
                                    </button>
                                </Tooltip>
                            </div>

                            <div className='h-14 w-14 bg-gray-950 flex-shrink-0'>
                                <Tooltip title={"Signout"}>
                                    <button type="button" className='h-full w-full flex items-center justify-center text-white cursor-pointer text-xl text-opacity-50 hover:text-opacity-100'>
                                        <span>
                                            <AiOutlineLogout />
                                        </span>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='fixed top-14 min-h-full w-14 bg-gray-900 z-50 md:block hidden'>
                <div className='flex flex-col h-[calc(100vh-3.5rem)]'>
                    <Tooltip title={"Overview"} placement='right'>
                        <Link to="/dashboard/admin" className='h-14 w-full flex items-center justify-center text-white text-xl hover:bg-gray-700'>
                            <span>
                                <GrOverview />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip title={"Quiz"} placement='right'>
                        <Link to="/dashboard/admin/quiz" className='h-14 w-full flex items-center justify-center text-white text-xl hover:bg-gray-700'>
                            <span>
                                <FaFolderOpen />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip title={"Series"} placement='right'>
                        <Link to="/dashboard/admin/series" className='h-14 w-full flex items-center justify-center text-white text-xl hover:bg-gray-700'>
                            <span>
                                <FaFolderTree />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip title={"Analysis"} placement='right'>
                        <Link to="/dashboard/admin/analyze" className='h-14 w-full flex items-center justify-center text-white text-xl hover:bg-gray-700'>
                            <span>
                                <FaChartPie />
                            </span>
                        </Link>
                    </Tooltip>

                    <div className="mt-auto flex items-center justify-center py-3 relative">
                        <SpeedDial
                            FabProps={{ className: "!h-14 !w-14 !bg-transparent !shadow-none" }}
                            sx={{ position: 'absolute', bottom: 0, left: 0 }}
                            icon={
                                <Avatar alt="Account Name" src="/placeholder.png" />
                            }
                            ariaLabel="Quick Action"
                            direction='right'
                        >
                            <SpeedDialAction
                                icon={<BsPersonFillGear />}
                                tooltipTitle="Account Settings"
                                onClick={() => navigate("/a")}
                            />
                            <SpeedDialAction
                                icon={<BsPersonFillGear />}
                                tooltipTitle={"Account Settings"}
                                onClick={() => navigate("/b")}
                            />
                            <SpeedDialAction
                                icon={<BsPersonFillGear />}
                                tooltipTitle={"Account Settings"}
                                onClick={() => navigate("/c")}
                            />
                        </SpeedDial>
                    </div>
                </div>
            </div>

            <div className='absolute mt-14 md:ms-14 top-0 left-0 min-w-[calc(100%-3.5rem)] md:w-[calc(100%-3.5rem)] w-full min-h-[calc(100vh-3.5rem)]'>
                <div className="bg-gray-800 w-full text-white min-h-[inherit]">
                    <Outlet />
                </div>
            </div>
        </React.Fragment>
    )
}

export default DashboardLayoutWraper