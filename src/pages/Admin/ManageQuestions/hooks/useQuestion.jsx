import { typeOf, uuid } from '@helpers/index';
import { createContext, useContext, useState } from 'react';

const QuestionContext = createContext({
	questions: [
		{
			id: uuid(),
			description: 'Initial value',
			name: '',
			questionImage: '',
			answers: [{ id: uuid(), description: '', isCorrect: false }],
		},
	],
});

export const ProviderQuestions = ({ children, ...props }) => {
	const [questions, setQuestions] = useState(() => {
		return [
			{
				id: uuid(),
				description: 'Initial value',
				name: '',
				questionImage: '',
				answers: [{ id: uuid(), description: '', isCorrect: false }],
			},
		];
	});

	const addNewQuestion = (quizId = 1) => {
		setQuestions((prevState) => [
			...prevState,
			{
				id: uuid(),
				description: '',
				name: '',
				questionImage: '',
				answers: [{ id: uuid(), description: '', isCorrect: false }],
			},
		]);
	};

	const removeQuestion = (questionId) => {
		setQuestions((prevState) => prevState.filter((state) => state.id !== questionId));
	};

	const addNewAnswer = (questionId) => {
		setQuestions((prevState) => {
			return prevState.map((state) => {
				if (state.id === questionId) {
					state.answers.push({ id: uuid(), description: '', isCorrect: false });
				}
				return state;
			});
		});
	};

	const removeAnswer = (questionId, answerId) => {
		setQuestions((prevState) => {
			return prevState.map((state) => {
				if (state.id === questionId) {
					const answerIndex = state.answers.indexOf((answer) => answer.id === answerId);
					state.answers.splice(answerId, 1);
				}
				return state;
			});
		});
	};

	return (
		<QuestionContext.Provider
			value={{ questions, setQuestions, addNewQuestion, removeQuestion, addNewAnswer, removeAnswer }}
			{...props}>
			{children}
		</QuestionContext.Provider>
	);
};

export const useQuestion = () => {
	const context = useContext(QuestionContext);
	if (typeOf(context) === 'undefine') {
		throw new Error('The Hook must be used in Provider Question');
	}
	return context;
};
