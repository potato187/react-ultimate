import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import CustomButton from '../../CustomButton';
import ModalUser from '../ModalUser/ModalUser';
import './style.scss';

const CreateUser = () => {
	const [toggle, setToggle] = React.useState(false);
	const handleOpen = () => {
		setToggle(true);
	};
	const handleClose = () => {
		setToggle(false);
	};

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
						<div className='section-title'>Deals Analytics</div>
						<div className='section-main'>
							<CustomButton className='button' onClick={handleOpen} title='Add User' />
						</div>
					</div>
				</div>
			</div>
			<ModalUser show={toggle} handleClose={handleClose} />
		</>
	);
};

export default CreateUser;
