import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalBase = ({ title = 'Add Users', show: passShow = false, handleClose, children, ...props }) => {
	return (
		<Modal show={passShow} onHide={handleClose} backdrop='static' keyboard={false} size='lg' {...props}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	);
};

export default ModalBase;
