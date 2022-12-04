import questionApi from '@api/questionApi';
import quizApi from '@api/quizApi';
import ModalBase from '@components/ModalBase';
import ThemeButton from '@components/ThemeButton';
import { getToast, uuid } from '@helpers/index.js';
import useToggle from '@hooks/useToggle.js';
import ThemeBreadcrumb from '@pages/Admin/components/ThemeBreadcrumb';
import { Col, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import { toast } from 'react-toastify';
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

const ManageQuiz = () => {
	const [isOpenModalQuiz, handleToggleModalQuiz] = useToggle(false);

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
			const response = await questionApi.createQuestion({ quiz_id: quizId, description, questionImage });
			if (response && response.EC !== 0) {
				getToast(response.EC, response.EM);
				return false;
			}

			for (const answer of answers) {
				const { description, isCorrect } = answer;
				const response2 = await questionApi.createAnswer({
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

		isSuccess ? toast.success('Create a new quiz succeed') : toast.error('Can not create new quiz');
	};

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
									<ThemeButton
										className='button ml-auto'
										title='Add Quiz'
										onClick={() => handleToggleModalQuiz(true)}
									/>
								</Col>
							</Row>
						</div>
						<div className={style['section-main']}></div>
					</div>
				</div>
			</div>
			<ModalBase
				data-modal='md'
				title='Modal title'
				show={isOpenModalQuiz}
				handleClose={() => handleToggleModalQuiz(false)}>
				<ModalCreateQuiz onSubmit={handleCreateQuiz} />
			</ModalBase>
		</>
	);
};

export default ManageQuiz;
