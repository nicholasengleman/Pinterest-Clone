import React from 'react';
import {Box, Toast, Image} from 'gestalt';

import "gestalt/dist/gestalt.css";
import "./ConfirmationToast.css";

const ConfirmationToast = (props) => {
	return (
		<div className='confirmationToast'>
			<Box
				fit
				dangerouslySetInlineStyle={{
					__style: {
						bottom: 50,
						left: '50%',
						transform: 'translateX(-50%)',
					},
				}}
				paddingX={1}
				position='fixed'
			>
				<Toast
					text={[props.ConfirmationToast.ToastAction, props.ConfirmationToast.ToastActionDestination]}
					thumbnail={
						<Image
							alt='Saved to home decor board'
							naturalHeight={564}
							naturalWidth={564}
							src={props.ConfirmationToast.ToastImage}
						/>
					}
				/>
			</Box>
		</div>
	)
};

export default ConfirmationToast;