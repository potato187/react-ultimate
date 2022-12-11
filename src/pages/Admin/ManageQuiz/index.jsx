import quizApi from '@api/quizApi';
import ModalBase from '@components/ModalBase';
import ThemeButton from '@components/ThemeButton';
import { MODAL } from '@constant';
import { getToast, toBase64, typeOf, useImageBase64, uuid } from '@helpers/index.js';
import useToggle from '@hooks/useToggle.js';
import ThemeBreadcrumb from '@pages/Admin/components/ThemeBreadcrumb';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import { toast } from 'react-toastify';
import ThemeTable from '../components/ThemeTable';
import style from '../Layout/style.module.scss';
import ModalCreateQuiz from './ModalCreateQuiz';

const breadcrumb = [
	{
		id: uuid(),
		to: '/',
		title: 'Admin',
	},
	{
		id: uuid(),
		to: '/',
		title: 'Manage Quizzes',
		active: true,
	},
];

const tableHeader = [
	{ name: 'Name', className: 'text-center' },
	{ name: 'Difficulty', className: 'text-center' },
	{ name: 'Actions', className: 'text-center' },
];

const tableBody = ['name', 'difficulty'];

const ManageQuiz = () => {
	const [quiz, setQuiz] = useState([]);
	const [currentQuiz, setCurrentQuiz] = useState({});
	const [isOpenModalQuiz, handleToggleModalQuiz] = useToggle(false);
	const { MODAL_CREATE, MODAL_UPDATE, MODAL_VIEW } = MODAL;
	const [modal, setModal] = useState(MODAL_CREATE);

	const handleCreateQuiz = async (data) => {
		let isSuccess = true;
		const { name, description, quizImage, difficulty, question: questions } = data;
		const response = await quizApi.createQuiz({ name, description, quizImage, difficulty });
		if (response && response.EC !== 0) {
			getToast(response.EC, response.EM);
			return false;
		}

		const { id: quizId } = response.DT;

		for (const question of questions) {
			const { description, questionImage, answers } = question;
			const response = await quizApi.createQuestion({ quiz_id: quizId, description, questionImage });

			if (response && response.EC !== 0) {
				getToast(response.EC, response.EM);
				return false;
			}

			for (const answer of answers) {
				const { description, isCorrect } = answer;
				const response2 = await quizApi.createAnswer({
					question_id: response.DT.id,
					description,
					correct_answer: isCorrect,
				});
				if (response2 && response2.EC !== 0) {
					getToast(response2.EC, response2.EM);
					return false;
				}
			}
		}
		setQuiz((prevQuiz) => [...prevQuiz, { id: quizId, name, description, quizImage, difficulty }]);
		isSuccess ? toast.success('Create a new quiz succeed') : toast.error('Can not create new quiz');
	};

	const handleUpdateQuiz = async (data) => {
		const { id, name, description, difficulty, question: questions, quizImage } = data;
		const { EC, EM } = await quizApi.updateQuiz({ id, name, description, difficulty, quizImage });
		if (EC !== 0) {
			getToast(EC, EM);
			return false;
		}

		for (const question of questions) {
			const { imageFile, answers } = question;
			question.imageFile =
				typeOf(imageFile) === 'filelist' && imageFile.length > 0
					? await toBase64(imageFile[0])
					: useImageBase64(imageFile);

			if (!question.id) {
				question.id = uuid();
			}

			for (const answer of answers) {
				if (!answer.id) {
					answer.id = uuid();
				}
			}
		}

		const response = await quizApi.updateQA({ quizId: id, questions });

		if (EC === 0) {
			setQuiz((prevQuiz) => {
				const index = prevQuiz.findIndex((quiz) => quiz.id === id);
				prevQuiz[index] = { id, name, description, difficulty, image: quizImage };
				return prevQuiz;
			});
		}

		getToast(response.EC, response.EM);
	};

	const handleOpenModalCreate = () => {
		if (modal !== MODAL_CREATE) {
			setModal(MODAL_CREATE);
		}
		handleToggleModalQuiz(true);
	};

	const getQuestionForQuiz = async (quizId) => {
		const { EC, DT, title } = await quizApi.getQAfromQuiz(quizId);
		if (EC !== 0) return [];
		const { qa } = DT;
		return qa;
	};

	const handleOnView = async (quizId, modalType) => {
		const question = await getQuestionForQuiz(quizId);
		const { name, description, image, difficulty } = quiz.find((q) => q.id === quizId);
		setCurrentQuiz({ quizId, name, description, image, question, difficulty });

		if (modal !== modalType) {
			setModal(modalType);
		}
		handleToggleModalQuiz(true);
	};

	const handleOnDelete = async (quizId) => {
		const { EC, EM } = await quizApi.deleteQuiz(quizId);
		setQuiz((prevQuiz) => prevQuiz.filter((q) => q.id !== quizId));
		getToast(EC, EM);
	};

	useEffect(() => {
		(async () => {
			const response = await quizApi.getAllQuiz();
			if (response && response.EC === 0) {
				let data = response.DT;
				setQuiz(data);
			}
		})();
	}, []);

	return (
		<>
			<div className={style['admin-page']}>
				<div className={style['admin-page__section']}>
					<ThemeBreadcrumb title='Manage Quizzes' breadcrumb={breadcrumb} icon={() => <MdDashboardCustomize />} />
					<div className={style['section']}>
						<div className={style['section-title']}>
							<Row className='align-items-center'>
								<Col md='6'>Exams</Col>
								<Col md='6' className='text-end'>
									<ThemeButton className='button ml-auto' title='Add Quiz' onClick={handleOpenModalCreate} />
								</Col>
							</Row>
						</div>
						<div className={style['section-main']}>
							<ThemeTable
								tableHeader={tableHeader}
								tableBody={tableBody}
								data={quiz}
								onView={handleOnView}
								onUpdate={handleOnView}
								onDelete={handleOnDelete}
							/>
						</div>
					</div>
				</div>
			</div>
			<ModalBase
				data-modal='md'
				title='Modal title'
				show={isOpenModalQuiz}
				handleClose={() => handleToggleModalQuiz(false)}>
				<ModalCreateQuiz
					onSubmit={modal === MODAL_CREATE ? handleCreateQuiz : handleUpdateQuiz}
					modal={modal}
					quiz={currentQuiz}
				/>
			</ModalBase>
		</>
	);
};

export default ManageQuiz;
