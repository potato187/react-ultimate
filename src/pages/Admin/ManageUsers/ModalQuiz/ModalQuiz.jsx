import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalQuiz = (props) => {
	const { show, handleClose, handleOpen } = useModalBase();
	return (
		<>
			<Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} {...props}>
				<Modal.Header closeButton>
					<Modal.Title>Modal Quiz</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalQuiz;
