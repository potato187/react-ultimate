import React from 'react';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const NotificationBase = ({ ...props }) => {
	return (
		<ToastContainer
			position='top-right'
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={true}
			rtl={false}
			pauseOnFocusLoss={true}
			draggable={false}
			pauseOnHover={true}
			theme='light'
			{...props}
		/>
	);
};

export default NotificationBase;
