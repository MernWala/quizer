import { useState, useEffect } from "react";

const useFetchAllQuestions = (quizId) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // TODO: Replace with Axios call to fetch questions using `quizId`
                
                const data = [
                    {
                        _id: 0,
                        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aperiam nostrum, explicabo at veniam dolorum? Quos quam magnam eaque natus inventore ratione dolorem aperiam expedita distinctio, dolores, obcaecati illo reiciendis.',
                        questionType: 'single_choice',
                        options: ['Option - 1', 'Options - 2', 'Option - 3', 'Option - 4'],
                        marks: 1,
                        images: []
                    },
                    {
                        _id: 1,
                        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aperiam nostrum, explicabo at veniam dolorum? Quos quam magnam eaque natus inventore ratione dolorem aperiam expedita distinctio, dolores, obcaecati illo reiciendis.',
                        questionType: 'multi_choice',
                        options: ['Option - 1', 'Options - 2', 'Option - 3', 'Option - 4'],
                        marks: 1,
                        images: []
                    },
                    {
                        _id: 2,
                        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aperiam nostrum, explicabo at veniam dolorum? Quos quam magnam eaque natus inventore ratione dolorem aperiam expedita distinctio, dolores, obcaecati illo reiciendis.',
                        questionType: 'short_answer',
                        marks: 2,
                        images: []
                    },
                    {
                        _id: 3,
                        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aperiam nostrum, explicabo at veniam dolorum? Quos quam magnam eaque natus inventore ratione dolorem aperiam expedita distinctio, dolores, obcaecati illo reiciendis.',
                        questionType: 'long_answer',
                        marks: 5,
                        images: []
                    },
                ];

                setQuestions(data);
            } catch (error) {
                setError(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [quizId]);

    return { questions, loading, error };
};

export default useFetchAllQuestions;
