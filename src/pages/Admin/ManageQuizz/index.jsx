import style from "../Layout/style.module.scss";
import ThemeBreadcrumb from "@pages/Admin/components/ThemeBreadcrumb";
import {MdDashboardCustomize} from "react-icons/md";
import {Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import ThemeButton from "@components/ThemeButton";
import {uuid} from "@helpers/index.js";
import useToggle from "@hooks/useToggle.js";
import ModalBase from "@components/ModalBase";
import ModalCreateQuiz from "@pages/Admin/ManageQuizz/ModalCreateQuiz";
import quizApi from "@api/quizApi.js";
import ThemeTable from "@pages/Admin/components/ThemeTable";

const breadcrumb = [
    {
        id: uuid(),
        to: '/',
        title: 'Admin',
    },
    {
        id: uuid(),
        to: '/',
        title: 'Manage Quizz',
        active: true,
    }
];

const tableHeader = [
    {name: 'Quiz name', className: 'text-center'},
    {name: 'Quiz difficulty', className: 'text-center'},
    {name: 'actions', className: 'text-center'}
];

const ManageQuizz = () => {
    const [quiz, setQuiz] = useState([]);
    const {toggle, handleToggle} = useToggle(false);

    const submitCreateQuiz = async (data) => {
        await quizApi.createQuiz(data);
        handleToggle(false);
    }

    useEffect(() => {
        (async () => {
            const response = await quizApi.getAllQuiz();
            if(response && response.EC === 0) {
                setQuiz((response?.DT));
            }
        })();
    }, []);
    return (
        <>
            <div className={style['admin-page']}>
                <div className={style['admin-page__section']}>
                    <ThemeBreadcrumb title='Manage Quizz' breadcrumb={breadcrumb}
                                     icon={() => <MdDashboardCustomize/>}/>
                    <div className={style['section']}>
                        <div className={style['section-title']}>
                            <Row className='align-items-center'>
                                <Col md='6'>Exams</Col>
                                <Col md='6' className='text-end'>
                                    <ThemeButton className='button ml-auto' title='Add Quiz'
                                                 onClick={() => handleToggle(true)}/>
                                </Col>
                            </Row>
                        </div>
                        <div className={style['section-main']}>
                            <ThemeTable tableHeader={tableHeader} tableBody={quiz}/>
                        </div>
                    </div>
                </div>
            </div>
            <ModalBase data-modal='md' title='Create Quiz' show={toggle} handleClose={() => handleToggle(false)}>
                <ModalCreateQuiz onSubmit={submitCreateQuiz}/>
            </ModalBase>
        </>
    )
}

export default ManageQuizz;