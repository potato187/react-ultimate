import DefaultAvatar from '@assets/images/user.png';
import { checkIfFileIsCorrectType } from '@helpers';
import { ErrorMessage } from '@hookform/error-message';
import useClickOutside from '@hooks/useClickOutside';
import { useEffect, useId, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import style from './style.module.scss';

const AvatarField = ({
	register,
	name,
	errors,
	isSubmitSuccessful,
	defaultAvatarUser = DefaultAvatar,
	disabled = false,
	handleSetValue,
	...props
}) => {
	const id = useId();
	const [loading, setLoading] = useState(false);
	const previewImage = useRef(defaultAvatarUser);
	const error = errors[name];
	const ref = useRef(null);

	useClickOutside(ref, () => {
		setLoading(false);
	});

	const fieldRegister = register(name, {
		onChange: (e) => {
			if (!error && e.target.files.length > 0 && checkIfFileIsCorrectType(e.target.files)) {
				previewImage.current = window.URL.createObjectURL(e.target.files[0]);
				handleSetValue(name, e.target.files[0]);
			}
			if (error) {
				previewImage.current = DefaultAvatar;
				handleSetValue(name, '');
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
		<div className={style['form-avatar']} {...props} ref={ref}>
			<Form.Control hidden type='file' id={id} {...fieldRegister} />
			<label
				className={style['form-avatar__media']}
				data-loading={loading}
				onClick={() => setLoading(true)}
				htmlFor={id}>
				<span className={style['form-avatar__shadow']}>
					<span className={style['form-avatar__main']}>
						<img loading='lazy' width='512' height='512' src={previewImage.current} alt='' />
					</span>
				</span>
				{!disabled && <div className={style['form-avatar__btn']}>Change</div>}
				<ErrorMessage
					errors={errors}
					name={name}
					render={({ message }) => <div className={style['invalid-message']}>{message}</div>}
				/>
			</label>
		</div>
	);
};

export default AvatarField;
