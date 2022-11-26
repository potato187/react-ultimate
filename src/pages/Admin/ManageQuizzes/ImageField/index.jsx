import style from './style.module.scss';
import { Ratio } from 'react-bootstrap';
import imagePlaceholder from '@assets/images/placeholder.png';
import utilities from '@scss/utilities.module.scss';
import { useId, useRef, useState, useEffect } from 'react';
import useClickOutside from '@hooks/useClickOutside.js';
import { checkIfFileIsCorrectType, useImageBase64 } from '@helpers/index.js';
import { ErrorMessage } from '@hookform/error-message';
import '@scss/helpers.scss';
import { toast } from 'react-toastify';

const ImageField = ({ name, defaultValue = '', errors = null, handleSetValue = null, ...props }) => {
	const id = useId();
	const [loading, setLoading] = useState(false);
	const nodeRef = useRef(null);
	const [imagePreview, setImagePreview] = useState(() => {
		return defaultValue.trim().length > 0 ? useImageBase64(defaultValue) : imagePlaceholder;
	});

	useClickOutside(nodeRef, () => {
		setLoading(false);
	});

	const handleOnChange = (e) => {
		const { files } = e.target;

		if (checkIfFileIsCorrectType(files)) {
			setImagePreview(URL.createObjectURL(files[0]));
			handleSetValue(name, files[0]);
		} else {
			setImagePreview(imagePlaceholder);
			handleSetValue(name, '');
			toast.error('Only PNG/JPG/JPEG image formats can be used');
		}
		setLoading(false);
	};

	return (
		<div className={`form-group ${style['image-field']}`} {...props}>
			<label htmlFor={id} className={style['image-filed__wrapper']} onClick={() => setLoading(true)} ref={nodeRef}>
				<input id={id} hidden type='file' onChange={handleOnChange} />
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
};

export default ImageField;
