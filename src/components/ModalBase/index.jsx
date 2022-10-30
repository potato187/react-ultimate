import { Modal } from 'react-bootstrap';
import './style.scss';

const ModalBase = ({ title = 'Add Users', show: passShow = false, handleClose, children, ...props }) => {
	return (
		<Modal show={passShow} onHide={handleClose} backdrop='static' keyboard={false} size='lg' {...props}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			{children}
		</Modal>
	);
};

export default ModalBase;
