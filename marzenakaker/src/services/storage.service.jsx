import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '..';

const storageServiceDef = () => {
	const getImageById = async path => {
		const storageRef = ref(storage, path);
		const url = await getDownloadURL(storageRef);
		return url;
	};
    const addImage = async (path, file) => {
		const storageRef = ref(storage, path);
		await uploadBytes(storageRef, file);
	};
	const deleteImage = async (path) => {
		const storageRef = ref(storage, path);
		await deleteObject(storageRef);
	};
	return {
		getImageById,
        addImage,
		deleteImage
	};
};

export const storageService = storageServiceDef();
