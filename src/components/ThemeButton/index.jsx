import React from 'react';
import style from './style.module.scss';
import {trimClassNames} from "@helpers/index.js";

const ThemeButton = ({ title, isLoading = false, className = '', ...props }) => {
	const classes = trimClassNames([style['button'], className]);
	return (
		<button className={classes} {...props} >
			{isLoading && <span className={style['button-circle']}></span>}
			<span className={style['button-title']}>{title}</span>
		</button>
	);
};


export default ThemeButton;
