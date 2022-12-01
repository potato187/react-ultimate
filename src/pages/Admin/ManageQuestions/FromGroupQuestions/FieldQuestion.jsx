import { useImageBase64 } from '@helpers/index';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useId, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineFolderView, AiOutlineDelete } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import FieldAnswer from './FieldAnswer';
import style from './style.module.scss';

const FieldQuestion = ({ index, control, append, remove, ...props }) => {
	const {
		watch,
		handleOpenLightBox,
		setValue,
		formState: { errors },
	} = useFormContext();

	const descriptionId = useId();
	const questionImageId = useId();
	const watchImage = watch(`question[${index}].questionImage`);
	const disabled = !!!watchImage;

	const appendFieldQuestion = () => {
		if (append) {
			append({ description: '', questionImage: '', answers: [{ description: '', isCorrect: false }] });
		}
	};

	const removeFieldQuestion = (index) => {
		if (remove) {
			remove(index);
		}
	};

	const handleRemoveQuestionImage = (index) => {
		setValue(`question[${index}].questionImage`, '');
	};

	return (
		<div className={style['field-question']}>
			<div className={style['field-question__title']}>Question {index + 1}: </div>
			<div className={style['field-question__header']}>
				<div className={`form-group ${style['form-group']}`}>
					<Controller
						control={control}
						name={`question[${index}].description`}
						render={({ field }) => {
							return <input id={descriptionId} className='form-control' placeholder='Enter Question' {...field} />;
						}}
					/>
				</div>
				<div className={style['field-question__action']}>
					<Controller
						control={control}
						name={`question[${index}].questionImage`}
						render={({ field }) => (
							<label className={style['btn-fill-image']}>
								<input
									hidden
									id={questionImageId}
									type='file'
									{...field}
									value={field.value.filename}
									onChange={(e) => field.onChange(e.target.files)}
								/>
								<BsFillImageFill size='1.25em' />
							</label>
						)}
					/>
					<button disabled={disabled} type='button' onClick={() => handleOpenLightBox(watchImage)}>
						<AiOutlineFolderView size='1.25em' />
					</button>
					<button disabled={disabled} type='button' onClick={() => handleRemoveQuestionImage(index)}>
						<AiOutlineDelete size='1.25em' />
					</button>
					<button type='button' onClick={appendFieldQuestion}>
						<AiOutlinePlusCircle size='1.25em' />
					</button>
					<button type='button' size='1.25em' onClick={() => removeFieldQuestion(index)}>
						<AiOutlineMinusCircle size='1.25em' />
					</button>
					<ErrorMessage
						errors={errors}
						name={`question[${index}].questionImage`}
						render={({ message }) => (
							<div className={style['invalid-message']} style={{ bottom: '-1.25rem' }}>
								{message}
							</div>
						)}
					/>
				</div>
				<ErrorMessage
					errors={errors}
					name={`question[${index}].description`}
					render={({ message }) => <div className={style['invalid-message']}>{message}</div>}
				/>
			</div>
			<div className={style['field-question__body']}>
				<FieldAnswer control={control} questionIndex={index} />
			</div>
		</div>
	);
};

export default FieldQuestion;
