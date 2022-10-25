import DefaultAvatar from '@/assets/images/user.png';
import { checkIfFileIsCorrectType, trimClassNames } from '@/helpers';
import { ErrorMessage } from '@hookform/error-message';
import { useId, useRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './style.scss';

const AvatarField = ({
	register,
	name,
	errors,
	isSubmitSuccessful,
	defaultAvatarUser = DefaultAvatar,
	disabled = false,
	...props
}) => {
	const id = useId();
	const [loading, setLoading] = useState(false);
	const previewImage = useRef(defaultAvatarUser);
	const error = errors[name];
	const classes = ['form-avatar', disabled ? 'disabled' : ''];

	const fieldRegister = register(name, {
		onChange: (e) => {
			if (!error && e.target.files.length > 0 && checkIfFileIsCorrectType(e.target.files)) {
				previewImage.current = window.URL.createObjectURL(e.target.files[0]);
			}
			setLoading(false);
		},
	});

	useEffect(() => {
		if (isSubmitSuccessful) {
			previewImage.current = defaultAvatarUser;
		}
	}, [isSubmitSuccessful]);

	useEffect(() => {
		previewImage.current = defaultAvatarUser;
	}, []);

	return (
		<div className={trimClassNames(classes)} onClick={() => setLoading(true)} {...props}>
			<Form.Control hidden type='file' id={id} {...fieldRegister} />
			<label className={trimClassNames(['form-avatar__media', `${loading ? 'loading' : ''}`])} htmlFor={id}>
				<span className='form-avatar__shadow'>
					<span className='form-avatar__main'>
						<img loading='lazy' width={512} height={512} src={previewImage.current} alt='' />
					</span>
				</span>
				{!disabled && <div className='form-avatar__btn'>Change</div>}
				<ErrorMessage
					errors={errors}
					name={name}
					render={({ message }) => <div className='invalid-message'>{message}</div>}
				/>
			</label>
		</div>
	);
};

export default AvatarField;
