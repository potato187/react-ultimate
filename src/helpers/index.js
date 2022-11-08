import { toast } from 'react-toastify';

export const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

export const trimClassNames = (arr) => {
	return arr
		.filter((className) => className.length > 0)
		.map((className) => className.trim())
		.join(' ')
		.replace(/\s\s+/g, ' ');
};

export const uuid = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
	);
};

export const checkIfFileIsTooBig = (files) => {
	if (ableNull(files)) return true;

	if (!files || !files[0]) return false;

	const size = files[0].size / 1024 / 1024;
	return size <= 10;
};

export const checkIfFileIsCorrectType = (files) => {
	if (ableNull(files)) return true;

	if (!files || !files[0]) return false;

	let isValid = true;
	if (!['image/jpg', 'image/jpeg', 'image/png'].includes(files?.[0].type)) {
		isValid = false;
	}

	return isValid;
};

export const checkPassword = (str) => {
	const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	return regex.test(str);
};

export const getToast = (EC = -1, EM = 'Has Error') => {
	if (EC === 0) {
		toast.success(EM);
	}

	if (EC !== 0 && EM !== '') {
		toast.error(EM);
	}
};

export const ableNull = (value) => typeOf(value) === 'null';

export const useImageBase64 = (base) => 'data:image/png;base64, ' + base;
