import style from './style.module.scss';
import { Ratio } from 'react-bootstrap';
import imagePlaceholder from '@assets/images/placeholder.png';
import utilities from '@scss/utilities.module.scss';
import { useId, useRef, useState, useEffect } from 'react';
import useClickOutside from '@hooks/useClickOutside.js';
import { checkIfFileIsCorrectType, typeOf, useImageBase64 } from '@helpers/index.js';
import { ErrorMessage } from '@hookform/error-message';
import '@scss/helpers.scss';
import { toast } from 'react-toastify';
import { Controller, useFormContext } from 'react-hook-form';
import { MODAL } from '@constant';

const ImageField = ({ name, defaultValue = '', ...props }) => {
	const { MODAL_CREATE } = MODAL;
	const id = useId();
	const {
		modal,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useFormContext();
	const [loading, setLoading] = useState(false);
	const nodeRef = useRef(null);
	const quizImageWatch = watch(name);

	const [imagePreview, setImagePreview] = useState(() => {
		return defaultValue.trim().length > 0 ? useImageBase64(defaultValue) : imagePlaceholder;
	});

	useClickOutside(nodeRef, () => {
		setLoading(false);
	});

	const convertImage = (image) => {
		return typeOf(image) === 'string' ? useImageBase64(quizImageWatch) : URL.createObjectURL(quizImageWatch[0]);
	};
	useEffect(() => {
		const image = quizImageWatch && quizImageWatch.length > 0 ? convertImage(quizImageWatch) : imagePlaceholder;
		setImagePreview(image);
		setLoading(false);
	}, [quizImageWatch]);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange, ...restFiled } }) => {
				return (
					<div className={`form-group ${style['image-field']}`} {...props}>
						<label
							htmlFor={id}
							className={style['image-filed__wrapper']}
							onClick={() => setLoading(true)}
							ref={nodeRef}>
							<input
								id={id}
								hidden
								type='file'
								value={value.filename}
								onChange={(e) => onChange(e.target.files)}
								{...restFiled}
							/>
							<span data-loading={loading} className={`${style['image-filed__preview']} ${utilities['loading']}`}>
								<Ratio as='span' className='d-block' aspectRatio='16x9'>
									<img className='w-100 h-auto img-fluid' src={imagePreview} alt='' />
								</Ratio>
							</span>
						</label>
						<ErrorMessage
							errors={errors}
							name={name}
							render={({ message }) => <div className='error-message text-center pt-2'>{message}</div>}
						/>
					</div>
				);
			}}
		/>
	);
};

export default ImageField;
