import participantApi from '@/api/participantApi';
import ModalBase from '@/components/ModalBase';
import Pagination from '@/components/Pagination';
import CustomButton from '@/components/ThemeButton';
import useAsyncFilters from '@/hooks/useAsyncFilters';
import useToggle from '@/hooks/useToggle';
import { MODAL_TYPE } from '@constant';
import { uuid } from '@helpers/index.js';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import ThemeBreadcrumb from '../components/ThemeBreadcrumb';
import ThemeTable from '../components/ThemeTable';
import style from '../Layout/style.module.scss';

const breadcrumb = [
	{
		id: uuid(),
		to: '/',
		title: 'Manage Users',
	},
	{
		id: uuid(),
		to: '/',
		title: 'Create User',
		active: true,
	},
];

const tableHeader = [
	{ name: 'Name', className: 'text-center' },
	{ name: 'Email', className: 'text-center' },
	{ name: 'Role', className: 'text-center' },
	{ name: 'Actions', className: 'text-center' },
];

const tableBody = ['username', 'email', 'role'];

const ManageUsers = () => {
	const [users, setUsers] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [previewUser, setPreviewUser] = useState({});
	const [tracking, setTracking] = useState(false);
	const { queryParams, setQueryParams } = useAsyncFilters();
	const [isOnModal, toggleModal] = useToggle(false);
	const [modalType, setModalType] = useState(MODAL_TYPE.MODAL_CREATE);

	const handleOnSubmit = async (formData) => {
		modalType === MODAL_TYPE.MODAL_CREATE
			? await participantApi.create(formData)
			: await participantApi.update(formData);
		setTracking((prevState) => !prevState);
		toggleModal(false);
	};

	const handleDeleteUser = async (userId) => {
		await participantApi.delete(userId);
		setTracking((prevState) => !prevState);
	};

	const handleUpdateUser = async (formData) => {
		const response = await participantApi.update(formData);
		if (response) {
			setUsers((prevUsers) => {
				const newUsers = [...prevUsers];
				const index = newUsers.findIndex((user) => +response.id === user.id);
				newUsers[index] = { ...newUsers[index], ...response };
				return newUsers;
			});
			setPreviewUser((prevReviewUser) => ({ ...prevReviewUser, ...response }));
		}
	};

	const handlePreviewUser = (id) => {
		setPreviewUser(users.find((user) => user.id === id));
		setModalType(MODAL_TYPE.MODAL_VIEW);
		toggleModal(true);
	};

	const handleOpenModalCreate = () => {
		toggleModal(true);
		setModalType(MODAL_TYPE.MODAL_CREATE);
	};

	const handleOpenModalUpdate = (id) => {
		setPreviewUser(users.find((user) => user.id === id));
		toggleModal(true);
		setModalType(MODAL_TYPE.MODAL_UPDATE);
	};

	const handleOnPageChange = (event) => {
		const newQueryParams = { ...queryParams, page: +event.selected + 1 };
		setQueryParams(newQueryParams);
	};

	React.useEffect(() => {
		(async () => {
			const response = await participantApi.getFilter(queryParams);
			const { EC, DT } = response;
			if (EC === 0) {
				setUsers(DT.users);
				setTotalPage(DT['totalPages']);
			}
		})();
	}, [queryParams, tracking]);

	return (
		<>
			<div className={style['admin-page']}>
				<div className={style['admin-page__section']}>
					<ThemeBreadcrumb breadcrumb={breadcrumb} icon={() => <MdDashboardCustomize />} />
					<div className={style['section']}>
						<div className={style['section-title']}>
							<Row className='align-items-center'>
								<Col md='6'>Deals Analytics</Col>
								<Col md='6' className='text-end'>
									<CustomButton className='button ml-auto' onClick={handleOpenModalCreate} title='Add User' />
								</Col>
							</Row>
						</div>
						<div className={style['section-main']}>
							<ThemeTable
								tableHeader={tableHeader}
								data={users}
								tableBody={tableBody}
								onView={handlePreviewUser}
								onUpdate={handleOpenModalUpdate}
								onDelete={handleDeleteUser}
							/>
							<Pagination pageOffset={+queryParams.page - 1} pageCount={totalPage} onPageChange={handleOnPageChange} />
						</div>
					</div>
				</div>
			</div>
			{/* <ModalBase title='Add User' show={isOnModal} handleClose={() => toggleModal(false)}>
				<FormCreateUser onSubmit={handleOnSubmit} modalType={modalType} user={previewUser} />
			</ModalBase> */}
		</>
	);
};

export default ManageUsers;
