import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from 'firebase/storage';
import { storage } from '..';

const storageServiceDef = () => {
	const getImageById = async path => {
		try {
			const storageRef = ref(storage, path);
			const url = await getDownloadURL(storageRef);
			return url;
		} catch (error) {
			console.log(error);
		}
	};
	const addImage = async (path, file) => {
		try {
			const storageRef = ref(storage, path);
			await uploadBytes(storageRef, file);
		} catch (error) {
			console.log(error);
		}
	};
	const deleteImage = async path => {
		try {
			const storageRef = ref(storage, path);
			await deleteObject(storageRef);
		} catch (error) {
			console.log(error);
		}
	};
	return {
		getImageById,
		addImage,
		deleteImage,
	};
};

export const storageService = storageServiceDef();
