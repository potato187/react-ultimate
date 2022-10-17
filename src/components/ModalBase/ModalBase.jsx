import React from 'react';
import { typeOf } from '../../helpers';

export const ACTION_MODAL = {
	SHOW_MODAL: 'show-modal',
	HIDE_MODAL: 'hide-modal',
	INIT_MODALS: 'init-modal',
};

const initialState = {
	modals: [],
};

const reducer = (state, payload) => {
	switch (payload.type) {
		case ACTION_MODAL.INIT_MODALS: {
			return { ...state, modals: [...state.modals] };
		}
		case ACTION_MODAL.SHOW_MODAL: {
			const { idModal } = payload;
			const newModals = state.modals.map((modal) => {
				if (modal.idModal === idModal) {
					modal.show = true;
				}
				return { ...state, modals: newModals };
			});
			return newState;
		}
		case ACTION_MODAL.HIDE_MODAL: {
			const { idModal } = payload;
			const newModals = state.modals.map((modal) => {
				if (modal.idModal === idModal) {
					modal.show = false;
				}
				return { ...state, modals: newModals };
			});
			return newState;
		}
		default: {
			return state;
		}
	}
};

const ModalBaseContext = React.createContext();

export const useModalBase = () => {
	const context = React.useContext(ModalBaseContext);
	if (typeOf(context) === 'undefine') {
		throw new Error('The use context must be used inside the Provider');
	}
	return context;
};

const ModalBase = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const value = {
		modals: state,
		handleOpen: (idModal) => {
			dispatch({ type: ACTION_MODAL.SHOW_MODAL, idModal });
		},
		handleClose: (idModal) => {
			dispatch({ type: ACTION_MODAL.HIDE_MODAL, idModal });
		},
		initModals: (modals) => {
			dispatch({ type: ACTION_MODAL.INIT_MODALS, modals });
		},
	};

	return <ModalBaseContext.Provider value={value}>{children}</ModalBaseContext.Provider>;
};

export default ModalBase;
