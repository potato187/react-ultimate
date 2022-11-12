import React from 'react';
import videoHomePage from '@assets/videos/video-home-page.mp4';
import style from './style.module.scss';

const HomePage = () => {
	return (
		<div className={style['home-page']}>
			<div className={style['home-page__sticky']}>
				<video autoPlay loop muted>
					<source src={videoHomePage} type='video/mp4' />
				</video>
			</div>
		</div>
	);
};

export default HomePage;
