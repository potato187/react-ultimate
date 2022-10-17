import React from 'react';
import { Container, Row } from 'react-bootstrap';
import videoHomePage from '@/assets/videos/video-home-page.mp4';
import './style.scss';

const HomePage = () => {
	return (
		<div className='home-page'>
			<div className='home-page__sticky'>
				<video autoPlay loop muted>
					<source src={videoHomePage} type='video/mp4' />
				</video>
			</div>
		</div>
	);
};

export default HomePage;
