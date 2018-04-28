import React from 'react';

import "./ConfirmationToast.css";

const ConfirmationToast = (props) => {
	return (
		<div className='confirmationToast'>
			<img src={props.ConfirmationToast.ToastImage} alt='' />
			<div>
				<p>{props.ConfirmationToast.ToastAction}</p>
				<p>{props.ConfirmationToast.ToastActionDestination}</p>
			</div>
		</div>
	)
};

export default ConfirmationToast;