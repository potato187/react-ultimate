import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomButton from '@/components/CustomButton';

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
				<CustomButton title='Close' className='button-secondary' onClick={handleOnClose} />
				<CustomButton title='Delete' className='button-warning' onClick={handleOnDelete} />
			</Modal.Footer>
		</>
	);
};

export default ModalWarning;
