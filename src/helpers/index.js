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
	if (ableNull(files) || !files || !files[0]) return true;
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
	toast[EC === 0 ? 'success' : 'error'](EM);
};

export const ableNull = (value) => typeOf(value) === 'null';

export const useImageBase64 = (base) => 'data:image/png;base64, ' + base;

export const leadingZero = (str, leading = 2) => {
	return `0${str}`.slice(-1 * leading);
};

export const createFormData = (objectData, nameFile) => {
	const formData = new FormData();
	for (const key in objectData) {
		const value = (key !== nameFile ? objectData[key] : objectData[key][0]) ?? '';
		formData.append(key, value);
	}

	return formData;
};
