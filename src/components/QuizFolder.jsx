import { Button, Tooltip } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { FcFolder, FcOpenedFolder } from 'react-icons/fc'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const QuizFolder = ({
    children = "Quiz Name",
    length = 0,
    id = null
}) => {

    const [menuPosition, setMenuPosition] = useState(null);
    const handleContextMenu = (e, id) => {
        setMenuPosition(null)
        setTimeout(() => {
            setMenuPosition({ mouseX: e.clientX, mouseY: e.clientY, id });
        }, 0);
    };

    useEffect(() => {
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

        return () => {
            document.removeEventListener("contextmenu", (event) => event.preventDefault());
        };
    }, []);

    const [informationModal, setInformationModal] = useState(false);
    const [deleteFlag, setDeleteFlag] = useState(false)

    const navigate = useNavigate()

    return (
        <div onDoubleClick={() => { navigate(id) }}>
            <div
                onContextMenu={(e) => { e.preventDefault(); handleContextMenu(e, id) }}
                className={`w-32 h-32 bg-white ${menuPosition ? "bg-opacity-10" : "bg-opacity-[0.02]"} rounded-md flex flex-col justify-center items-center p-3 relative hover:bg-opacity-10`}
            >
                <div>
                    {length > 0 ? <FcOpenedFolder size={80} /> : <FcFolder size={80} />}
                </div>

                <Tooltip title={children}>
                    <span className="text-sm text-truncate block max-w-full tracking-wide user-select-none">{children}</span>
                </Tooltip>
            </div>

            <Menu
                open={Boolean(menuPosition)}
                onClose={() => setMenuPosition(null)}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition ? { top: menuPosition.mouseY, left: menuPosition.mouseX } : undefined}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem className='!text-sm !py-1 !tracking-wider' onClick={() => { setMenuPosition(null); navigate(id) }}>Open</MenuItem>
                <MenuItem className='!text-sm !py-1 !tracking-wider' onClick={() => { setMenuPosition(null); setDeleteFlag(true); setInformationModal(true); }}>Delete</MenuItem>
                <MenuItem className='!text-sm !py-1 !tracking-wider' onClick={() => { setMenuPosition(null); setInformationModal(true) }}>Properties</MenuItem>
            </Menu>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={informationModal}
                onClose={() => { setInformationModal(false); setDeleteFlag(false); }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={informationModal}>
                    <Box
                        sx={{ transform: 'translate(-50%, -50%)' }}
                        className={`absolute top-[50%] left-[50%] w-[400px] rounded-md shadow-md bg-gray-800 !backdrop-brightness-50 !backdrop-blur-md overflow-hidden`}
                    >

                        {deleteFlag &&
                            <div className='bg-gray-700 py-1 px-2 text-white tracking-wide'>
                                <span className="text-lg">
                                    Are you sure want to delete this quiz?
                                </span>
                            </div>
                        }

                        <div className='p-3 text-white'>
                            <span className="text-lg font-medium tracking-wider"> {children} </span>
                            <table className='mt-3'>
                                <tr>
                                    <th>Total Question:</th>
                                    <td className='ps-2'>{length}</td>
                                </tr>
                                <tr>
                                    <th>Information 2:</th>
                                    <td className='ps-2'>Sample Answer</td>
                                </tr>
                                <tr>
                                    <th>Information 3:</th>
                                    <td className='ps-2'>Sample Answer</td>
                                </tr>
                            </table>
                        </div>

                        {deleteFlag &&
                            <React.Fragment>
                                <p className="w-full border-t border-gray-700"></p>
                                <div className='flex md:flex-row flex-col gap-3 p-3'>
                                    <Button type='button' variant="contained">
                                        Cancel
                                    </Button>
                                    <Button type='button' variant='contained' color='error'>
                                        Delete
                                    </Button>
                                </div>
                            </React.Fragment>
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default QuizFolder;
