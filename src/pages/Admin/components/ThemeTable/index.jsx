import ModalBase from '@components/ModalBase';
import ThemeButton from '@components/ThemeButton/index.jsx';
import { MODAL_TYPE } from '@constant';
import { uuid } from '@helpers';
import useToggle from '@hooks/useToggle';
import { useRef } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { ref } from 'yup';
import style from './style.module.scss';

const ThemeTable = ({
	tableHeader = [],
	tableBody = [],
	onView = null,
	onUpdate = null,
	onDelete = null,
	toggleModal = null,
	...props
}) => {
	const [isOn, toggle] = useToggle(false);
	const refId = useRef(-1);

	const handleOnView = (id) => {
		onView(id, MODAL_TYPE.MODAL_VIEW);
	};

	const handleUpdate = (id) => {
		if (onUpdate) {
			onUpdate(id, MODAL_TYPE.MODAL_UPDATE);
		}
	};

	const handleOnDelete = (id) => {
		refId.current = id;
		toggle(true);
	};

	const handleConfirmDelete = () => {
		onDelete && onDelete(refId.current);
		toggle(false);
	};

	const handleCancelDelete = () => {
		toggle(false);
		refId.current = -1;
	};

	return (
		<>
			<div className='table-responsive'>
				<Table striped bordered hover className={style['table']} {...props}>
					<thead>
						<tr>
							{tableHeader.length > 0
								? tableHeader.map(({ name, ...props }) => (
										<th key={uuid()} {...props}>
											{name}
										</th>
								  ))
								: null}
						</tr>
					</thead>
					<tbody>
						{tableBody.length > 0
							? tableBody.map(({ id, difficulty, name }) => (
									<tr key={uuid()}>
										<td>{name}</td>
										<td className='text-center'>{difficulty}</td>
										<td className='d-flex gap-1 justify-content-center'>
											<ThemeButton title='View' data-button='sm secondary' onClick={() => handleOnView(id)} />
											<ThemeButton title='Update' data-button='sm warning' onClick={() => handleUpdate(id)} />
											<ThemeButton title='Delete' data-button='sm danger' onClick={() => handleOnDelete(id)} />
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</Table>
			</div>
			<ModalBase data-modal='md' size='md' title='Delete Quiz' show={isOn} handleClose={handleCancelDelete}>
				<Modal.Body>
					<div>Do you want delete quiz ?</div>
				</Modal.Body>
				<Modal.Footer>
					<ThemeButton title='Close' data-button='sm secondary' onClick={handleCancelDelete} />
					<ThemeButton title='Confirm' data-button='sm danger' onClick={handleConfirmDelete} />
				</Modal.Footer>
			</ModalBase>
		</>
	);
};

export default ThemeTable;
