import { leadingZero, useImageBase64 } from '@helpers';
import style from './style.module.scss';

const Question = ({ index = 1, id, description = '', image = null, children, ...props }) => {
	return (
		<>
			<div className={style['question']} {...props}>
				{image && (
					<div className={style['question-header']}>
						<div className={style['question-media']}>
							<img src={useImageBase64(image)} alt={description} className='w-100 img-fluid' />
						</div>
					</div>
				)}
				<div className={style['question-body']}>
					<div className={style['question-title']}>{`${leadingZero(index + 1)}. ${description}`}</div>
					{children}
				</div>
			</div>
		</>
	);
};

export default Question;
