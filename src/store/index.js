import { createStore } from "vuex"
import sourceData from "../data.json"

export default createStore({
	state: {
		...sourceData,
		authId: "38St7Q8Zi2N1SPa5ahzssq9kbyp1",
		user: null,
		modals: {
			login: false,
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
		authUser: state => state.users[state.authId],
		rooms: state => state.rooms,
	},
})
