import {Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const ModalCreateExam = ({onSubmit = null, ...props}) => {
    const schema = {};

    const {
        handleSubmit,
        setValue,
        trigger,
        register,
        reset,
        control,
        formState: { isSubmitting, isSubmitSuccessful, errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            description: '',
            name: '',
            difficulty: '',
            quizImage: null,
        },
    });

    return (
        <>
            <Modal.Body>i am modal</Modal.Body>
        </>
    );
}

export default ModalCreateExam;