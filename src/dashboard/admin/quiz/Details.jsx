import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminQuestionPreview from '../../../components/AdminQuestionPreview';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, Radio, RadioGroup, Tooltip } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IoCaretDownCircle, IoCloseCircle } from 'react-icons/io5';
import Textarea from '../../../components/input/Textarea';
import Input from '../../../components/input/Input';
import CommonContext from '../../../context/common/CommonContext';
import File from '../../../components/input/File';
import { FaDeleteLeft } from 'react-icons/fa6';
import { ImSpinner5 } from 'react-icons/im';
import useFetchAllQuestions from '../../../hooks/useFetchAllQuestions.js'
import { IoIosAddCircle } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

const Details = () => {

    const [addQuestionModal, setAddQuestionModal] = useState(false)
    const [value, setValue] = useState(0);

    const [allQuestions, setAllQuestions] = useState([])
    const { questions, loading, error } = useFetchAllQuestions(1);

    const { handleOnChange, CustomToast } = useContext(CommonContext)

    useEffect(() => {
        if (!loading && questions.length > 0) {
            setAllQuestions(questions);
        }
    }, [questions, loading]);

    useEffect(() => {
        if (error) {
            CustomToast("ERROR", error.message);
        }
    }, [error, CustomToast]);

    const [addQuestionModalFormData, setAddQuestionModalFormData] = useState({ questionType: "single_choice" })
    const [isFormProcess, setIsFormProcess] = useState(false)
    const customRadioStyle = {
        color: "#ffffff50",
        '&.Mui-checked': {
            color: "#fff"
        }
    }

    const onCloseAddQuestionModal = () => {
        setAddQuestionModal(false)
        setAddQuestionModalFormData({ questionType: "single_choice" })
    }

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        if ((addQuestionModalFormData?.imageUpload?.length || 0) + files.length > 4) {
            alert("You can upload a maximum of 4 images.");
            return;
        }

        const validFiles = files.filter(
            (file) => ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
        );

        if (validFiles.length !== files.length) {
            alert("Only .png, .jpg, and .jpeg files are allowed!");
        }

        const newImages = validFiles.map((file) => ({ file, previewURL: URL.createObjectURL(file), }));

        setAddQuestionModalFormData((prev) => ({
            ...prev,
            imageUpload: [...(prev.imageUpload || []), ...newImages],
        }));
    };

    const removeImage = (index) => {
        setAddQuestionModalFormData((prev) => {
            const updatedImages = prev.imageUpload.filter((_, i) => i !== index);
            return { ...prev, imageUpload: updatedImages };
        })
    };

    const handleAddQuestion = (e) => {
        try {
            e.preventDefault()
            setIsFormProcess(true);

            let newQuestion = {}
            if (['single_choice', 'multi_choice'].indexOf(addQuestionModalFormData?.questionType) >= 0) {
                newQuestion = {
                    options: [
                        addQuestionModalFormData?.option_1,
                        addQuestionModalFormData?.option_2,
                        addQuestionModalFormData?.option_3,
                        addQuestionModalFormData?.option_4,
                    ].filter(option => option && option?.trim() !== "")
                }
            }

            newQuestion['question'] = addQuestionModalFormData?.question
            newQuestion['questionType'] = addQuestionModalFormData?.questionType
            newQuestion['marks'] = addQuestionModalFormData?.marks
            newQuestion['images'] = addQuestionModalFormData?.imageUpload

            // TODO: delete below line at the API call because mongo will auto create _id
            newQuestion['_id'] = (allQuestions?.length ?? 0) + 1


            // TODO: API call for save current question

            // TODO: save data that retured by the axios call
            setAllQuestions((prev) => [...prev, newQuestion])
            CustomToast("", "Question Added")

        } catch (error) {
            CustomToast("ERROR", error.message);
        } finally {
            setIsFormProcess(false)
            onCloseAddQuestionModal()
        }
    }

    const handleDeleteQuestion = (index) => {
        try {

            // TODO: API call to delete question => (quiz_id, question_id)

            setIsFormProcess(true)
            setAllQuestions((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1)
            ]);

            CustomToast("", "Question Deleted")

        } catch (error) {

            CustomToast("Error", error?.message)
            console.error(error)

        } finally {
            setIsFormProcess(false)
        }
    }

    const [editFlag, setEditFlag] = useState(false)
    const handleEditQuestion = (index) => {
        setEditFlag(true)
        setAddQuestionModalFormData(() => {
            let questionReturn = {}
            if (['single_choice', 'multi_choice'].indexOf(allQuestions[index]?.questionType) >= 0) {
                questionReturn['option_1'] = allQuestions[index]?.options?.[0]
                questionReturn['option_2'] = allQuestions[index]?.options?.[1]
                questionReturn['option_3'] = allQuestions[index]?.options?.[2] ?? ""
                questionReturn['option_4'] = allQuestions[index]?.options?.[3] ?? ""
            }

            questionReturn['_id'] = allQuestions[index]?._id
            questionReturn['questionType'] = allQuestions[index]?.questionType
            questionReturn['question'] = allQuestions[index]?.question
            questionReturn['marks'] = allQuestions[index]?.marks
            questionReturn['images'] = allQuestions[index]?.images

            return questionReturn
        })

        setAddQuestionModal(true)
    }

    const handleApplyEdit = (e) => {
        try {
            e.preventDefault()
            setIsFormProcess(true)

            let update = {}
            if (['single_choice', 'multi_choice'].indexOf(addQuestionModalFormData?.questionType) >= 0) {
                update = {
                    options: [
                        addQuestionModalFormData?.option_1,
                        addQuestionModalFormData?.option_2,
                        addQuestionModalFormData?.option_3,
                        addQuestionModalFormData?.option_4,
                    ].filter(option => option && option?.trim() !== "")
                }
            }

            update['_id'] = addQuestionModalFormData?._id
            update['question'] = addQuestionModalFormData?.question
            update['questionType'] = addQuestionModalFormData?.questionType
            update['marks'] = addQuestionModalFormData?.marks
            update['images'] = addQuestionModalFormData?.imageUpload

            // TODO: API call for update question => addQuestionModalFormData?._id

            setAllQuestions((prev) => [...prev.filter(pv => pv?._id !== update?._id), update])
            CustomToast("Question Updated", "Scroll down for updated question")
            onCloseAddQuestionModal()

        } catch (error) {
            CustomToast("ERROR", error?.message)
            console.error(error)
        } finally {
            setIsFormProcess(false)
        }
    }

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="add-questions-title"
                aria-describedby="add-questions-description"
                open={addQuestionModal}
                onClose={onCloseAddQuestionModal}
                className='!min-height-[100vh] !overflow-auto'
            >
                <Fade in={addQuestionModal}>
                    <div className="bg-gray-700 min-w-full min-h-[100vh] border-0">
                        <div className="p-3 flex items-center justify-between bg-gray-800 sticky top-0 border-b border-opacity-10 z-10">
                            <span className="font-semibold text-white tracking-wider text-lg"> Add a Question </span>
                            <button type="button" onClick={onCloseAddQuestionModal}>
                                <IoCloseCircle className='text-3xl text-gray-500 hover:text-white transition-all hover:transition-all' />
                            </button>
                        </div>

                        <div className='px-3 py-7'>
                            <form className='space-y-7' onSubmit={editFlag === true ? handleApplyEdit : handleAddQuestion}>
                                <div className="flex flex-wrap">
                                    <div className='lg:w-3/4 w-full lg:pe-2'>
                                        <div className='border border-gray-600 p-3 rounded-md relative h-full'>
                                            <span className='text-white tracking-wider bg-gray-700 absolute top-[-1rem] px-2 text-truncate block max-w-full'> Question Type </span>
                                            <RadioGroup
                                                aria-labelledby="question-type-label"
                                                name="questionType"
                                                className='!flex !flex-row !flex-wrap !text-white'
                                                defaultValue={editFlag === true ? addQuestionModalFormData?.questionType : 'single_choice'}
                                                onChange={(e) => handleOnChange(e, setAddQuestionModalFormData)}
                                            >
                                                {['Single Choice', 'Multi Choice', 'Short Answer', 'Long Answer'].map((option, index) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        value={option.split(" ").join("_").toLocaleLowerCase()}
                                                        control={<Radio sx={customRadioStyle} disabled={isFormProcess} />}
                                                        label={option}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    <div className="lg:w-1/4 w-full lg:ps-2 lg:mt-0 mt-7">
                                        <div className='border border-gray-600 p-3 rounded-md relative h-full'>
                                            <span className='text-white tracking-wider bg-gray-700 absolute top-[-1rem] px-2 text-truncate block max-w-full'> Carry Marks </span>
                                            <Input
                                                label={"Carry Marks"}
                                                id={"marks"}
                                                required={true}
                                                type={"number"}
                                                defaultValue={editFlag === true ? addQuestionModalFormData?.marks : allQuestions[allQuestions.length - 1]?.marks ?? 1}
                                                onChange={(e) => handleOnChange(e, setAddQuestionModalFormData)}
                                                disabled={isFormProcess}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='border border-gray-600 p-3 rounded-md relative'>
                                    <span className='text-white tracking-wider bg-gray-700 absolute top-[-1rem] px-2 text-truncate block max-w-full'> Question </span>
                                    <div>
                                        <Textarea
                                            label={"Type / Past Question Here"}
                                            id={"question"}
                                            required={true}
                                            disabled={isFormProcess}
                                            defaultValue={editFlag === true ? addQuestionModalFormData?.question : ''}
                                            onChange={(e) => handleOnChange(e, setAddQuestionModalFormData)}
                                        />
                                    </div>
                                </div>

                                {["single_choice", "multi_choice"].indexOf(addQuestionModalFormData.questionType) >= 0 && (
                                    <div className='border border-gray-600 p-3 rounded-md relative'>
                                        <span className='text-white tracking-wider bg-gray-700 absolute top-[-1rem] px-2 text-truncate block max-w-full'> Set Options </span>
                                        <div className='flex flex-wrap'>
                                            <div className="lg:w-1/4 md:w-1/2 w-full md:pe-3 lg:m-0 mb-3">
                                                <Input
                                                    label={"Option - 1"}
                                                    id={"option_1"}
                                                    required={true}
                                                    type={"text"}
                                                    onChange={(e) => handleOnChange(e, setAddQuestionModalFormData)}
                                                    defaultValue={editFlag === true ? addQuestionModalFormData?.option_1 : ''}
                                                    disabled={isFormProcess}
                                                />
                                            </div>
                                            <div className="lg:w-1/4 md:w-1/2 w-full lg:pe-3 lg:m-0 mb-3">
                                                <Input
                                                    label={"Option - 2"}
                                                    id={"option_2"}
                                                    required={true}
                                                    type={"text"}
                                                    onChange={(e) => handleOnChange(e, setAddQuestionModalFormData)}
                                                    defaultValue={editFlag === true ? addQuestionModalFormData?.option_2 : ''}
                                                    disabled={isFormProcess}
                                                />
                                            </div>
                                            <div className="lg:w-1/4 md:w-1/2 w-full md:pe-3 lg:m-0 mb-3">
                                                <Input
                                                    label={"Option - 3 (Optional)"}
                                                    id={"option_3"}
                                                    required={false}
                                                    type={"text"}
                                                    onChange={(e) => handleOnChange(e, setAddQuestionModalFormData)}
                                                    defaultValue={editFlag === true ? (addQuestionModalFormData?.option_3 ?? "") : ''}
                                                    disabled={isFormProcess}
                                                />
                                            </div>
                                            <div className="lg:w-1/4 md:w-1/2 w-full ">
                                                <Input
                                                    label={"Option - 4 (Optional)"}
                                                    id={"option_4"}
                                                    required={false}
                                                    type={"text"}
                                                    onChange={(e) => handleOnChange(e, setAddQuestionModalFormData)}
                                                    defaultValue={editFlag === true ? (addQuestionModalFormData?.option_4 ?? "") : ''}
                                                    disabled={isFormProcess}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className='border border-gray-600 p-3 rounded-md relative'>
                                    <span className='text-white tracking-wider bg-gray-700 absolute top-[-1rem] px-2 text-truncate block max-w-full'> Any Image (Maximum 4 Images allowed) </span>
                                    <div className='flex gap-2 mt-2'>
                                        {addQuestionModalFormData?.imageUpload?.map((img, index) => (
                                            <div key={index} className='relative md:w-1/4 sm:w-1/2 w-full shadow-sm p-3 rounded-md bg-gray-800'>
                                                <img src={img.previewURL} alt="Preview" className='w-full h-full object-contain' />
                                                <button type='button' onClick={() => removeImage(index)} className='absolute top-0 right-0 cursor-pointer p-2 bg-gray-800 rounded-full'>
                                                    <FaDeleteLeft className='text-white opacity-50 hover:opacity-100 transition-all hover:transition-all text-xl' />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='space-y-2 pt-2 flex flex-wrap'>
                                        <File
                                            label={"Upload Images"}
                                            id={'imageUpload'}
                                            required={false}
                                            disabled={isFormProcess}
                                            onChange={handleFileChange}
                                            accept=".png, .jpg, .jpeg"
                                        />
                                    </div>
                                </div>

                                <div className='border border-gray-600 p-3 rounded-md relative'>
                                    <Button type="submit" variant="contained" disabled={isFormProcess} className='flex gap-2'>
                                        {isFormProcess ? (
                                            <ImSpinner5 size={20} className={'custom-spinner'} />
                                        ) : (
                                            editFlag === true ? <MdEdit size={20} /> : <IoIosAddCircle size={20} />
                                        )}
                                        {editFlag === true ? 'Apply Edit' : 'Add Question'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1 }} className="!border-gray-600 !sticky top-14 !bg-gray-700 bg-opacity-100 z-10 lg:!block !hidden">
                    <Tabs value={value} onChange={(e, val) => setValue(val)} aria-label="quiz details tabs" sx={{ "& .MuiTabs-indicator": { backgroundColor: "#fff", height: "1px" }, "& .MuiTabs-flexContainer": { display: "flex", flexWrap: "wrap" } }}>
                        <Tab className={`lg:!w-1/4 sm:!w-1/2 !w-full !min-w-[200px] !max-w-[unset] !tracking-wider !text-white ${value === 0 ? "!font-medium" : ""}`} label="Questions" {...a11yProps(0)} />
                        <Tab className={`lg:!w-1/4 sm:!w-1/2 !w-full !min-w-[200px] !max-w-[unset] !tracking-wider !text-white ${value === 1 ? "!font-medium" : ""}`} label="Settings" {...a11yProps(1)} />
                        <Tab className={`lg:!w-1/4 sm:!w-1/2 !w-full !min-w-[200px] !max-w-[unset] !tracking-wider !text-white ${value === 2 ? "!font-medium" : ""}`} label="Registration" {...a11yProps(2)} />
                        <Tab className={`lg:!w-1/4 sm:!w-1/2 !w-full !min-w-[200px] !max-w-[unset] !tracking-wider !text-white ${value === 3 ? "!font-medium" : ""}`} label="Enquiry" {...a11yProps(3)} />
                    </Tabs>
                </Box>

                <div className="px-4 pt-3 bg-gray-800">
                    <Accordion className='lg:!hidden !block !rounded-md !bg-gray-600'>
                        <AccordionSummary
                            className='!bg-gray-600 !rounded-md'
                            expandIcon={<IoCaretDownCircle size={25} className='text-white' />}
                            aria-controls="controlPanel-content"
                            id="controlPanel-header"
                        >
                            <span className='font-medium text-white tracking-wider'>Accordion 1</span>
                        </AccordionSummary>
                        <AccordionDetails className='bg-gray-700 rounded-b-md'>
                            <RadioGroup
                                aria-labelledby="control-pannel-label"
                                className='!flex lg:!flex-row !flex-col !flex-wrap !text-white'
                                onChange={(e) => setValue(JSON.parse(e.target.value))}
                                defaultValue={value}
                            >
                                {['Questions', 'Settings', 'Registration', 'Enquiry'].map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={index}
                                        control={<Radio sx={customRadioStyle} />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </AccordionDetails>
                    </Accordion>
                </div>


                <div className="px-2 py-1 w-full">
                    <CustomTabPanel value={value} index={0}>
                        <div className="space-y-4">
                            {allQuestions?.map((question, index) => {
                                return (
                                    <AdminQuestionPreview
                                        key={JSON.stringify(question)}
                                        sno={index + 1}
                                        type={question?.questionType}
                                        options={question?.options}
                                        marks={question?.marks}
                                        handleDeleteQuestion={handleDeleteQuestion}
                                        handleEditQuestion={handleEditQuestion}
                                    >
                                        <AdminQuestionPreview.Question> {question?.question} </AdminQuestionPreview.Question>
                                    </AdminQuestionPreview>
                                )
                            })}

                            <div className='px-3 py-5 border-2 border-white border-opacity-10 rounded-md bg-white bg-opacity-[0.02] shadow-sm border-dashed'>
                                <button type="button" className='w-full h-full flex flex-col items-center justify-center' onClick={() => setAddQuestionModal(true)}>
                                    <Tooltip title="Add Question" placement='right'>
                                        <BsFillPlusCircleFill size={80} className='text-gray-700' />
                                    </Tooltip>
                                    <span className='text-gray-700 text-lg mt-3 capitalize'>
                                        Click to add questions
                                    </span>
                                </button>
                            </div>
                        </div>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        <div className="px-4 py-3 bg-gray-700 rounded-md">
                            <span className="font-medium block mb-3 uppercase tracking-wider"> Security </span>
                            <ul>
                                <li>
                                    <FormControlLabel
                                        control={<Checkbox sx={customRadioStyle} />}
                                        label={"Block tab switch"}
                                    />
                                </li>
                                <li>
                                    <FormControlLabel
                                        control={<Checkbox sx={customRadioStyle} />}
                                        label={"Turn on Camera and Mic"}
                                    />
                                </li>
                                <li>
                                    <FormControlLabel
                                        control={<Checkbox sx={customRadioStyle} />}
                                        label={"Turn on AI-smart capture"}
                                    />
                                </li>
                                <li>
                                    <FormControlLabel
                                        control={<Checkbox sx={customRadioStyle} />}
                                        label={"Suffle questions"}
                                    />
                                </li>
                                <li>
                                    <FormControlLabel
                                        control={<Checkbox sx={customRadioStyle} />}
                                        label={"Suffle options"}
                                    />
                                </li>
                            </ul>
                            <div className='mt-4'>
                                <Button type='button' variant="contained"> Save </Button>
                            </div>
                        </div>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={3}>
                        Item Four
                    </CustomTabPanel>
                </div>
            </Box>
        </React.Fragment >
    )
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`details-${index}`}
            aria-labelledby={`details-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ px: 1, py: 2 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `details-tab-${index}`,
        'aria-controls': `details-${index}`,
    };
}

export default Details