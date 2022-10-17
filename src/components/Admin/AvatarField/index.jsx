import DefaultAvatarUser from '@/assets/images/user.png';
import { checkIfFileIsCorrectType, trimClassNames } from '@/helpers';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { Form } from 'react-bootstrap';
import './style.scss';

const AvatarField = ({ register, name, errors, isSubmitSuccessful, ...props }) => {
	const id = React.useId();
	const [loading, setLoading] = React.useState(false);
	const previewImage = React.useRef(DefaultAvatarUser);
	const error = errors[name];

	const fieldRegister = register(name, {
		onChange: (e) => {
			if (!error && e.target.files.length > 0 && checkIfFileIsCorrectType(e.target.files)) {
				previewImage.current = window.URL.createObjectURL(e.target.files[0]);
			}
			setLoading(false);
		},
	});

	React.useEffect(() => {
		if (isSubmitSuccessful) {
			previewImage.current = DefaultAvatarUser;
		}
	}, [isSubmitSuccessful]);

	return (
		<div className='form-avatar' onClick={() => setLoading(true)}>
			<Form.Control hidden type='file' id={id} {...fieldRegister} />
			<label className={trimClassNames(['form-avatar__media', `${loading ? 'loading' : ''}`])} htmlFor={id}>
				<span className='form-avatar__shadow'>
					<span className='form-avatar__main'>
						<img loading='lazy' width={512} height={512} src={previewImage.current} alt='' />
					</span>
				</span>
				<div className='form-avatar__btn'>Change</div>
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
