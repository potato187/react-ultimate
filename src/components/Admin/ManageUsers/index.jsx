import participantApi from '@/api/participantApi';
import CustomButton from '@/components/ThemeButton';
import useAsyncFilters from '@/hooks/useAsyncFilters';
import useToggle from '@/hooks/useToggle';
import ModalBase from '@/components/ModalBase';
import Pagination from '@/components/Pagination';
import React, {useRef, useState} from 'react';
import {Breadcrumb, Col, Row} from 'react-bootstrap';
import {MdDashboardCustomize} from 'react-icons/md';
import FormCreateUser from '../FormCreateUser';
import FormViewAndEditUser from '../FormViewAndEditUser';
import TableUser from '../TableUser';
import ModalWarning from '../ModalWarning';
import style from './style.module.scss';
import {uuid} from "@helpers/index.js";
import ThemeBreadcrumb from "@components/Admin/Breadcrumb";

const breadcrumb = [
    {
        id: uuid(),
        to: '/',
        title: 'Manage Users',
    },
    {
        id: uuid(),
        to: '/',
        title: 'Create User',
        active: true,
    }
]

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [previewUser, setPreviewUser] = useState({});
    const {queryParams, setQueryParams} = useAsyncFilters();
    const trackingChange = useRef(false);

    const {
        toggle: toggleModalCreateUser,
        handleOpen: handleOpenModalCreateUser,
        handleClose: handleCloseModalCreateUser,
    } = useToggle();
    const {toggle: toggleProfile, handleToggle: handleToggleProfile} = useToggle();
    const {toggle: mode, handleToggle: handleChangeMode} = useToggle();
    const {toggle: toggleModalWarning, handleToggle: handleToggleModalWarning} = useToggle();

    const handleCreateUser = async (formData) => {
        await participantApi.create(formData);
        handleCloseModalCreateUser();
        trackingChange.current = true;
    };

    const handleDeleteUser = async (userId) => {
        await participantApi.delete(userId);
        handleToggleModalWarning(false);
        trackingChange.current = true;
    };

    const handleUpdateUser = async (formData) => {
        const response = await participantApi.update(formData);
        if (response) {
            setUsers((prevUsers) => {
                const newUsers = [...prevUsers];
                const index = newUsers.findIndex((user) => +response.id === user.id);
                newUsers[index] = {...newUsers[index], ...response};
                return newUsers;
            });
            setPreviewUser((prevReviewUser) => ({...prevReviewUser, ...response}));
        }
    };

    const handlePreviewUser = (currentUser) => {
        setPreviewUser(currentUser);
        handleToggleProfile(true);
    };

    const handleOnPageChange = (event) => {
        const newQueryParams = {...queryParams, page: +event.selected + 1};
        setQueryParams(newQueryParams);
    };

    React.useEffect(() => {
        (async () => {
            const response = await participantApi.getFilter(queryParams);
            const {EC, DT} = response;
            if (EC === 0) {
                setUsers(DT.users);
                setTotalPage(DT['totalPages']);
            }
        })();
    }, [queryParams, trackingChange.current]);

    return (
        <>
            <div className={style['admin-page']}>
                <div className={style['admin-page__section']}>
                    <ThemeBreadcrumb breadcrumb={breadcrumb} icon={() => <MdDashboardCustomize/>}/>
                    <div className={style['section']}>
                        <div className={style['section-title']}>
                            <Row className='align-items-center'>
                                <Col md='6'>Deals Analytics</Col>
                                <Col md='6' className='text-end'>
                                    <CustomButton className='button ml-auto' onClick={handleOpenModalCreateUser}
                                                  title='Add User'/>
                                </Col>
                            </Row>
                        </div>
                        <div className={style['section-main']}>
                            <TableUser
                                users={users}
                                mode={mode}
                                onView={handlePreviewUser}
                                onDelete={handleToggleModalWarning}
                                handleChangeMode={handleChangeMode}
                                setPreviewUser={setPreviewUser}
                            />
                            <Pagination pageOffset={+queryParams.page - 1} pageCount={totalPage}
                                        onPageChange={handleOnPageChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <ModalBase title='Add User' show={toggleModalCreateUser} handleClose={handleCloseModalCreateUser}>
                <FormCreateUser onSubmit={handleCreateUser}/>
            </ModalBase>
            <ModalBase title='User Profile' show={toggleProfile} handleClose={handleToggleProfile}>
                <FormViewAndEditUser user={previewUser} onSubmit={handleUpdateUser} disabled={mode}/>
            </ModalBase>
            <ModalBase
                title='Delete User'
                show={toggleModalWarning}
                handleClose={handleToggleModalWarning}
                size='md'
                data-modal='md'>
                <ModalWarning user={previewUser} onClose={handleToggleModalWarning} onDelete={handleDeleteUser}/>
            </ModalBase>
        </>
    );
};

export default ManageUsers;
