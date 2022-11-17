import {Form, Modal, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomField from "@components/CustomField";
import React from "react";
import {EXAMS_DIFFICULTY, examSchema} from "@schema";
import SelectField from "@pages/Admin/components/SelectField";
import * as yup from 'yup';
import ThemeButton from "@components/ThemeButton/index.jsx";
import ImageField from "@pages/Admin/ManageQuizz/ImageField";
import { useEffect} from 'react';

const ModalCreateExam = ({onSubmit  = null, ...props}) => {
    const schema = yup.object().shape({...examSchema});

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: {isSubmitting, isSubmitSuccessful, errors},
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            difficulty: '',
            quizImage: '',
        },
    });

    const handleSetValue = (name, value) => {
        setValue(name, value);
    };


    const handleCreatQuiz = (data) => {
        onSubmit && onSubmit(data);
    }

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);

    return (
        <>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleCreatQuiz)}>
                    <Row>
                        <div className='col-4'>
                            <ImageField errors={errors} handleSetValue={handleSetValue} control={control} name='quizImage' />
                        </div>
                        <div className="col-8">
                            <CustomField
                                control={control}
                                name='name'
                                type='text'
                                placeholder='Enter quiz name'
                                label='Quiz name: '
                            />
                            <SelectField options={EXAMS_DIFFICULTY}  control={control} name='difficulty'
                                         label='Quiz difficulty: ' className='z-index-2'/>
                            <CustomField
                                as='textarea'
                                rows='4'
                                control={control}
                                name='description'
                                type='text'
                                className='position-relative'
                                placeholder='Enter quiz description'
                                label='Quiz Description: '
                            />
                        </div>
                        <div className="col-8 offset-4">
                            <div className='text-center'>
                                <ThemeButton isLoading={isSubmitting}
                                             data-button={`${isSubmitting ? 'loading' : ''}`}
                                             type='submit' title='Create Question'
                                />
                            </div>
                        </div>
                    </Row>
                </Form>
            </Modal.Body>
        </>
    );
}

export default ModalCreateExam;