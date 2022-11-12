import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import questionApi from "@api/questionApi.js";
import style from "./style.module.scss";
import Quiz from "@components/Users/Quiz/index.jsx";
import ThemeButton from "@components/ThemeButton/index.jsx";
import QuizAnswer from "@components/Users/QuizAnswer/index.jsx";
import QuestionTable from "@components/Users/QuestionTable/index.jsx";

const QuestionDetailPage = () => {
    const param = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizTitle, setQuizTitle] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await questionApi.getQuestionById(param.id);
            const {EC, DT} = response;
            if (EC === 0 && DT) {
                const raw = DT.reduce((arr, current) => {
                    const {id, description, image, answers} = current;
                    answers.isSelected = false;
                    const index = arr.findIndex(quiz => quiz.id === id);
                    if (index === -1) {
                        const quiz = {};
                        quiz.id = id;
                        quiz.description = description;
                        quiz.image = image;
                        quiz.answers = [];
                        arr.push(quiz);
                    } else {
                        arr[index].answers.push(answers);
                    }
                    return arr;
                }, []);

                setQuestions(raw);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await questionApi.getQuizById(param.id);
            const {EC, DT} = response;
            if (EC === 0 && DT) {
                setQuizTitle(DT?.name);
            }
        })();
    }, []);

    const handleSelectAnswer = (answerId, selected) => {
        const currentQuestionId = questions[currentQuestion].id;
        setQuestions(prevState => {
            return prevState.map((question) => {
                if (question.id === currentQuestionId) {
                    const index = question.answers.findIndex(answer => answer.id === answerId);
                    question.answers[index].isSelected = selected;
                }
                return question;
            });
        });
    };

    const handleNavigateQuestion = (flag = true) => {
        const MAX_LENGTH = questions.length - 1;

        let newPosition = currentQuestion;

        if(flag) {
            newPosition = currentQuestion + 1 > MAX_LENGTH ? 0 : currentQuestion + 1;
        }else {
            newPosition = currentQuestion - 1 < 0 ? MAX_LENGTH : currentQuestion - 1;
        }

        setCurrentQuestion(newPosition);
    }


    const handleSubmitQuestion = () => {
        const objectSubmit = { quizId: param.id, answers: []};
        questions.forEach(question => {
            objectSubmit.answers.push({
                questionId: question.id,
                userAnswerId: question.answers.reduce((arr, current) => {
                    if(current.isSelected) {
                        arr.push(current.id);
                    }
                    return arr;
                }, [])
            });
        });

        console.log(objectSubmit);
    }

    return (
        <main className={style['quiz-list']}>
            <Container>
                <div className='py-5'>
                    <Row>
                        <Col className='col-8'>
                            <div className={`${style['quiz-list__header']} border-bottom-0`}>
                                <h3 className={style['quiz-list__title']}>{quizTitle}</h3>
                            </div>
                            <div className={style['quiz-list__wrapper']}>
                                <div className={style['quiz-list__main']}>
                                    {
                                        questions.length > 0 && (
                                            <Quiz index={currentQuestion} {...questions[currentQuestion]}>
                                                {
                                                    questions[currentQuestion].answers.length && questions[currentQuestion].answers.map((answer) =>
                                                        <QuizAnswer key={answer.id} {...answer} onChange={handleSelectAnswer}/>)
                                                }
                                            </Quiz>
                                        )
                                    }
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <ThemeButton className='mx-1' data-button='sm' title='Previous' onClick={() => handleNavigateQuestion(false)}/>
                                    <ThemeButton className='mx-1' data-button='sm' title='Next' onClick={() => handleNavigateQuestion()}/>
                                    <ThemeButton className='mx-1' data-button='sm warning' title='Finish' onClick={handleSubmitQuestion}/>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-4'>
                            <QuestionTable questions={questions} currentIndex={currentQuestion} length={questions.length} handleSelect={setCurrentQuestion} />
                        </Col>
                    </Row>
                </div>
            </Container>
        </main>
    );
}

export default QuestionDetailPage;