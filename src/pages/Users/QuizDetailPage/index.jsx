import {useEffect, useState} from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import quizApi from "@api/quizApi.js";
import style from "./style.module.scss";
import ThemeButton from "@components/ThemeButton";
import ModalBase from "@components/ModalBase/index.jsx";
import useToggle from "@hooks/useToggle.js";
import Question from "../Question";
import QuestionAnswer from "../QuestionAnswer";
import QuestionTable from "../QuestionTable";

const QuizDetailPage = () => {
    const {quizId} = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [title, setTitle] = useState('');
    const [result, setResult] = useState({});
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const {toggle, handleOpen, handleClose} = useToggle(false);

    useEffect(() => {
        (async () => {
            const response = await quizApi.getAllQuestionOfQuiz(quizId);
            const {EC, DT, title} = response;
            if (EC === 0 && DT) {
                const raw = DT.reduce((arr, current) => {
                    const {id, description, image, answers} = current;
                    answers.isSelected = false;
                    const index = arr.findIndex(question => question.id === id);
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
                setTitle(title);
            }
        })();
    }, [quizId]);

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
        setCurrentQuestion(prevState => {
            return flag ? prevState + 1 > MAX_LENGTH ? 0 : prevState + 1 : prevState - 1 < 0 ? MAX_LENGTH : prevState - 1
        })
    };

    const handleSubmitQuestions = async () => {
        const payload = {quizId: +quizId, answers: []};
        if (questions && questions.length) {
            questions.forEach(question => {
                payload.answers.push({
                    questionId: question.id,
                    userAnswerId: question.answers.reduce((arr, current) => {
                        if (current.isSelected) {
                            arr.push(current.id);
                        }
                        return arr;
                    }, [])
                });
            });
            const response = await quizApi.submitQuiz(payload);
            if (response && response.EC === 0) {
                handleOpen();
                setResult(response.DT);
            }
        }
    };

    const handleShowCorrectAnswers = () => {
        setShowCorrectAnswers(true);
        handleClose();
    };

    const handleReset = () => {
        setCurrentQuestion(0);
        setResult({});
        setShowCorrectAnswers(false);
        setQuestions(prevState => {
            const newQuestions = prevState.map(question => {
                question.answers.map(answer => {
                    answer.isSelected = false;
                    return answer;
                })
                return question;
            });
            return newQuestions;
        });
    }

    return (
        <>
            <main className={style['quiz-list']}>
                <Container>
                    <div className='py-5'>
                        <Row>
                            <Col className='col-8'>
                                <div className={`${style['quiz-list__header']} border-bottom-0`}>
                                    <h3 className={style['quiz-list__title']}>{title}</h3>
                                </div>
                                <div className={style['quiz-list__wrapper']}>
                                    <div className={style['quiz-list__main']}>
                                        {
                                            questions.length > 0 && (
                                                <Question index={currentQuestion} {...questions[currentQuestion]} >
                                                    {
                                                        questions[currentQuestion].answers.length && questions[currentQuestion].answers.map((answer) =>
                                                            <QuestionAnswer key={answer.id} {...answer}
                                                                        correctAnswers={result.quizData ? result.quizData[currentQuestion] : null}
                                                                        showCorrectAnswers={showCorrectAnswers}
                                                                        onChange={handleSelectAnswer}/>)
                                                    }
                                                </Question>
                                            )
                                        }
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <ThemeButton className='mx-1' data-button='sm' title='Previous'
                                                     onClick={() => handleNavigateQuestion(false)}/>
                                        <ThemeButton className='mx-1' data-button='sm' title='Next'
                                                     onClick={() => handleNavigateQuestion()}/>
                                        <ThemeButton className='mx-1' data-button='sm warning' title='Finish'
                                                     onClick={handleSubmitQuestions}/>
                                        <ThemeButton className='mx-1' data-button='sm danger' title='Reset'
                                                     onClick={handleReset}/>
                                    </div>
                                </div>
                            </Col>
                            <Col className='col-4'>
                                <QuestionTable questions={questions} currentIndex={currentQuestion}
                                               length={questions.length} handleSelect={setCurrentQuestion}/>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </main>
            <ModalBase size='md' data-modal='md' show={toggle} handleClose={handleClose} title='Your Result'>
                <Modal.Body>
                    <div>Total Questions: {result.countTotal}</div>
                    <div>Total Correct Answers: {result.countCorrect}</div>
                </Modal.Body>
                <Modal.Footer>
                    <ThemeButton data-button='sm warning' title='Show anwsers'
                                 onClick={handleShowCorrectAnswers}/>
                    <ThemeButton data-button='sm senodary' title='Close' onClick={handleClose}/>
                </Modal.Footer>
            </ModalBase>
        </>
    );
}

export default QuizDetailPage;