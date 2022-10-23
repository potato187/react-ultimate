import { uuid } from '@/helpers';
import React from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import CustomButton from '../../CustomButton';
import './style.scss';

const TableUser = ({
	users = [],
	onView = null,
	onUpdate = null,
	onDelete = null,
	mode,
	handleChangeMode,
	...props
}) => {
	if (!users.length) return <></>;

	const handleOnView = (currentUser, currentMode) => {
		handleChangeMode(currentMode);
		onView(currentUser);
	};

	return (
		<div className='table-responsive table-users'>
			<Table striped bordered hover {...props}>
				<thead>
					<tr>
						<th className='text-center'>No.</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map(({ id, username, email, role, image } = user, index) => (
						<tr key={uuid()}>
							<td className='td-fit'>{index + 1}</td>
							<td>{username}</td>
							<td>{email}</td>
							<td>{role}</td>
							<td className='td-fit'>
								<CustomButton
									title='View'
									className='button-sm d-inline-block button-secondary'
									onClick={() => handleOnView({ id, username, email, role, userImage: image }, true)}
								/>
								<CustomButton
									title='Update'
									className='button-sm d-inline-block mx-1'
									onClick={() => handleOnView({ id, username, email, role, userImage: image }, false)}
								/>
								<CustomButton title='Delete' className='button-sm d-inline-block button-danger' />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default TableUser;
