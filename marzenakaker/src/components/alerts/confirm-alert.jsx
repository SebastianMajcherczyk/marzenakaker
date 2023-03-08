import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './alert.css'

const options = {
	title: 'Title',
	message: 'Message',
	buttons: [
		{
			label: 'Yes',
			onClick: () => alert('Click Yes'),
		},
		{
			label: 'No',
			onClick: () => alert('Click No'),
		},
	],
	closeOnEscape: true,
	closeOnClickOutside: true,
	keyCodeForClose: [8, 32],
	willUnmount: () => {},
	afterClose: () => {},
	onClickOutside: () => {},
	onKeypress: () => {},
	onKeypressEscape: () => {},
	overlayClassName: 'overlay-custom-class-name',
};

export const AlertDelete = () => {
	const submit = () => {
		confirmAlert(options);
	};

	return (
		<div className='container'>
			<button onClick={submit}>Confirm dialog</button>
		</div>
	);
};
