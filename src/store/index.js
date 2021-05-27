import { createStore } from "vuex"
import firebase from "firebase"
import countObjectProperties from "../utils"

export default createStore({
	state: {
		users: [],
		services: [],
		rooms: [],
		authId: "38St7Q8Zi2N1SPa5ahzssq9kbyp1",
		modals: {
			login: false,
		},
	},
	mutations: {
		SET_MODAL_STATE(state, { name, value }) {
			state.modals[name] = value
		},
		SET_ROOM(state, { newRoom, roomId }) {
			state.rooms[roomId] = newRoom
		},
		APPEND_ROOM_TO_USER(state, { roomId, userId }) {
			state.users[userId] = roomId
		},
		SET_ITEM(state, { item, id, resource }) {
			const newItem = item
			newItem[".key"] = id
			// console.log(newItem)
			state[resource].push(newItem)
			// console.log(state[resource].newItem)
		},
	},
	actions: {
		TOOGLE_MODAL_STATE: ({ commit }, { name, value }) => {
			commit("SET_MODAL_STATE", { name, value })
		},
		CREATE_ROOM: ({ state, commit }, room) => {
			const newRoom = room
			const roomId = `room${Math.random()}`
			newRoom[".key"] = roomId
			newRoom.userId = state.authId

			commit("SET_ROOM", { newRoom, roomId })
			commit("APPEND_ROOM_TO_USER", { roomId, userId: newRoom.userId })
		},
		FETCH_ROOMS: ({ state, commit }, limit) => {
			new Promise(resolve => {
				let instance = firebase.database().ref("rooms")
				if (limit) {
					instance = instance.limitToFirst(limit)
				}
				instance.once("value", snapshot => {
					const rooms = snapshot.val()
					Object.keys(rooms).forEach(roomId => {
						const room = rooms[roomId]
						commit("SET_ITEM", {
							resource: "rooms",
							id: roomId,
							item: room,
						})
						resolve(Object.values(state.rooms))
					})
				})
			})
		},
		FETCH_USER: ({ state, commit }, { id }) => {
			new Promise(resolve => {
				firebase
					.database()
					.ref("users")
					.child(id)
					.once("value", snapshot => {
						commit("SET_ITEM", {
							resource: "users",
							id: snapshot.ket,
							item: snapshot.val(),
						})
						resolve(state.users[id])
					})
			})
		},
	},

	getters: {
		modals: state => state.modals,
		authUser: state => state.users[state.authId],
		rooms: state => state.rooms,
		userRoomsCount: state => id => countObjectProperties(state.users[id].rooms),
	},
})
