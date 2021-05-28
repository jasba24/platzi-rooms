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
			state[resource].push(newItem)
			// console.log(this.state.services);
			// console.log(this.state.users);
		},
	},
	actions: {
		TOOGLE_MODAL_STATE: ({ commit }, { name, value }) => {
			commit("SET_MODAL_STATE", { name, value })
		},
		CREATE_ROOM: ({ state, commit }, room) => {
			const newRoom = room
			console.log(room)
			const roomId = firebase
				.database()
				.ref("rooms")
				.push().key
			newRoom.userId = state.authId
			newRoom.publishedAt = Math.floor(Date.now() / 1000)
			newRoom.meta = { likes: 0 }

			const updates = {}
			updates[`rooms/${roomId}`] = newRoom
			updates[`users/${newRoom.userId}/rooms/${roomId}`] = roomId
			firebase
				.database()
				.ref()
				.update(updates)
				.then(() => {
					commit("SET_ROOM", { newRoom, roomId })
					commit("APPEND_ROOM_TO_USER", { roomId, userId: newRoom.userId })
					return Promise.resolve(state.rooms[roomId])
				})
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
							id: snapshot.key,
							item: snapshot.val(),
						})
						resolve(state.users[id])
					})
			})
		},
		FETCH_SERVICES: ({ state, commit }) => {
			new Promise(resolve => {
				let instance = firebase.database().ref("services")
				instance.once("value", snapshot => {
					const services = snapshot.val()
					Object.keys(services).forEach(serviceId => {
						const service = services[serviceId]
						commit("SET_ITEM", {
							resource: "services",
							id: serviceId,
							item: service,
						})
						resolve(Object.values(state.services))
					})
				})
			})
		},
	},

	getters: {
		modals: state => state.modals,
		authUser: state => {
			console.log(state.users[state.authId]);
			state.users[state.authId]
		},
		rooms: state => state.rooms,
		userRoomsCount: state => id => countObjectProperties(state.users[id].rooms),
		services: state => state.services,
	},
})
