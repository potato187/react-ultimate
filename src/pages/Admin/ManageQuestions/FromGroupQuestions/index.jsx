import { uuid } from '@helpers/index';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FiledQuestion from './FieldQuestion';

const FromGroupQuestions = () => {
	const {
		control,
		formState: { isSubmitSuccessful },
	} = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'question',
	});

	return (
		<>
			{fields.map((question, index) => (
				<FiledQuestion key={uuid()} control={control} index={index} append={append} remove={remove} />
			))}
		</>
	);
};

export default FromGroupQuestions;
