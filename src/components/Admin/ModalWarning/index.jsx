import React from 'react';
import { Modal } from 'react-bootstrap';
import ThemeButton from '@components/ThemeButton';

const ModalWarning = ({ user, onClose, onDelete }) => {
	const handleOnClose = () => {
		onClose && onClose(false);
	};

	const handleOnDelete = () => {
		onDelete && onDelete(user.id);
	};
	return (
		<>
			<Modal.Body>
				<p className='mb-0'>
					Do you want to delete email: <strong>{user?.email}</strong>
				</p>
			</Modal.Body>
			<Modal.Footer>
				<ThemeButton title='Close' data-button='secondary' onClick={handleOnClose} />
				<ThemeButton title='Delete' data-button='warning' onClick={handleOnDelete} />
			</Modal.Footer>
		</>
	);
};

export default ModalWarning;
