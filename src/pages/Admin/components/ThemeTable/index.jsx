import ModalBase from '@components/ModalBase';
import ThemeButton from '@components/ThemeButton/index.jsx';
import { MODAL } from '@constant';
import { uuid } from '@helpers';
import useToggle from '@hooks/useToggle';
import { useRef } from 'react';
import { Modal, Table } from 'react-bootstrap';
import style from './style.module.scss';

const ThemeTable = ({
	tableHeader = [],
	data = [],
	tableBody = [],
	onView = null,
	onUpdate = null,
	onDelete = null,
	toggleModal = null,
	...props
}) => {
	const { MODAL_VIEW, MODAL_UPDATE } = MODAL;
	const [isOn, toggle] = useToggle(false);
	const refId = useRef(-1);

	const handleOnView = (id, modalType) => {
		onView(id, modalType);
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
						{data.length > 0
							? data.map(({ id, ...rest }) => (
									<tr key={uuid()}>
										{tableBody.map((key, index) => (
											<td key={index}>{rest[key]}</td>
										))}
										<td className='d-flex gap-1 justify-content-center'>
											<ThemeButton
												title='View'
												data-button='sm secondary'
												onClick={() => handleOnView(id, MODAL_VIEW)}
											/>
											<ThemeButton
												title='Update'
												data-button='sm warning'
												onClick={() => handleOnView(id, MODAL_UPDATE)}
											/>
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
					<div>Do you want to delete ?</div>
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
