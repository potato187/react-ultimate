import React from 'react';
import { Table } from 'react-bootstrap';
import { uuid } from '@/helpers';
import CustomButton from '../../CustomButton';
import './style.scss';

const TableUser = ({ users = [], onView = null, onUpdate = null, onDelete = null, ...props }) => {
	if (!users.length) return <></>;

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
					{users.map(({ id, username, email, role }, index) => (
						<tr key={uuid()}>
							<td className='td-fit'>{index + 1}</td>
							<td>{username}</td>
							<td>{role}</td>
							<td>email</td>
							<td className='td-fit'>
								<CustomButton title='View' className='button-sm d-inline-block button-secondary' />
								<CustomButton title='Update' className='button-sm d-inline-block mx-1' />
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
