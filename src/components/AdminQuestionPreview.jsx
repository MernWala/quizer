import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Checkbox, FormGroup } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import Input from './input/Input';
import Textarea from './input/Textarea';

const AdminQuestionPreview = ({
    sno = 1,
    type = "single_choice",
    children,
    options,
    marks = 0,
    handleDeleteQuestion,
    handleEditQuestion,
}) => {

    const customRadioStyle = {
        color: "#ffffff50",
        '&.Mui-checked': {
            color: "#fff"
        }
    }

    const [answer, setAnswer] = useState(type === "multi_choice" ? [] : null)
    const handleCheckboxChange = (event, option) => {
        setAnswer((prev) => {
            if (Array.isArray(prev))
                return event.target.checked ? [...prev, option] : prev.filter((item) => item !== option)
            return null
        });
    }

    return (
        <React.Fragment>
            <div className='p-3 border border-white border-opacity-5 rounded-md bg-white bg-opacity-[0.02] shadow-sm'>
                <div className="flex md:flex-row flex-col-reverse gap-1">
                    <div className='flex flex-row gap-1'>
                        <span> {sno}. </span>
                        <div className='flex-[1]'>
                            {children}

                            <div>
                                {type === "single_choice" && (
                                    <FormControl>
                                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" onChange={(e) => setAnswer(e.target.value)}>
                                            {options.map((option, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={option}
                                                    control={<Radio sx={customRadioStyle} />}
                                                    label={option}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                )}

                                {type === "multi_choice" && (
                                    <FormGroup>
                                        {options.map((option, index) => (
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        sx={customRadioStyle}
                                                        checked={answer?.includes(option)}
                                                        onChange={(event) => handleCheckboxChange(event, option)}
                                                    />
                                                }
                                                label={option}
                                            />
                                        ))}
                                    </FormGroup>
                                )}

                                {type === "short_answer" && (
                                    <Input
                                        label={"Short Answer"}
                                        id={"answer"}
                                        required={true}
                                        type={"text"}
                                        // TODO: handle disable and on form handling
                                        disabled={false}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    />
                                )}

                                {type === "long_answer" && (
                                    <Textarea
                                        label={"Long Answer"}
                                        id={"answer"}
                                        required={true}
                                        // TODO: handle disable and on form handling
                                        disabled={false}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    />
                                )}
                            </div>

                            <div>
                                <p className="w-full border-t border-gray-700 my-3"></p>
                                <div className='flex gap-3'>
                                    <Button type='button' variant="contained" onClick={() => handleEditQuestion(sno - 1)}>
                                        <MdEdit className='me-1' /> Edit
                                    </Button>
                                    <Button type='button' variant="contained" color="error" onClick={() => handleDeleteQuestion(sno - 1)}>
                                        <FaTrash className="me-1" /> Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="inline-flex flex-shrink-0 rounded-full bg-gray-700 shadow-md px-3 py-1 text-sm text-truncate"> {marks} Marks </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const Question = ({ children }) => {
    return <p className='mb-3'>{children}</p>;
}

AdminQuestionPreview.Question = Question;

export default AdminQuestionPreview;
