import style from "./style.module.scss";
import {Table} from "react-bootstrap";
import React from "react";
import {uuid} from "@helpers";
import ThemeButton from "@components/ThemeButton/index.jsx";

const ThemeTableColumn = ({id, name, difficulty, onView = null, onDelete = null}) => {

    const handleOnView = () => {
        if (onView) {
            onView(id);
        }
    }

    const handleOnDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
    }

    return (
        <tr>
            <td>{name}</td>
            <td className='text-center'>{difficulty}</td>
            <td className='d-flex gap-1 justify-content-center'>
                <ThemeButton title='View' data-button='sm secondary' onClick={handleOnView}/>
                <ThemeButton title='Delete' data-button='sm warning' onClick={handleOnDelete}/>
            </td>
        </tr>);
}

const ThemeTable = ({tableHeader = [], tableBody = [], onView = null, onDelete = null, ...props}) => {
    return (<div className='table-responsive'>
        <Table striped bordered hover className={style['table']} {...props}>
            <thead>
            <tr>
                {
                    tableHeader.length > 0 ? tableHeader.map(({name, ...props}) =>
                        (<th key={uuid()} {...props}>{name}</th>)) : null
                }
            </tr>
            </thead>
            <tbody>
            {
                tableBody.length > 0 ? tableBody.map(({...rest}) =>
                        (<ThemeTableColumn key={uuid()} onView={onView} onDelete={onDelete} {...rest} />))
                    : null
            }
            </tbody>
        </Table>
    </div>);
}


export default ThemeTable;