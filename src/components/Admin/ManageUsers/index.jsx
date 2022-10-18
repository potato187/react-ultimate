import participantApi from '@/api/participantApi';
import { getToast } from '@/helpers';
import React from 'react';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import CustomButton from '../../CustomButton';
import ModalUser from '../ModalUser/ModalUser';
import TableUser from '../TableUser';
import './style.scss';

const ManageUsers = () => {
	const [users, setUsers] = React.useState([]);
	const [toggle, setToggle] = React.useState(false);
	const handleOpen = () => {
		setToggle(true);
	};
	const handleClose = () => {
		setToggle(false);
	};

	const handleCreateUser = async (data) => {
		const formData = new FormData();
		for (const name in data) {
			if (name === 'userImage' && data[name] && data[name][0]) {
				formData.append(name, data[name][0]);
			} else {
				formData.append(name, data[name]);
			}
		}
		const response = await participantApi.create(formData);
		const { EC, EM } = response;
		getToast(EC, EM);
	};
	const getAllUsers = async () => {
		const response = await participantApi.getAll();
		const { DT, EC, EM } = response;
		if (EC === 0) {
			setUsers(DT);
		}
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
							<TableUser users={users} />
						</div>
					</div>
				</div>
			</div>
			<ModalUser show={toggle} handleClose={handleClose} onSubmit={handleCreateUser} />
		</>
	);
};

export default ManageUsers;
