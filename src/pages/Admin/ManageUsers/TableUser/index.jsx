import {uuid} from '@helpers/index.js';
import React from 'react';
import {Table} from 'react-bootstrap';
import style from './style.module.scss';
import ThemeButton from "@components/ThemeButton/index.jsx";

const TableUser = ({
	users = [],
	onView = null,
	onDelete = null,
	mode,
	handleChangeMode,
	setPreviewUser,
	...props
}) => {
	if (!users.length) return <></>;

	const handleOnView = (currentUser, currentMode) => {
		handleChangeMode(currentMode);
		onView(currentUser);
	};

	const handleOnDelete = (user) => {
		onDelete && onDelete(true);
		setPreviewUser && setPreviewUser(user);
	};

	return (
		<div className={`table-responsive ${style['table-users']}`}>
			<Table striped bordered hover className={style['table']} {...props}>
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
					{users.map(({ id, username, email, role, image }, index) => (
						<tr key={uuid()}>
							<td className={style['td-fit']}>{index + 1}</td>
							<td>{username}</td>
							<td>{email}</td>
							<td>{role}</td>
							<td className={style['td-fit']}>
								<ThemeButton
									title='View'
									data-button='secondary sm'
									className='d-line-block'
									onClick={() => handleOnView({ id, username, email, role, userImage: image }, true)}
								/>
								<ThemeButton
									title='Update'
									data-button='sm'
									className='d-inline-block mx-1'
									onClick={() => handleOnView({ id, username, email, role, userImage: image }, false)}
								/>
								<ThemeButton
									title='Delete'
									data-button='danger sm'
									className='d-inline-block'
									onClick={() => handleOnDelete({ id, username, email, role, image })}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default TableUser;
