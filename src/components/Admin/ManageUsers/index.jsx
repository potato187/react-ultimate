import participantApi from '@/api/participantApi';
import { getToast } from '@/helpers';
import useToggle from '@/hooks/useToggle';
import React from 'react';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import CustomButton from '../../CustomButton';
import ModalBase from '../../ModalBase';
import FormCreateUser from '../FormCreateUser';
import FormViewAndEditUser from '../FormViewAndEditUser';
import TableUser from '../TableUser';
import './style.scss';

const ManageUsers = () => {
	const [users, setUsers] = React.useState([]);
	const [user, setUser] = React.useState({});

	const { toggle, handleOpen, handleClose } = useToggle();
	const { toggle: toggleProfile, handleToggle: handleToggleProfile } = useToggle();
	const { toggle: mode, handleToggle: handleChangeMode } = useToggle();

	const handleCreateUser = async (formData) => {
		const response = await participantApi.create(formData);
		const { EC, EM } = response;
		getToast(EC, EM);
	};

	const handleUpdateUser = async (formData) => {
		const response = await participantApi.update(formData);
		const { EC, EM, DT } = response;
		getToast(EC, EM);
		if (EC === 0) {
			setUser(DT);
		}
	};

	const getAllUsers = async () => {
		const response = await participantApi.getAll();
		const { DT, EC, EM } = response;
		if (EC === 0) {
			setUsers(DT);
		}
	};

	const handlePreviewUser = (currentUser) => {
		setUser(currentUser);
		handleToggleProfile(true);
	};

	React.useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<>
			<div className='admin-page'>
				<div className='admin-page__section'>
					<div className='section-breadcrumb'>
						<div className='breadcrumb-icon'>
							<MdDashboardCustomize />
						</div>
						<div className='breadcrumb-main'>
							<h1>Dashboard</h1>
							<Breadcrumb className='mb-0'>
								<Breadcrumb.Item href='#'>Manage Users</Breadcrumb.Item>
								<Breadcrumb.Item href='#'>Create User</Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>
					<div className='section'>
						<div className='section-title'>
							<Row className='align-items-center'>
								<Col md='6'>Deals Analytics</Col>
								<Col md='6' className='text-end'>
									<CustomButton className='button ml-auto' onClick={handleOpen} title='Add User' />
								</Col>
							</Row>
						</div>
						<div className='section-main'>
							<TableUser users={users} onView={handlePreviewUser} mode={mode} handleChangeMode={handleChangeMode} />
						</div>
					</div>
				</div>
			</div>
			<ModalBase title='Add User' show={toggle} handleClose={handleClose}>
				<FormCreateUser onSubmit={handleCreateUser} />
			</ModalBase>
			<ModalBase title='User Profile' show={toggleProfile} handleClose={handleToggleProfile}>
				<FormViewAndEditUser user={user} onSubmit={handleUpdateUser} disabled={mode} />
			</ModalBase>
		</>
	);
};

export default ManageUsers;
