import React, {useState} from 'react';
import { Modal } from 'react-responsive-modal';

export const AlertModal = ({message, content}) => {
	const [open, setOpen] = useState(false);

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);
	return (
		<div>
			<Modal open={open} onClose={onCloseModal} center>
				<p>{message}</p>

				<ul>{content}</ul>
			</Modal>
		</div>
	);
};
