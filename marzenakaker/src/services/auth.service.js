import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const authServiceDef = () => {
	const login = async (email, password) => {
		try {
			const auth = getAuth();
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			return userCredentials.user;
		} catch (error) {
			throw new Error(error?.message);
		}
	};
	const logout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			
		} catch (error) {
			throw new Error(error?.message);
		}
	};

	return {
        
		login,
		logout,
	};
};

export const authService = authServiceDef();
