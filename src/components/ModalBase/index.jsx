import {Modal} from 'react-bootstrap';
import style from './style.module.scss';

const ModalBase = ({ title = 'Add Users', show: passShow = false, handleClose, children, ...props }) => {
	return (
		<Modal className={style['modal']} show={passShow} onHide={handleClose} backdrop='static' keyboard={false} size='lg' {...props}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			{children}
		</Modal>
	);
};

export default ModalBase;
