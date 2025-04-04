import React from 'react'
import QuizFolder from '../../../components/QuizFolder'

const page = () => {
    return (
        <React.Fragment>
            <div className="flex gap-4 flex-wrap p-3">
                <QuizFolder id="1" length={0}>Series - 1</QuizFolder>
                <QuizFolder id="2" length={10}>Series - 2</QuizFolder>
                <QuizFolder id="3" length={50}>Series - 3</QuizFolder>
                <QuizFolder id="4" length={20}>Series - 4</QuizFolder>
                <QuizFolder id="5" length={0}>Series - 5</QuizFolder>
            </div>
        </React.Fragment>
    )
}

export default page