import quizApi from '@api/quizApi.js';
import ModalBase from '@components/ModalBase';
import ThemeButton from '@components/ThemeButton';
import { MODAL_TYPE } from '@constant';
import { getToast, uuid } from '@helpers/index.js';
import useToggle from '@hooks/useToggle.js';
import ThemeBreadcrumb from '@pages/Admin/components/ThemeBreadcrumb';
import ThemeTable from '@pages/Admin/components/ThemeTable';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
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

	const handleCreateQuiz = (data) => {
		console.log(data);
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
