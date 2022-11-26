import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import { useQuestion } from '../hooks/useQuestion';
import style from './style.module.scss';

const GroupAnswers = ({ answers = [], addNewAnswer, removeAnswer }) => {};

const FieldQuestion = ({ quizzes = [] }) => {
	const { questions, addNewQuestion, removeQuestion, addNewAnswer, removeAnswer } = useQuestion();

	const showingBtnMinus = questions.length > 1;
	const handleAddNewQuestion = () => {
		if (addNewQuestion) {
			addNewQuestion();
		}
	};
	const handleRemoveQuestion = (questionId) => {
		if (removeQuestion) {
			removeQuestion(questionId);
		}
	};

	const handleAddNewAnswer = (questionId) => {
		if (addNewAnswer) {
			addNewAnswer(questionId);
		}
	};

	const handleRemoveAnswer = (questionId, answerId) => {
		if (removeAnswer) {
			removeAnswer(questionId, answerId);
		}
	};

	return (
		<>
			{questions.map(({ id: questionId, description, answers, ...props }, index) => (
				<div className={style['field-question']} key={questionId}>
					<div className={style['field-question__header']}>
						<div className={`form-group ${style['form-group']}`}>
							<input
								type='text'
								name={`question-${index + 1}`}
								className='form-control'
								placeholder='Enter your question'
								defaultValue={description}
							/>
						</div>
						<div className={style['field-question__action']}>
							<button type='button'>
								<BsFillImageFill size='1.25em' />
							</button>
							<button type='button' onClick={handleAddNewQuestion}>
								<AiOutlinePlusCircle size='1.25em' />
							</button>
							<button
								type='button'
								size='1.25em'
								disabled={!showingBtnMinus}
								onClick={() => handleRemoveQuestion(questionId)}>
								<AiOutlineMinusCircle size='1.25em' />
							</button>
						</div>
					</div>
					<div className={style['field-question__body']}>
						{answers.map(({ id: answerId, isCorrect, description, ...rest }, index) => (
							<div className={style['field-question__answer']} key={answerId}>
								<div className='answer-checkbox d-flex justify-content-center align-items-center'>
									<input type='checkbox' className='form-checkbox' defaultChecked={isCorrect} />
								</div>
								<input type='text' className='form-control' defaultValue={description} />
								<div className={style['field-question__action']}>
									<button type='button' onClick={() => handleAddNewAnswer(questionId)}>
										<AiOutlinePlusCircle size='1.25em' />
									</button>
									<button
										type='button'
										onClick={() => handleRemoveAnswer(questionId, answerId)}
										disabled={answers.length === 1}>
										<AiOutlineMinusCircle size='1.25em' />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</>
	);
};

export default FieldQuestion;
