import style from "../Layout/style.module.scss";
import ThemeBreadcrumb from "@pages/Admin/components/ThemeBreadcrumb";
import {MdDashboardCustomize} from "react-icons/md";
import {Col, Row} from "react-bootstrap";
import React from "react";
import ThemeButton from "@components/ThemeButton";
import {uuid} from "@helpers/index.js";
import useToggle from "@hooks/useToggle.js";
import ModalBase from "@components/ModalBase";
import ModalCreateQuiz from "@pages/Admin/ManageQuizz/ModalCreateQuiz";


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
]

const ManageQuizz = () => {
    const {toggle, handleToggle} = useToggle(false);
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
                        </div>
                    </div>
                </div>
            </div>
            <ModalBase data-modal='md' title='Create Quiz' show={toggle} handleClose={() => handleToggle(false)}>
                <ModalCreateQuiz onSubmit={null}/>
            </ModalBase>
        </>
    )
}

export default ManageQuizz;