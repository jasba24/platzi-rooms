import { createStore } from "vuex"

export default createStore({
	state: {
		user: null,
		modals: {
			login: false,
			register: false,
			isOpen: false,
		},
	},
	mutations: {
		SET_MODAL_STATE: (state, { name, value }) => {
			state.modals[name] = value
		},
	},
	actions: {
		TOOGLE_MODAL_STATE: ({ commit }, { name, value }) => {
			commit("SET_MODAL_STATE", { name, value })
		},
	},

	getters: {
		modals: state => state.modals,
	},
})
