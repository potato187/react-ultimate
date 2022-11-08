import style from "./style.module.scss";
import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Breadcrumb, Nav} from "react-bootstrap";

const ThemeBreadcrumbItem = ({id, title, to, active = false, ...props}) => {
    const navigate = useNavigate();

    return (
        <li className='breadcrumb-item' key={id} {...props}>
            <NavLink to={to}>{title}</NavLink >
        </li>
    );
}

const ThemeBreadcrumb = ({title = 'Section title', icon = null, breadcrumb = [], ...props}) => {
    return (
        <>
            <div className={style['section-breadcrumb']} {...props}>
                <div className={style['breadcrumb-icon']}>
                    {icon && icon()}
                </div>
                <div className={style['breadcrumb-main']}>
                    <h1>{title}</h1>
                    <Breadcrumb className={style['breadcrumb']}>
                        {breadcrumb.length > 0 && breadcrumb.map(ThemeBreadcrumbItem)}
                    </Breadcrumb>
                </div>
            </div>
        </>
    );
}

export default ThemeBreadcrumb;