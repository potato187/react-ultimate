import quizApi from '@api/quizApi.js';
import ModalBase from '@components/ModalBase';
import ThemeButton from '@components/ThemeButton';
import { MODAL_TYPE } from '@constant';
import { getToast, uuid } from '@helpers/index.js';
import useToggle from '@hooks/useToggle.js';
import ThemeBreadcrumb from '@pages/Admin/components/ThemeBreadcrumb';
import ThemeTable from '@pages/Admin/components/ThemeTable';
import ModalCreateQuiz from '@pages/Admin/ManageQuizz/ModalCreateQuiz';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import style from '../Layout/style.module.scss';

const breadcrumb = [
	{
		id: uuid(),
		to: '/',
		title: 'Admin',
	},
	{
		id: uuid(),
		to: '/',
		title: 'Manage Quizz',
		active: true,
	},
];

const tableHeader = [
	{ name: 'Quiz name', className: 'text-center' },
	{ name: 'Quiz difficulty', className: 'text-center' },
	{ name: 'actions', className: 'text-center' },
];

const ManageQuizzes = () => {
	const [quiz, setQuiz] = useState([]);
	const [currentQuiz, setCurrentQuiz] = useState({});
	const [isShow, toggleIsShow] = useToggle(false);
	const [isShowDelete, toggleIsShowDelete] = useToggle(false);
	const [modalType, setModalType] = useState(MODAL_TYPE.MODAL_CREATE);
	const [tracking, setTracking] = useState(false);

	const handleOnSubmit = async (data) => {
		modalType === MODAL_TYPE.MODAL_CREATE ? await quizApi.createQuiz(data) : await quizApi.updateQuiz(data);
		toggleIsShow(false);
		setTracking((prevState) => !prevState);
	};

	const handleOpenModalEditAndUpdate = async (id = null, modalType) => {
		const response = await quizApi.getQuizById(id);
		if (response && response.EC === 0) {
			setCurrentQuiz(response.DT);
		} else {
			getToast.error(response.EM);
		}
		setModalType(modalType);
		toggleIsShow(true);
	};

	const handleOpenModalCreate = () => {
		toggleIsShow(true);
		setModalType(MODAL_TYPE.MODAL_CREATE);
	};

	const handleOpenModalUpdate = () => {
		toggleIsShow(true);
		setModalType(MODAL_TYPE.MODAL_UPDATE);
		setTracking((prevState) => !prevState);
	};

	const handleDeleteQuizById = async (id) => {
		const EC = await quizApi.deleteQuizById(id);
		if (EC === 0) {
			setTracking((prevState) => !prevState);
		}
	};

	const getTitleModal = (modalType) => {
		switch (modalType) {
			case MODAL_TYPE.MODAL_VIEW:
				return 'View Quiz';
			case MODAL_TYPE.MODAL_UPDATE:
				return 'Update Quiz';
			default:
				return 'create Quiz';
		}
	};

	useEffect(() => {
		(async () => {
			const response = await quizApi.getAllQuiz();
			if (response && response.EC === 0) {
				setQuiz(response?.DT);
			}
		})();
	}, [tracking]);

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
								tableBody={quiz}
								onView={handleOpenModalEditAndUpdate}
								onUpdate={handleOpenModalEditAndUpdate}
								onDelete={handleDeleteQuizById}
							/>
						</div>
					</div>
				</div>
			</div>
			<ModalBase data-modal='md' title={getTitleModal(modalType)} show={isShow} handleClose={() => toggleIsShow(false)}>
				<ModalCreateQuiz
					quiz={currentQuiz}
					modalType={modalType}
					onSubmit={handleOnSubmit}
					handleToggle={toggleIsShow}
				/>
			</ModalBase>
		</>
	);
};

export default ManageQuizzes;
